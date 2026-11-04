const NOTION_VERSION = '2025-09-03';

const DEFAULT_DS = {
  people: '1f60f567-99c8-4618-9fa9-29779e45120e',
  companies: '85349973-b6a3-4399-a191-4356aacccc0e',
  usage: '2a973ab5-4cfc-4845-b669-59961a93ccb9',
  catalog: 'ce23cf0c-0b4e-4153-bd5f-3464a7e6ae44',
};

export type NotionCrmEvent = {
  action:
    | 'calculation'
    | 'ask'
    | 'notify'
    | 'register'
    | 'view'
    | 'download'
    | 'training'
    | 'contact'
    | 'analysis';
  code?: string;
  title?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  projectName?: string;
  role?: string;
  phone?: string;
  pageUrl?: string;
  referrer?: string;
  landingPath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  consent?: boolean;
  summary?: string;
};

type Logger = { info: (msg: string) => void; warn: (msg: string) => void; error: (msg: string) => void };

type PropOption = { name: string; folded: string };
type PropInfo = { name: string; type: string; folded: string; options: PropOption[] };
type SourceSchema = { id: string; props: PropInfo[]; byFold: Map<string, PropInfo> };

const schemaCache = new Map<string, { at: number; schema: SourceSchema }>();
let catalogCache: { at: number; byCode: Map<string, string> } | null = null;
const CACHE_MS = 10 * 60 * 1000;

function token() {
  return String(process.env.NOTION_TOKEN || '').trim();
}

function ds() {
  return {
    people: process.env.NOTION_DS_PEOPLE || DEFAULT_DS.people,
    companies: process.env.NOTION_DS_COMPANIES || DEFAULT_DS.companies,
    usage: process.env.NOTION_DS_USAGE || DEFAULT_DS.usage,
    catalog: process.env.NOTION_DS_CATALOG || DEFAULT_DS.catalog,
  };
}

export function fold(value: string) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['"`„“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(value: unknown, max = 2000) {
  return String(value || '').trim().slice(0, max);
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function httpUrl(value?: string) {
  const raw = clip(value, 500);
  if (/^https?:\/\//i.test(raw)) return raw;
  return '';
}

function displayName(event: NotionCrmEvent) {
  return (
    clip(event.name, 200) ||
    [clip(event.firstName, 80), clip(event.lastName, 80)].filter(Boolean).join(' ').trim()
  );
}

function actionLabel(action: NotionCrmEvent['action']) {
  if (action === 'ask') return 'Klausti konstruktoriaus';
  if (action === 'download') return 'Parsisiustas PDF';
  if (action === 'training') return 'Mokymu registracija';
  if (action === 'contact') return 'Kontaktu uzklausa';
  if (action === 'analysis') return 'Projekto analize';
  if (action === 'view' || action === 'notify') return 'Perziura';
  if (action === 'register') return 'Perziura';
  return 'Atrakinti rezultatai';
}

function peopleSource(action: NotionCrmEvent['action']) {
  if (action === 'training') return ['Mokymai', 'Skaiciuokle'];
  if (action === 'contact' || action === 'analysis') return ['Svetaine', 'Skaiciuokle'];
  return ['Skaiciuokle'];
}

function activitySource(event: NotionCrmEvent) {
  const blob = fold(
    [event.utmSource, event.utmMedium, event.utmCampaign, event.referrer, event.landingPath].join(' ')
  );
  if (/\b(cpc|ppc|ads|adwords|paid)\b/.test(blob)) return 'reklama';
  if (/\blinkedin\b/.test(blob)) return 'linkedin';
  if (/\b(facebook|fb|instagram|meta)\b/.test(blob)) return 'facebook';
  if (/\b(newsletter|naujien|mailchimp|email)\b/.test(blob)) return 'naujienlaiskis';
  if (/\b(webinar|seminar|mokym|rengin)\b/.test(blob)) return 'mokymai / renginys';
  if (/\b(google|bing|yahoo|duckduckgo)\b/.test(blob)) return 'google paieska';
  if (httpUrl(event.referrer)) return 'kita svetaine';
  if (!clip(event.utmSource) && !clip(event.referrer)) return 'tiesioginis';
  return 'kita svetaine';
}

const CATALOG_ALIASES: Record<string, string> = {
  'helstomm-pv': 'projektavimo vadovas',
  'projektavimo-vadovas': 'projektavimo vadovas',
  'helstomm-md': 'mazgai ir detales (2d / 3d)',
  'mazgai-ir-detales': 'mazgai ir detales (2d / 3d)',
};

function roleMaps(role?: string) {
  const folded = fold(role);
  if (folded.startsWith('vyst') || /\bvyst/.test(folded)) {
    return {
      peopleActivity: 'vystytojas',
      companyActivity: 'vystytojas',
      peopleRole: 'kita',
      audience: 'vystytojai',
    };
  }
  if (folded.startsWith('statyb') || /\b(statyb|montuot)/.test(folded)) {
    return {
      peopleActivity: 'montuotojas',
      companyActivity: 'montuotojas',
      peopleRole: 'kita',
      audience: 'statybininkai',
    };
  }
  if (folded.startsWith('projekt') || /\b(projekt|konstruktor|architekt)/.test(folded)) {
    return {
      peopleActivity: 'konstruktorius',
      companyActivity: 'projektuotojas',
      peopleRole: 'konstruktorius',
      audience: 'projektuotojai',
    };
  }
  return { peopleActivity: 'kita', companyActivity: 'kita', peopleRole: 'kita', audience: '' };
}

async function notion(pathname: string, method: 'GET' | 'POST' | 'PATCH', body?: unknown) {
  const res = await fetch(`https://api.notion.com/v1${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${token()}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body == null ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let json: any = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`Notion ${method} ${pathname} ${res.status}: ${text.slice(0, 700)}`);
  }
  return json;
}

function optionNames(prop: any): PropOption[] {
  const raw = prop?.select?.options || prop?.multi_select?.options || prop?.status?.options || [];
  return (raw as Array<{ name?: string }>).map((item) => ({
    name: String(item.name || ''),
    folded: fold(item.name || ''),
  }));
}

async function loadSchema(dataSourceId: string): Promise<SourceSchema> {
  const cached = schemaCache.get(dataSourceId);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.schema;
  const json = await notion(`/data_sources/${dataSourceId}`, 'GET');
  const props: PropInfo[] = Object.entries(json.properties || {}).map(([name, prop]: [string, any]) => ({
    name,
    type: String(prop?.type || ''),
    folded: fold(name),
    options: optionNames(prop),
  }));
  const schema: SourceSchema = {
    id: dataSourceId,
    props,
    byFold: new Map(props.map((item) => [item.folded, item])),
  };
  schemaCache.set(dataSourceId, { at: Date.now(), schema });
  return schema;
}

function findProp(schema: SourceSchema, ...aliases: string[]) {
  for (const alias of aliases) {
    const hit = schema.byFold.get(fold(alias));
    if (hit) return hit;
  }
  return null;
}

function matchOption(prop: PropInfo | null, wanted: string) {
  if (!prop || !wanted) return '';
  const folded = fold(wanted);
  return prop.options.find((item) => item.folded === folded)?.name || '';
}

function textProp(type: string, value: string) {
  const content = clip(value, type === 'title' ? 200 : 1900);
  if (!content) return null;
  if (type === 'title') return { title: [{ type: 'text', text: { content } }] };
  if (type === 'rich_text') return { rich_text: [{ type: 'text', text: { content } }] };
  if (type === 'email') return { email: content.toLowerCase() };
  if (type === 'phone_number') return { phone_number: content.slice(0, 32) };
  if (type === 'url') {
    const url = httpUrl(content);
    return url ? { url } : null;
  }
  if (type === 'checkbox') return { checkbox: content === 'true' };
  if (type === 'date') return { date: { start: content } };
  return null;
}

function setText(properties: Record<string, unknown>, schema: SourceSchema, aliases: string[], value?: string) {
  const prop = findProp(schema, ...aliases);
  if (!prop) return;
  const built = textProp(prop.type, value || '');
  if (built) properties[prop.name] = built;
}

function setSelect(properties: Record<string, unknown>, schema: SourceSchema, aliases: string[], wanted?: string) {
  const prop = findProp(schema, ...aliases);
  const name = matchOption(prop, wanted || '');
  if (!prop || !name) return;
  if (prop.type === 'status') properties[prop.name] = { status: { name } };
  else if (prop.type === 'multi_select') properties[prop.name] = { multi_select: [{ name }] };
  else properties[prop.name] = { select: { name } };
}

function setSelectFirst(
  properties: Record<string, unknown>,
  schema: SourceSchema,
  aliases: string[],
  wanted: string[],
) {
  for (const value of wanted) {
    const prop = findProp(schema, ...aliases);
    if (matchOption(prop, value)) {
      setSelect(properties, schema, aliases, value);
      return;
    }
  }
}

function setCheckbox(properties: Record<string, unknown>, schema: SourceSchema, aliases: string[], value: boolean) {
  const prop = findProp(schema, ...aliases);
  if (!prop || prop.type !== 'checkbox') return;
  properties[prop.name] = { checkbox: value };
}

function setRelation(properties: Record<string, unknown>, schema: SourceSchema, aliases: string[], pageId?: string) {
  const prop = findProp(schema, ...aliases);
  if (!prop || prop.type !== 'relation' || !pageId) return;
  properties[prop.name] = { relation: [{ id: pageId }] };
}

function titleOf(page: any) {
  const props = page?.properties || {};
  for (const value of Object.values(props) as any[]) {
    if (value?.type === 'title') {
      return ((value.title || []) as Array<{ plain_text?: string }>).map((item) => item.plain_text || '').join('');
    }
  }
  return '';
}

function richTextOf(page: any, foldedName: string) {
  const props = page?.properties || {};
  for (const [name, value] of Object.entries(props) as Array<[string, any]>) {
    if (fold(name) !== foldedName) continue;
    if (value?.type === 'rich_text') {
      return ((value.rich_text || []) as Array<{ plain_text?: string }>).map((item) => item.plain_text || '').join('');
    }
    if (value?.type === 'title') {
      return ((value.title || []) as Array<{ plain_text?: string }>).map((item) => item.plain_text || '').join('');
    }
  }
  return '';
}

async function queryFirst(dataSourceId: string, filter: unknown) {
  const json = await notion(`/data_sources/${dataSourceId}/query`, 'POST', {
    filter,
    page_size: 1,
  });
  return (json.results && json.results[0]) || null;
}

async function findPerson(schema: SourceSchema, email: string) {
  const prop = findProp(schema, 'El. pastas', 'El. paštas', 'Email');
  if (!prop) return null;
  return queryFirst(schema.id, {
    property: prop.name,
    email: { equals: email.toLowerCase() },
  });
}

async function findCompany(schema: SourceSchema, company: string) {
  const prop = findProp(schema, 'Pavadinimas', 'Name');
  if (!prop || !company) return null;
  const exact = await queryFirst(schema.id, {
    property: prop.name,
    title: { equals: company },
  });
  if (exact) return exact;
  const contains = await queryFirst(schema.id, {
    property: prop.name,
    title: { contains: company.slice(0, 80) },
  });
  if (contains && fold(titleOf(contains)) === fold(company)) return contains;
  return null;
}

async function loadCatalog(schema: SourceSchema) {
  if (catalogCache && Date.now() - catalogCache.at < CACHE_MS) return catalogCache.byCode;
  const byCode = new Map<string, string>();
  let cursor: string | undefined;
  do {
    const json = await notion(`/data_sources/${schema.id}/query`, 'POST', {
      page_size: 100,
      start_cursor: cursor,
    });
    for (const page of json.results || []) {
      const code = fold(richTextOf(page, 'kodas'));
      const titleRaw = titleOf(page);
      const title = fold(titleRaw);
      if (code) byCode.set(code, page.id);
      if (title) byCode.set(title, page.id);
      const first = titleRaw.split(/\s+/)[0] || '';
      if (/^[A-Za-z0-9-]{2,}$/.test(first)) byCode.set(fold(first), page.id);
    }
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);
  catalogCache = { at: Date.now(), byCode };
  return byCode;
}

async function findCatalogPage(code?: string, title?: string) {
  const schema = await loadSchema(ds().catalog);
  const byCode = await loadCatalog(schema);
  const keys = [fold(code || ''), fold(title || ''), CATALOG_ALIASES[fold(code || '')], CATALOG_ALIASES[fold(title || '')]].filter(
    Boolean
  ) as string[];
  for (const key of keys) {
    const id = byCode.get(key);
    if (id) return id;
  }
  return '';
}

async function createPage(dataSourceId: string, properties: Record<string, unknown>) {
  const json = await notion('/pages', 'POST', {
    parent: { data_source_id: dataSourceId },
    properties,
  });
  return json;
}

export async function syncWebsiteEventToNotion(event: NotionCrmEvent, log?: Logger) {
  if (!token()) {
    log?.info('Notion CRM skipped: NOTION_TOKEN is not set.');
    return { skipped: true as const };
  }

  const email = clip(event.email, 180).toLowerCase();
  if (!email || !email.includes('@')) {
    log?.warn('Notion CRM skipped: email missing.');
    return { skipped: true as const };
  }

  try {
    const ids = ds();
    const peopleSchema = await loadSchema(ids.people);
    const companySchema = await loadSchema(ids.companies);
    const usageSchema = await loadSchema(ids.usage);
    const roles = roleMaps(event.role);
    const name = displayName(event);
    const companyName = clip(event.company, 160);
    let companyId = '';
    let personIsNew = false;

    if (companyName) {
      const existingCompany = await findCompany(companySchema, companyName);
      if (existingCompany) {
        companyId = existingCompany.id;
      } else {
        const properties: Record<string, unknown> = {};
        setText(properties, companySchema, ['Pavadinimas'], companyName);
        setSelect(properties, companySchema, ['Veiklos pobudis', 'Veiklos pobūdis'], roles.companyActivity);
        setSelect(properties, companySchema, ['Zingsnis', 'Žingsnis'], '1. Pritraukti');
        const created = await createPage(ids.companies, properties);
        companyId = created.id;
      }
    }

    let person = await findPerson(peopleSchema, email);
    if (!person) {
      personIsNew = true;
      const properties: Record<string, unknown> = {};
      setText(properties, peopleSchema, ['Vardas pavarde', 'Vardas pavardė'], name || email);
      setText(properties, peopleSchema, ['El. pastas', 'El. paštas'], email);
      setText(properties, peopleSchema, ['Telefonas'], event.phone);
      setText(properties, peopleSchema, ['Pareigos'], event.role);
      setSelectFirst(properties, peopleSchema, ['Saltinis', 'Šaltinis'], peopleSource(event.action));
      setSelect(properties, peopleSchema, ['Sutikimas'], event.consent ? 'Sutiko gauti' : 'Nezinoma');
      setSelect(properties, peopleSchema, ['Veiklos pobudis', 'Veiklos pobūdis'], roles.peopleActivity);
      setSelect(properties, peopleSchema, ['Role', 'Rolė'], roles.peopleRole);
      setSelect(properties, peopleSchema, ['Zingsnis', 'Žingsnis'], '1. Pritraukti');
      setText(properties, peopleSchema, ['Pirmas kontaktas'], todayDate());
      if (event.consent) setText(properties, peopleSchema, ['Sutikimo data'], todayDate());
      setRelation(properties, peopleSchema, ['Imone', 'Įmonė'], companyId);
      person = await createPage(ids.people, properties);
    } else if (companyId) {
      const properties: Record<string, unknown> = {};
      setRelation(properties, peopleSchema, ['Imone', 'Įmonė'], companyId);
      await notion(`/pages/${person.id}`, 'PATCH', { properties }).catch(() => null);
    }

    const catalogId = await findCatalogPage(event.code, event.title);
    const usageTitle = [clip(event.code, 40) || clip(event.title, 80), actionLabel(event.action), name || email, todayDate()]
      .filter(Boolean)
      .join(' · ');
    const campaign = clip(event.utmCampaign, 120) || [clip(event.utmSource, 40), clip(event.utmMedium, 40)].filter(Boolean).join(' / ');
    const usageProps: Record<string, unknown> = {};
    setText(usageProps, usageSchema, ['Irasas', 'Įrašas'], usageTitle);
    setSelect(usageProps, usageSchema, ['Saltinis', 'Šaltinis'], 'Svetaine API');
    setSelectFirst(usageProps, usageSchema, ['Veiksmas'], [
      actionLabel(event.action),
      'Perziura',
    ]);
    setSelect(
      usageProps,
      usageSchema,
      ['Atejo is', 'Atėjo iš'],
      event.action === 'training' ? 'mokymai / renginys' : activitySource(event),
    );
    if (roles.audience) setSelect(usageProps, usageSchema, ['Auditorija'], roles.audience);
    setText(usageProps, usageSchema, ['El. pastas', 'El. paštas'], email);
    setText(usageProps, usageSchema, ['Vardas pavarde', 'Vardas pavardė'], name);
    setText(usageProps, usageSchema, ['Imone', 'Įmonė'], companyName);
    setText(usageProps, usageSchema, ['Projektas'], event.projectName);
    setText(
      usageProps,
      usageSchema,
      ['Santrauka', 'Pastabos', 'Komentaras', 'Aprasymas', 'Aprašymas', 'Notes'],
      event.summary,
    );
    setText(usageProps, usageSchema, ['UTM kampanija'], campaign);
    setText(usageProps, usageSchema, ['Nuoroda (referrer)'], httpUrl(event.referrer) || httpUrl(event.pageUrl));
    setText(usageProps, usageSchema, ['Data'], new Date().toISOString());
    setCheckbox(usageProps, usageSchema, ['Sutiko gauti naujienas'], Boolean(event.consent));
    setCheckbox(usageProps, usageSchema, ['Naujas kontaktas'], personIsNew);
    setRelation(usageProps, usageSchema, ['Kontaktas CRM'], person?.id);
    setRelation(usageProps, usageSchema, ['Skaiciuokle', 'Skaičiuokle', 'Skaičiuoklė'], catalogId);

    await createPage(ids.usage, usageProps);
    log?.info(`Notion CRM synced ${event.action} ${event.code || ''} ${email}`);
    return { skipped: false as const, personId: person?.id, companyId, newPerson: personIsNew };
  } catch (error) {
    log?.error(`Notion CRM sync failed: ${error}`);
    return { skipped: false as const, error: String(error) };
  }
}
