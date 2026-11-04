const NOTION_VERSION = '2025-09-03';
const CACHE_MS = 60 * 60 * 1000;

const DEFAULT_DS = {
  people: '1f60f567-99c8-4618-9fa9-29779e45120e',
  companies: '85349973-b6a3-4399-a191-4356aacccc0e',
  usage: '2a973ab5-4cfc-4845-b669-59961a93ccb9',
  catalog: 'ce23cf0c-0b4e-4153-bd5f-3464a7e6ae44',
  academyPrograms: 'd99b93e3-f9ce-4d60-9fe5-d77396d81be4',
  academyEvents: '9a16af7d-f2db-44d2-8c03-26be3b97b4ac',
  trainingRegs: '2c7083d1-5044-495a-9fa3-5a1153289f80',
};

export type NotionCrmAction =
  | 'calculation'
  | 'ask'
  | 'notify'
  | 'register'
  | 'view'
  | 'download'
  | 'training'
  | 'contact'
  | 'analysis';

export type NotionCrmEvent = {
  action: NotionCrmAction;
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
  personId?: string;
  position?: string;
  program?: string;
  groupDate?: string;
  preferredDate?: string;
  location?: string;
  participantsCount?: string;
  objectAddress?: string;
  daysCount?: string;
  question?: string;
};

export type AcademyGroup = {
  id: string;
  dateLabel: string;
  place: string;
  seatsLeft: number;
};

type Logger = { info: (msg: string) => void; warn: (msg: string) => void; error: (msg: string) => void };
type PropOption = { name: string; folded: string };
type PropInfo = { name: string; type: string; folded: string; options: PropOption[] };
type SourceSchema = { id: string; props: PropInfo[]; byFold: Map<string, PropInfo> };

const schemaCache = new Map<string, { at: number; schema: SourceSchema }>();
let catalogCache: { at: number; byCode: Map<string, string> } | null = null;
const personLocks = new Map<string, Promise<void>>();

function token() {
  return String(process.env.NOTION_TOKEN || '').trim();
}

function ds() {
  return {
    people: process.env.NOTION_DS_PEOPLE || DEFAULT_DS.people,
    companies: process.env.NOTION_DS_COMPANIES || DEFAULT_DS.companies,
    usage: process.env.NOTION_DS_USAGE || DEFAULT_DS.usage,
    catalog: process.env.NOTION_DS_CATALOG || DEFAULT_DS.catalog,
    academyPrograms: process.env.NOTION_DS_ACADEMY_PROGRAMS || DEFAULT_DS.academyPrograms,
    academyEvents: process.env.NOTION_DS_ACADEMY_EVENTS || DEFAULT_DS.academyEvents,
    trainingRegs: process.env.NOTION_DS_TRAINING_REGS || DEFAULT_DS.trainingRegs,
  };
}

export function fold(value?: unknown) {
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

function titleCaseName(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function companyKey(value: string) {
  return fold(value)
    .replace(/\b(uab|mb|ai|ab|ii|vsi|vsia)\b/g, '')
    .replace(/[.,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function todayDate() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vilnius' }).format(new Date());
}

function vilniusDateTime() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Vilnius',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value || '00';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
}

function httpUrl(value?: string) {
  const raw = clip(value, 500);
  if (/^https?:\/\//i.test(raw)) return raw;
  return '';
}

function displayName(event: NotionCrmEvent) {
  const built = [clip(event.firstName, 80), clip(event.lastName, 80)].filter(Boolean).join(' ').trim();
  return titleCaseName(clip(event.name, 200) || built);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withPersonLock<T>(email: string, fn: () => Promise<T>) {
  const key = email.toLowerCase();
  const previous = personLocks.get(key) || Promise.resolve();
  let release: () => void = () => {};
  const current = new Promise<void>((resolve) => {
    release = () => resolve();
  });
  personLocks.set(
    key,
    previous.then(() => current)
  );
  await previous;
  try {
    return await fn();
  } finally {
    setTimeout(() => {
      release();
      if (personLocks.get(key) === current) personLocks.delete(key);
    }, 10000);
  }
}

export function actionLabel(action: NotionCrmEvent['action']) {
  if (action === 'ask') return 'Klausti konstruktoriaus';
  if (action === 'download') return 'Parsisiųstas PDF';
  if (action === 'training') return 'Mokymų registracija';
  if (action === 'contact') return 'Kontaktų užklausa';
  if (action === 'analysis') return 'Projekto analizė';
  if (action === 'view' || action === 'notify' || action === 'register') return 'Peržiūra';
  return 'Atrakinti rezultatai';
}

function peopleSource(action: NotionCrmEvent['action']) {
  if (action === 'training') return ['Seminaras / webinaras', 'Mokymai', 'Skaičiuklė'];
  if (action === 'contact' || action === 'analysis') return ['Svetainė', 'Skaičiuklė'];
  return ['Skaičiuklė'];
}

export function activitySource(event: NotionCrmEvent) {
  const medium = fold(event.utmMedium);
  const source = fold(event.utmSource);
  const referrer = fold(event.referrer);
  if (/\b(cpc|ppc|paid)\b/.test(medium)) return 'Reklama';
  if (/\b(newsletter|email)\b/.test(source)) return 'Naujienlaiškis';
  if (/\b(seminar|event|mokymai)\b/.test(source)) return 'Mokymai / renginys';
  if (source.includes('linkedin') || referrer.includes('linkedin')) return 'LinkedIn';
  if (/\b(facebook|fb)\b/.test(source) || /\b(facebook|fb)\b/.test(referrer)) return 'Facebook';
  if (referrer.includes('google.')) return 'Google paieška';
  if (httpUrl(event.referrer)) return 'Kita svetainė';
  if (!clip(event.utmSource) && !clip(event.referrer)) return 'Tiesioginis';
  return 'Kita svetainė';
}

const CATALOG_ALIASES: Record<string, string> = {
  'helstomm-pv': 'projektavimo vadovas',
  'projektavimo-vadovas': 'projektavimo vadovas',
  'helstomm-md': 'mazgai ir detales (2d / 3d)',
  'mazgai-ir-detales': 'mazgai ir detales (2d / 3d)',
};

export function programCodeFromTopic(topic?: string) {
  const folded = fold(topic);
  if (!folded) return '';
  if (folded.includes('specialist') || folded.includes('objekte')) return 'SPECIALISTAS';
  if (folded.includes('projekt') || folded.includes('konstruktor')) return 'PROJEKTAVIMAS';
  if (folded.includes('montuot') || folded.includes('statyb')) return 'MONTUOTOJAS';
  if (folded === 'specialistas') return 'SPECIALISTAS';
  if (folded === 'projektavimas') return 'PROJEKTAVIMAS';
  if (folded === 'montuotojas') return 'MONTUOTOJAS';
  return folded.toUpperCase();
}

async function notion(pathname: string, method: 'GET' | 'POST' | 'PATCH', body?: unknown) {
  let lastError = new Error('Notion request failed');
  for (let attempt = 0; attempt < 4; attempt += 1) {
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
    if (res.status === 429) {
      const wait = Number(res.headers.get('Retry-After') || 1);
      await sleep(Math.max(1, wait) * 1000);
      lastError = new Error(`Notion ${method} ${pathname} 429`);
      continue;
    }
    if (res.status >= 500 && attempt < 3) {
      await sleep(1000 * 4 ** attempt);
      lastError = new Error(`Notion ${method} ${pathname} ${res.status}`);
      continue;
    }
    if (!res.ok) {
      throw new Error(`Notion ${method} ${pathname} ${res.status}: ${text.slice(0, 700)}`);
    }
    return json;
  }
  throw lastError;
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
  if (!content && type !== 'checkbox') return null;
  if (type === 'title') return { title: [{ type: 'text', text: { content } }] };
  if (type === 'rich_text') return { rich_text: [{ type: 'text', text: { content } }] };
  if (type === 'email') return { email: content.toLowerCase() };
  if (type === 'phone_number') return { phone_number: content.slice(0, 32) };
  if (type === 'url') {
    const url = httpUrl(content);
    return url ? { url } : null;
  }
  if (type === 'checkbox') return { checkbox: content === 'true' };
  if (type === 'date') {
    const hasTime = content.includes('T');
    return { date: { start: content, ...(hasTime ? { time_zone: 'Europe/Vilnius' } : {}) } };
  }
  if (type === 'number') {
    const num = Number(content);
    return Number.isFinite(num) ? { number: num } : null;
  }
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

function setSelectFirst(properties: Record<string, unknown>, schema: SourceSchema, aliases: string[], wanted: string[]) {
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
    if (value?.type === 'select') return String(value.select?.name || '');
    if (value?.type === 'status') return String(value.status?.name || '');
    if (value?.type === 'email') return String(value.email || '');
    if (value?.type === 'number') return String(value.number ?? '');
    if (value?.type === 'checkbox') return value.checkbox ? 'true' : 'false';
    if (value?.type === 'date') return String(value.date?.start || '');
  }
  return '';
}

function relationIds(page: any, foldedName: string) {
  const props = page?.properties || {};
  for (const [name, value] of Object.entries(props) as Array<[string, any]>) {
    if (fold(name) !== foldedName) continue;
    return ((value?.relation || []) as Array<{ id?: string }>).map((item) => item.id || '').filter(Boolean);
  }
  return [] as string[];
}

function numberOf(page: any, foldedName: string) {
  const raw = richTextOf(page, foldedName);
  const num = Number(raw);
  return Number.isFinite(num) ? num : 0;
}

async function queryFirst(dataSourceId: string, filter: unknown) {
  const json = await notion(`/data_sources/${dataSourceId}/query`, 'POST', {
    filter,
    page_size: 1,
  });
  return (json.results && json.results[0]) || null;
}

async function queryMany(dataSourceId: string, filter?: unknown, pageSize = 50) {
  const json = await notion(`/data_sources/${dataSourceId}/query`, 'POST', {
    ...(filter ? { filter } : {}),
    page_size: pageSize,
  });
  return (json.results || []) as any[];
}

async function findPerson(schema: SourceSchema, email: string) {
  const prop = findProp(schema, 'El. paštas', 'El. pastas', 'Email');
  if (!prop) return null;
  const lower = email.toLowerCase();
  const found = await queryFirst(schema.id, { property: prop.name, email: { equals: lower } });
  if (found) return found;
  if (email !== lower) {
    return queryFirst(schema.id, { property: prop.name, email: { equals: email } });
  }
  return null;
}

async function findCompany(schema: SourceSchema, company: string) {
  const prop = findProp(schema, 'Pavadinimas', 'Name');
  if (!prop || !company) return null;
  const exact = await queryFirst(schema.id, { property: prop.name, title: { equals: company } });
  if (exact) return exact;
  const key = companyKey(company);
  if (!key) return null;
  const contains = await queryFirst(schema.id, {
    property: prop.name,
    title: { contains: key.slice(0, 80) },
  });
  if (contains && companyKey(titleOf(contains)) === key) return contains;
  const pages = await queryMany(schema.id, undefined, 100);
  return pages.find((page) => companyKey(titleOf(page)) === key) || null;
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
  return notion('/pages', 'POST', {
    parent: { data_source_id: dataSourceId },
    properties,
  });
}

async function pageExists(pageId?: string) {
  if (!pageId) return null;
  try {
    const page = await notion(`/pages/${pageId}`, 'GET');
    return page?.id ? page : null;
  } catch {
    return null;
  }
}

async function upsertCompany(event: NotionCrmEvent, companySchema: SourceSchema) {
  const companyName = clip(event.company, 160);
  if (!companyName) return { companyId: '', companyName: '' };
  const existing = await findCompany(companySchema, companyName);
  if (existing) return { companyId: existing.id as string, companyName };
  const properties: Record<string, unknown> = {};
  setText(properties, companySchema, ['Pavadinimas'], companyName);
  const domain = clip(event.email).split('@')[1] || '';
  if (/\.lt$/i.test(domain)) setSelect(properties, companySchema, ['Šalis', 'Salis'], 'Lietuva');
  setSelect(properties, companySchema, ['Kontaktų paieška', 'Kontaktu paieska'], 'Ieškoti');
  setText(properties, companySchema, ['Pastabos'], `Sukurta iš svetainės registracijos ${todayDate()}`);
  const created = await createPage(ds().companies, properties);
  return { companyId: created.id as string, companyName };
}

async function upsertPerson(event: NotionCrmEvent, peopleSchema: SourceSchema, companyId: string) {
  const email = clip(event.email, 180);
  const name = displayName(event) || email;
  const existingById = await pageExists(event.personId);
  let person = existingById || (await findPerson(peopleSchema, email));
  let personIsNew = false;

  if (!person) {
    personIsNew = true;
    const properties: Record<string, unknown> = {};
    setText(properties, peopleSchema, ['Vardas pavardė', 'Vardas pavarde'], name);
    setText(properties, peopleSchema, ['El. paštas', 'El. pastas'], email.toLowerCase());
    setText(properties, peopleSchema, ['Telefonas'], event.phone);
    setSelectFirst(properties, peopleSchema, ['Šaltinis', 'Saltinis'], peopleSource(event.action));
    setSelect(properties, peopleSchema, ['Sutikimas'], event.consent ? 'Sutiko gauti' : 'Nežinoma');
    if (event.consent) setText(properties, peopleSchema, ['Sutikimo data'], todayDate());
    setText(properties, peopleSchema, ['Pirmas kontaktas'], todayDate());
    setSelect(properties, peopleSchema, ['Žingsnis', 'Zingsnis'], '2. Edukuoti');
    setText(
      properties,
      peopleSchema,
      ['Pastabos'],
      `Registracija svetainėje: ${clip(event.code || event.title, 40)}, projektas „${clip(event.projectName, 120)}“`
    );
    setRelation(properties, peopleSchema, ['Įmonė', 'Imone'], companyId);
    person = await createPage(ds().people, properties);
    return { person, personIsNew };
  }

  const patch: Record<string, unknown> = {};
  const hasCompany = relationIds(person, 'imone').length > 0 || relationIds(person, fold('Įmonė')).length > 0;
  if (companyId && !hasCompany) setRelation(patch, peopleSchema, ['Įmonė', 'Imone'], companyId);
  const consentNow = fold(richTextOf(person, 'sutikimas'));
  if (event.consent && consentNow !== fold('Atsisakė')) {
    setSelect(patch, peopleSchema, ['Sutikimas'], 'Sutiko gauti');
    setText(patch, peopleSchema, ['Sutikimo data'], todayDate());
  }
  if (Object.keys(patch).length > 0) {
    await notion(`/pages/${person.id}`, 'PATCH', { properties: patch }).catch(() => null);
  }
  return { person, personIsNew };
}

async function createUsage(event: NotionCrmEvent, usageSchema: SourceSchema, personId: string, personIsNew: boolean) {
  const catalogId = await findCatalogPage(event.code, event.title);
  const name = displayName(event) || clip(event.email);
  const usageTitle = [clip(event.code, 40) || clip(event.title, 80), actionLabel(event.action), name].filter(Boolean).join(' · ');
  const usageProps: Record<string, unknown> = {};
  setText(usageProps, usageSchema, ['Įrašas', 'Irasas'], usageTitle);
  setSelect(usageProps, usageSchema, ['Šaltinis', 'Saltinis'], 'Svetainė API');
  setSelectFirst(usageProps, usageSchema, ['Veiksmas'], [actionLabel(event.action), 'Peržiūra']);
  setSelect(
    usageProps,
    usageSchema,
    ['Atėjo iš', 'Atejo is'],
    event.action === 'training' ? 'Mokymai / renginys' : activitySource(event)
  );
  setText(usageProps, usageSchema, ['El. paštas', 'El. pastas'], event.email);
  setText(usageProps, usageSchema, ['Vardas pavardė', 'Vardas pavarde'], name);
  setText(usageProps, usageSchema, ['Įmonė', 'Imone'], event.company);
  setText(usageProps, usageSchema, ['Projektas'], event.projectName);
  setText(usageProps, usageSchema, ['Santrauka', 'Pastabos', 'Komentaras'], event.summary || event.question);
  setText(usageProps, usageSchema, ['UTM kampanija'], event.utmCampaign);
  setText(usageProps, usageSchema, ['Nuoroda (referrer)'], httpUrl(event.referrer) || httpUrl(event.pageUrl));
  setText(usageProps, usageSchema, ['Data'], vilniusDateTime());
  setCheckbox(usageProps, usageSchema, ['Sutiko gauti naujienas'], Boolean(event.consent));
  setCheckbox(usageProps, usageSchema, ['Naujas kontaktas'], personIsNew);
  setRelation(usageProps, usageSchema, ['Kontaktas CRM'], personId);
  setRelation(usageProps, usageSchema, ['Skaičiuoklė', 'Skaiciuokle', 'Skaičiuokle'], catalogId);
  await createPage(ds().usage, usageProps);
}

async function findByCode(schema: SourceSchema, code: string) {
  const prop = findProp(schema, 'Kodas', 'Code');
  if (!prop || !code) return null;
  if (prop.type === 'rich_text') {
    return queryFirst(schema.id, { property: prop.name, rich_text: { equals: code } });
  }
  if (prop.type === 'title') {
    return queryFirst(schema.id, { property: prop.name, title: { equals: code } });
  }
  if (prop.type === 'select') {
    return queryFirst(schema.id, { property: prop.name, select: { equals: code } });
  }
  return null;
}

async function writeTrainingRegistration(
  event: NotionCrmEvent,
  personId: string,
  companyId: string,
  personIsNew: boolean
) {
  const programCode = programCodeFromTopic(event.program || event.code || event.title);
  const regsSchema = await loadSchema(ds().trainingRegs);
  const programsSchema = await loadSchema(ds().academyPrograms);
  const program = await findByCode(programsSchema, programCode);
  const email = clip(event.email).toLowerCase();
  const name = displayName(event) || email;
  const recent = await queryMany(ds().trainingRegs, undefined, 100);
  const existing = recent.find((page) => {
    const sameEmail = fold(richTextOf(page, 'el pastas')) === fold(email) || fold(richTextOf(page, fold('El. paštas'))) === fold(email);
    const sameProgram =
      fold(richTextOf(page, 'kodas')) === fold(programCode) ||
      relationIds(page, 'programa').includes(program?.id || 'no');
    const created = Date.parse(page.created_time || '') || 0;
    return sameEmail && sameProgram && Date.now() - created < 30 * 24 * 60 * 60 * 1000;
  });

  if (existing) {
    const notes = [richTextOf(existing, 'pastabos'), clip(event.question || event.summary, 500), `Pakartota ${todayDate()}`]
      .filter(Boolean)
      .join('\n');
    const patch: Record<string, unknown> = {};
    setText(patch, regsSchema, ['Pastabos'], notes);
    await notion(`/pages/${existing.id}`, 'PATCH', { properties: patch });
    return;
  }

  const properties: Record<string, unknown> = {};
  setText(properties, regsSchema, ['Registracija'], `${name} · ${programCode || 'MOKYMAI'}`);
  setText(properties, regsSchema, ['Vardas pavardė', 'Vardas pavarde'], name);
  setText(properties, regsSchema, ['Įmonė (įvesta)', 'Imone (ivesta)', 'Įmonė'], clip(event.company, 160));
  setText(properties, regsSchema, ['El. paštas', 'El. pastas'], email);
  setText(properties, regsSchema, ['Telefonas'], event.phone);
  setText(properties, regsSchema, ['Pareigos'], event.position || event.role);
  setText(properties, regsSchema, ['Grupė (data)', 'Grupe (data)'], event.groupDate);
  setText(properties, regsSchema, ['Pageidaujama data'], event.preferredDate || event.groupDate);
  setSelectFirst(properties, regsSchema, ['Pageidaujama vieta'], [event.location || '', 'Gamykla', 'Nuotoliu']);
  setText(properties, regsSchema, ['Dalyvių sk.', 'Dalyviu sk.'], event.participantsCount);
  setText(properties, regsSchema, ['Objekto adresas'], event.objectAddress);
  setText(properties, regsSchema, ['Dienų sk.', 'Dienu sk.'], event.daysCount);
  setText(properties, regsSchema, ['Klausimas / komentaras', 'Klausimas'], event.question || event.summary);
  setCheckbox(properties, regsSchema, ['Sutiko gauti naujienas'], Boolean(event.consent));
  setSelect(properties, regsSchema, ['Būsena', 'Busena'], 'Nauja');
  setText(properties, regsSchema, ['Užsiregistravo', 'Uzregistravo'], todayDate());
  setSelect(properties, regsSchema, ['Atėjo iš', 'Atejo is'], activitySource(event));
  setText(properties, regsSchema, ['UTM kampanija'], event.utmCampaign);
  setRelation(properties, regsSchema, ['Žmogus', 'Zmogus', 'Kontaktas'], personId);
  setRelation(properties, regsSchema, ['Įmonė', 'Imone'], companyId);
  setRelation(properties, regsSchema, ['Programa'], program?.id);
  setCheckbox(properties, regsSchema, ['Naujas kontaktas'], personIsNew);
  await createPage(ds().trainingRegs, properties);

  if (program) {
    const countProp = findProp(programsSchema, 'Registracijų sk.', 'Registraciju sk.');
    if (countProp?.type === 'number') {
      const next = numberOf(program, countProp.folded) + 1;
      await notion(`/pages/${program.id}`, 'PATCH', {
        properties: { [countProp.name]: { number: next } },
      }).catch(() => null);
    }
  }
}

export async function listAcademyGroups(programCode: string): Promise<AcademyGroup[]> {
  if (!token() || !programCode) return [];
  const programsSchema = await loadSchema(ds().academyPrograms);
  const eventsSchema = await loadSchema(ds().academyEvents);
  const program = await findByCode(programsSchema, programCode);
  const pages = await queryMany(ds().academyEvents, undefined, 100);
  return pages
    .map((page) => {
      const open = fold(richTextOf(page, fold('Registracija atvira'))) === 'true' || fold(richTextOf(page, 'registracija atvira')) === 'true';
      const seats = numberOf(page, fold('Liko vietų')) || numberOf(page, 'liko vietu');
      const related = relationIds(page, 'programa');
      const matches = !program || related.includes(program.id) || fold(richTextOf(page, 'kodas')) === fold(programCode);
      return {
        id: page.id as string,
        dateLabel: richTextOf(page, 'data') || titleOf(page),
        place: richTextOf(page, 'vieta') || richTextOf(page, fold('Pageidaujama vieta')),
        seatsLeft: seats,
        open,
        matches,
      };
    })
    .filter((item) => item.matches && item.open && item.seatsLeft > 0)
    .map(({ id, dateLabel, place, seatsLeft }) => ({ id, dateLabel, place, seatsLeft }));
}

export async function markTrainingConfirmationSent(pageId?: string) {
  if (!token() || !pageId) return;
  const schema = await loadSchema(ds().trainingRegs);
  const properties: Record<string, unknown> = {};
  setCheckbox(properties, schema, ['Patvirtinimas išsiųstas', 'Patvirtinimas issiustas'], true);
  if (Object.keys(properties).length === 0) return;
  await notion(`/pages/${pageId}`, 'PATCH', { properties }).catch(() => null);
}

export async function syncWebsiteEventToNotion(event: NotionCrmEvent, log?: Logger) {
  if (!token()) {
    log?.info('Notion CRM skipped: token missing.');
    return { skipped: true as const };
  }

  const email = clip(event.email, 180);
  if (!email || !email.includes('@')) {
    log?.warn('Notion CRM skipped: email missing.');
    return { skipped: true as const };
  }

  try {
    return await withPersonLock(email, async () => {
      const peopleSchema = await loadSchema(ds().people);
      const companySchema = await loadSchema(ds().companies);
      const { companyId } = await upsertCompany(event, companySchema);
      const { person, personIsNew } = await upsertPerson({ ...event, email }, peopleSchema, companyId);

      if (event.action === 'training') {
        await writeTrainingRegistration({ ...event, email }, person.id, companyId, personIsNew);
      } else {
        const usageSchema = await loadSchema(ds().usage);
        await createUsage({ ...event, email }, usageSchema, person.id, personIsNew);
      }

      log?.info(`Notion CRM synced ${event.action} ${event.code || ''}`);
      return { skipped: false as const, personId: person?.id as string, companyId, newPerson: personIsNew };
    });
  } catch (error) {
    log?.error(`Notion CRM sync failed: ${String(error).slice(0, 300)}`);
    return { skipped: false as const, error: String(error) };
  }
}
