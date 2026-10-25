import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'vendor', 'skaiciuokles');
const destDir = path.join(root, 'public', 'skaiciuokles-forms');

const V2_ASSIGN =
  "document.querySelector('a.link').href=`/skaiciuokles/vystytojams/laiko-verte?d=${Math.round(M.days-F.days)}&s=${Math.round(r.save*r.A)}`;";

const files = [
  {
    src: 'HELSTOMM_P1_Apsauginis_sluoksnis_v1.html',
    dest: 'p1.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Apsauginis sluoksnis</b>',
  },
  {
    src: 'HELSTOMM_P2_Atsparumas_ugniai_v1.html',
    dest: 'p2.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Atsparumas ugniai</b>',
  },
  {
    src: 'HELSTOMM_P3_Girderio_parinkimas_v1.html',
    dest: 'p3.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Girderio parinkimas</b>',
  },
  {
    src: 'HELSTOMM_P4_Laikanti_dviguba_siena_v1.html',
    dest: 'p4.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Laikanti siena</b>',
  },
  {
    src: 'HELSTOMM_P5_Perdangos_konfiguracija_v1.html',
    dest: 'p5.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Perdangos konfigūracija</b>',
  },
  {
    src: 'HELSTOMM_P6_Perdangos_atsparumas_ugniai_v1.html',
    dest: 'p6.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Perdangos atsparumas ugniai</b>',
  },
  {
    src: 'HELSTOMM_P7_Montavimo_atramos_v1.html',
    dest: 'p7.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Montavimo atramos</b>',
  },
  {
    src: 'HELSTOMM_P8_Sienos_gabaritu_parinkimas_v1.html',
    dest: 'p8.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Sienos gabaritai</b>',
  },
  {
    src: 'HELSTOMM_P9_Dvigubos_sienos_jungtys_v1.html',
    dest: 'p9.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Sienų jungtys</b>',
  },
  {
    src: 'HELSTOMM_P10_Vienkryptes_perdangos_skaiciavimas_v1.html',
    dest: 'p10.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Vienkryptė perdanga</b>',
  },
  {
    src: 'HELSTOMM_P11_Dvikryptes_perdangos_skaiciavimas_v1.html',
    dest: 'p11.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Dvikryptė perdanga</b>',
  },
  {
    src: 'HELSTOMM_P12_Perdanga_ant_kolonu_v1.html',
    dest: 'p12.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Perdanga ant kolonų</b>',
  },
  {
    src: 'HELSTOMM_P13_Rusio_dviguba_siena_v1.html',
    dest: 'p13.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Rūsio siena</b>',
  },
  {
    src: 'HELSTOMM_P14_Termo_siena_v1.html',
    dest: 'p14.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Projektuotojams / <b>Termo siena</b>',
  },
  {
    src: 'HELSTOMM_V1_Sienu_kaina_v2.html',
    dest: 'v1.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Vystytojams / <b>Sienų kaina</b>',
  },
  {
    src: 'HELSTOMM_V2_Laiko_verte_v1.html',
    dest: 'v2.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Vystytojams / <b>Laiko vertė</b>',
  },
  {
    src: 'HELSTOMM_V3_Perdangu_kaina_v1.html',
    dest: 'v3.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Vystytojams / <b>Perdangų kaina</b>',
  },
  {
    src: 'HELSTOMM_S4_Dvigubu_sienu_betonavimas_v1.html',
    dest: 's4.html',
    crumb: '<a href="/skaiciuokles" target="_top">Skaičiuoklės</a> / Statybininkams / <b>Betonavimo greitis</b>',
  },
];

fs.mkdirSync(destDir, { recursive: true });

for (const file of files) {
  let html = fs.readFileSync(path.join(srcDir, file.src), 'utf8');
  html = html.replace(/<div class="crumb">[\s\S]*?<\/div>/, `<div class="crumb">${file.crumb}</div>`);
  if (!html.includes('log-calc.js')) {
    html += '\n<script src="/skaiciuokles-forms/log-calc.js"></script>\n';
  }
  if (!html.includes('.crumb a{')) {
    html = html.replace(
      '</style>',
      '.crumb a{color:inherit;text-decoration:none;border-bottom:1px solid #C9CED6}\n.crumb a:hover{color:#262B33}\n</style>'
    );
  }
  if (!/^<!DOCTYPE/i.test(html)) {
    html = `<!DOCTYPE html>\n<html lang="lt">\n<head>\n${html}\n</body>\n</html>\n`;
    html = html.replace('<header class="tstrip">', '</head>\n<body>\n<header class="tstrip">');
  }

  html = html.replace(
    "document.querySelector('a.link').href=`HELSTOMM_V2_Laiko_verte_v1.html?d=${Math.round(M.days-F.days)}&s=${Math.round(r.save*r.A)}`;",
    V2_ASSIGN
  );
  html = html.replace(
    'document.querySelector(\'a.link\').href=`HELSTOMM_V2_Laiko_verte_v1.html?d=${Math.round(M.days-F.days)}&s=${Math.round(r.save*r.A)}`;',
    V2_ASSIGN
  );
  html = html.replace(
    /<a class="link" href="#v1"/g,
    '<a class="link" href="/skaiciuokles/vystytojams/sienu-kaina"'
  );
  html = html.replace(
    /<a class="link" href="#v2"/g,
    '<a class="link" href="/skaiciuokles/vystytojams/laiko-verte"'
  );
  html = html.replace(
    "v1Url:'HELSTOMM_V1_Sienu_kaina_v2.html'",
    "v1Url:'/skaiciuokles/vystytojams/sienu-kaina'"
  );

  if (file.dest === 'v1.html' && !html.includes('HELSTOMM_V1_techninis_lapas.pdf')) {
    html = html.replace(
      /<p class="disc">[\s\S]*?<\/p>/,
      (match) =>
        `${match}\n <p class="disc"><a class="link" href="/downloads/HELSTOMM_V1_techninis_lapas.pdf" target="_blank" rel="noopener">Techninis lapas (PDF)</a></p>`
    );
  }

  fs.writeFileSync(path.join(destDir, file.dest), html);
  console.log('wrote', file.dest, html.length);
}
