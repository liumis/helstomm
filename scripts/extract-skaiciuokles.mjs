import fs from 'fs';

const src =
  'C:/Users/liumi/AppData/Local/Packages/5319275A.WhatsAppDesktop_cv1g1gvanyjgm/LocalState/sessions/BC4CFDDB6236A784263906E98825470E4A897E52/transfers/2026-43/helstomm-skaiciuokliu-vizualas-v4.html';
const html = fs.readFileSync(src, 'utf8');

function extractList(id) {
  const start = html.indexOf(`id="${id}"`);
  if (start < 0) throw new Error(`Missing ${id}`);
  const section = html.slice(start, html.indexOf('</section>', start));
  const listStart = section.indexOf('<div class="list w">');
  if (listStart < 0) throw new Error(`No list in ${id}`);
  return section.slice(listStart);
}

const lists = {
  projektuotojams: extractList('fA'),
  vystytojams: extractList('fV'),
  statybininkams: extractList('fS'),
};

fs.writeFileSync(
  'src/data/skaiciuoklesMarkup.ts',
  `export const SKAICIUOKLES_LISTS = ${JSON.stringify(lists, null, 2)} as const;\n`
);

const styleStart = html.indexOf('<style>') + 7;
const styleEnd = html.indexOf('</style>');
let css = html.slice(styleStart, styleEnd);

const dropBlocks = [
  '.frames{',
  '.frame{',
  '.frame.mob{',
  '.label{',
  '.label.mob{',
  '.topbar{',
  '.topbar .ph{',
  '.pills{',
  '.pill{',
  '.pill.blue{',
  '.pill.green{',
  '.pill.out{',
  '.hdr{',
  '.logo{',
  '.logo b{',
  '.logo i{',
  '.logo s{',
  '.nav{',
  '.nav .new{',
  '.nav .new::after{',
  '.burger{',
];

for (const block of dropBlocks) {
  const i = css.indexOf(block);
  if (i < 0) continue;
  const end = css.indexOf('}', i);
  css = css.slice(0, i) + css.slice(end + 1);
}

css = css
  .replace(/\/\* ===== Svetainės antraštė ===== \*\//g, '')
  .replace(/body\{[^}]+\}/g, '')
  .replace(/\*\{box-sizing:border-box\}/, '')
  .replace(/\[hidden\]\{display:none!important\}/, '');

const scoped = `.skaiciuokles-page {
  --navy:#0F1A2E; --navy-2:#1A2740; --navy-line:#2E3D5A;
  --lime:#B7CC34; --lime-soft:#F6FAE6; --lime-line:#E3EDB8; --lime-ink:#5F6F0E;
  --blue:#03A9F4; --green:#14A04B;
  --paper:#FFFFFF; --sheet:#F6F7F9; --ink:#262B33; --muted:#6B7280; --rule:#C9CED6; --rule-2:#E4E7EC; --ok:#2E7D32; --warn:#9A5B12;
  --f:"Poppins",system-ui,-apple-system,"Segoe UI",sans-serif;
  --m:"IBM Plex Mono",ui-monospace,"SFMono-Regular",Consolas,monospace;
  color: var(--ink);
  font-family: var(--f);
}
.skaiciuokles-page * { box-sizing: border-box; }
.skaiciuokles-page .w { padding-inline: 64px; }
${css
  .split('\n')
  .map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('/*') || trimmed.startsWith(':root') || trimmed.startsWith('--')) return line;
    if (trimmed.startsWith('.' ) || trimmed.startsWith('h1') || trimmed.startsWith('svg') || trimmed.startsWith('table')) {
      return `.skaiciuokles-page ${line.trimStart()}`;
    }
    return line;
  })
  .join('\n')}

@media (max-width: 900px) {
  .skaiciuokles-page .w { padding-inline: 16px; }
  .skaiciuokles-page .hero { padding-block: 34px 0; }
  .skaiciuokles-page .hero h1 { font-size: 32px; }
  .skaiciuokles-page .hero p { font-size: 15.5px; }
  .skaiciuokles-page .aud { grid-template-columns: 1fr; gap: 10px; transform: none; margin: 24px 0 0; padding-bottom: 24px; }
  .skaiciuokles-page .list { padding-block: 48px 28px; }
  .skaiciuokles-page .list-h h2 { font-size: 24px; }
  .skaiciuokles-page .cards,
  .skaiciuokles-page .cards4,
  .skaiciuokles-page .cards3,
  .skaiciuokles-page .trust { grid-template-columns: 1fr; }
  .skaiciuokles-page .sc { flex-direction: row; border-radius: 14px; }
  .skaiciuokles-page .sc .th { aspect-ratio: auto; width: 104px; flex: none; border-bottom: 0; border-right: 1px solid var(--lime-line); }
  .skaiciuokles-page .sc .tg,
  .skaiciuokles-page .gets,
  .skaiciuokles-page .sc .go,
  .skaiciuokles-page .sc .k { display: none; }
  .skaiciuokles-page .sc .bd { padding: 10px 12px; gap: 3px; }
  .skaiciuokles-page .sc h4 { font-size: 15px; }
  .skaiciuokles-page .sc p { font-size: 12.5px; }
  .skaiciuokles-page .filters { overflow-x: auto; flex-wrap: nowrap; }
  .skaiciuokles-page .help { flex-direction: column; align-items: flex-start; }
  .skaiciuokles-page .path { display: none; }
}
`;

fs.writeFileSync('src/skaiciuokles.css', scoped);
console.log('wrote markup + css', Object.keys(lists).map((k) => lists[k].length));
