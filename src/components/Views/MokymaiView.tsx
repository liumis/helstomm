import React, { useEffect, useState } from 'react';
import { submitTrainingForm } from '../../api/contact';
import { fetchMokymaiBlock } from '../../api/mokymai';
import {
  AKADEMIJA_CALENDAR,
  AKADEMIJA_CALENDAR_NOTE,
  AKADEMIJA_PROGRAMS,
  type AkademijaCalendarEvent,
  type AkademijaProgram,
} from '../../data/akademija';
import '../../mokymai.css';

interface Props {
  onOpenTrainingModal: () => void;
}

const ICONS: Record<string, string[]> = {
  cap: ['M2 9l10-5 10 5-10 5z', 'M6 11v5c0 1 3 3 6 3s6-2 6-3v-5', 'M22 9v6'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
  chat: ['M4 5h16v11H9l-5 4z', 'M8 9h8M8 12h5'],
  map: ['M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z'],
  hand: ['M7 11l3-3a2 2 0 0 1 3 0l4 4', 'M3 13l4 4 3-1 4 3 6-6-4-4'],
  helmet: ['M4 16a8 8 0 0 1 16 0', 'M2 16h20v2H2zM12 8V5M9 9V6M15 9V6'],
  star: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'],
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg className="i" viewBox="0 0 24 24">
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
      {name === 'map' && <circle cx="12" cy="10" r="2.5" />}
    </svg>
  );
}

const M1 = [
  ['1', 'Sistema ir gaminiai', 'Dviguba siena, termo siena, perdanga, balkonai. Kaip veikia surenkama-monolitinė konstrukcija.', '1 val.'],
  ['2', 'Darbo brėžiniai ir montavimo planas', 'Kaip skaityti gaminių brėžinius, žymėjimus ir montavimo eiliškumą.', '1 val.'],
  ['3', 'Pristatymas, kėlimas ir sandėliavimas', 'Kėlimo taškai, kranų parinkimas, sauga, elementų laikymas aikštelėje.', '1,5 val.'],
  ['4', 'Montavimas ir ramsčiai', 'Sienų ir perdangų montavimas, laikinas tvirtinimas, išramstymas.', '1,5 val.'],
  ['5', 'Sandūros ir armatūra', 'Jungčių armatūra, sandūrų sandarinimas, angos ir įdėtinės detalės.', '1 val.'],
  ['6', 'Betonavimas ir kokybės kontrolė', 'Betonavimo greitis ir sluoksniai, vibravimas, dažniausios klaidos.', '1 val.'],
];
const M2 = [
  ['7', 'Sienų montavimas mokomajame stende', 'Brigada montuoja dvigubas sienas, įrengia ramsčius ir sandūras.', '3 val.'],
  ['8', 'Perdangų montavimas ir išramstymas', 'Plokščių klojimas, ramsčių eilės, viršutinė armatūra.', '2 val.'],
  ['9', 'Klaidų atpažinimas', 'Tikri defektų pavyzdžiai ir kaip jų išvengti.', '1 val.'],
];
const K = [
  ['1', 'Kaip veikia sistema', 'Gamyklinis ir monolitinis betonas, girderiai, tipiniai storiai ir matmenys.', '20 min.'],
  ['2', 'Skaičiavimas pagal EN 1992', 'Apsauginis sluoksnis, šlyties jungtis tarp betonų, montavimo stadija.', '40 min.'],
  ['3', 'Mazgai ir sandūros', 'Siena–pamatas, siena–perdanga, kampai, angos, balkonai.', '25 min.'],
  ['4', 'Darbo brėžiniai ir BIM', 'Ką rengia konstruktorius, ką rengia Helstomm; BIM objektai.', '15 min.'],
  ['5', 'Jūsų projektas', 'Aptariame jūsų objektą ir galimus sprendimus.', '20 min.'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function asProgram(value: string): AkademijaProgram | undefined {
  return AKADEMIJA_PROGRAMS.find((item) => item === value);
}

function seatsLabel(event: AkademijaCalendarEvent) {
  if (event.seatsTotal <= 0) return 'Pagal susitarimą';
  if (event.seatsLeft <= 0) return `${event.seatsTotal} iš ${event.seatsTotal}`;
  return `${event.seatsLeft} iš ${event.seatsTotal}`;
}

export const MokymaiView: React.FC<Props> = () => {
  const [topic, setTopic] = useState<AkademijaProgram>(AKADEMIJA_PROGRAMS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [calendar, setCalendar] = useState<AkademijaCalendarEvent[]>(AKADEMIJA_CALENDAR);
  const [calendarNote, setCalendarNote] = useState(AKADEMIJA_CALENDAR_NOTE);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    participantsCount: '1',
    project: '',
  });

  useEffect(() => {
    fetchMokymaiBlock().then((block) => {
      if (block.calendarEvents?.length) setCalendar(block.calendarEvents);
      if (block.calendarNote) setCalendarNote(block.calendarNote);
    });
  }, []);

  const openForm = (program?: string) => {
    const next = program ? asProgram(program) : undefined;
    if (next) setTopic(next);
    scrollToId('akademija-registracija');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitTrainingForm({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        participantsCount: form.participantsCount,
        topic: form.project ? `${topic} · ${form.project}` : topic,
      });
      setSubmitted(true);
    } catch {
      setError('Nepavyko užregistruoti. Bandykite dar kartą.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mokymai-page">
      <section className="hero w">
        <span className="tag d">FILIGRAN AKADEMIJA</span>
        <h1>
          Išmokite dirbti<em>su Filigran sistema</em>
        </h1>
        <p>
          Nemokami teoriniai ir praktiniai mokymai statybininkams ir konstruktoriams. Sužinokite, kaip
          sistema veikia, išbandykite ją mokomajame stende ir gaukite Helstomm sertifikatą.
        </p>
        <div className="ctas">
          <button type="button" className="btn lime" onClick={() => openForm()}>
            Registruotis į mokymus →
          </button>
          <button type="button" className="btn out" onClick={() => scrollToId('akademija-kalendorius')}>
            Mokymų kalendorius
          </button>
        </div>
        <div className="stats">
          <div className="stat">
            <b>Nemokamai</b>
            <span>visi mokymai</span>
          </div>
          <div className="stat">
            <b>2 d.</b>
            <span>montuotojų kursas: teorija + praktika</span>
          </div>
          <div className="stat">
            <b>Stende</b>
            <span>praktika gamykloje arba jūsų objekte</span>
          </div>
          <div className="stat">
            <b>Sertifikatas</b>
            <span>ir įrašas partnerių sąraše</span>
          </div>
        </div>
      </section>

      <section className="sec w">
        <div className="sh">
          <span className="tag l">KODĖL MOKYMAI</span>
          <h2>
            Nauja sistema – <em>be rizikos</em>
          </h2>
          <p>
            Filigran sistema Lietuvoje dar nauja. Kai žinote, kaip ji veikia ir ką daryti aikštelėje,
            sprendimą priimti lengva.
          </p>
        </div>
        <div className="why">
          <div>
            <span className="ic">
              <Icon name="shield" />
            </span>
            <h3>Mažiau klaidų aikštelėje</h3>
            <p>Montuotojai žino, kaip kelti, remti, sujungti ir betonuoti elementus. Pirmas objektas vyksta be netikėtumų.</p>
          </div>
          <div>
            <span className="ic">
              <Icon name="chat" />
            </span>
            <h3>Tiesioginis ryšys su inžinieriais</h3>
            <p>Po kurso turite kontaktą su Helstomm konstruktoriumi ir galite tartis dar prieš pradėdami projektuoti.</p>
          </div>
          <div>
            <span className="ic">
              <Icon name="star" />
            </span>
            <h3>Pripažinta kvalifikacija</h3>
            <p>Sertifikuoti montuotojai įrašomi į partnerių sąrašą svetainėje ir gauna užsakymų iš Helstomm klientų.</p>
          </div>
        </div>
      </section>

      <section className="sec w" style={{ paddingTop: 0 }}>
        <div className="sh">
          <span className="tag l">PROGRAMOS</span>
          <h2>
            Pasirinkite <em>savo programą</em>
          </h2>
        </div>
        <div className="progs">
          <div className="prog main">
            <div className="top">
              <div className="k">STATYBININKAMS IR RANGOVAMS</div>
              <h3>Sertifikuotas montuotojas</h3>
              <p>Statybos įmonėms ir brigadoms, kurios nori montuoti Filigran gaminius.</p>
            </div>
            <div className="meta">
              <div>
                Trukmė<b>2 dienos · nemokamai</b>
              </div>
              <div>
                Vieta<b>Gamykla arba jūsų objektas</b>
              </div>
            </div>
            <ul>
              <li>Sistemos veikimas ir gaminiai</li>
              <li>Kėlimas, sandėliavimas, montavimas</li>
              <li>Ramsčiai, sandūros, armatūra</li>
              <li>Betonavimas ir kokybės kontrolė</li>
              <li>Praktika mokomajame stende su tikrais elementais</li>
            </ul>
            <div className="res">
              <b>REZULTATAS</b>Helstomm sertifikatas, įrašas į sertifikuotų montuotojų sąrašą, užsakymai iš Helstomm klientų.
            </div>
            <div className="go">
              <button type="button" className="btn dark" onClick={() => openForm(AKADEMIJA_PROGRAMS[0])}>
                Registruotis →
              </button>
            </div>
          </div>

          <div className="prog">
            <div className="top">
              <div className="k">KONSTRUKTORIAMS</div>
              <h3>Projektavimas su Filigran</h3>
              <p>Prieš pradedant projektą arba norint įsigilinti į sistemą.</p>
            </div>
            <div className="meta">
              <div>
                Trukmė<b>2 val. · nemokamai</b>
              </div>
              <div>
                Vieta<b>Gamykla arba nuotoliu</b>
              </div>
            </div>
            <ul>
              <li>Kaip veikia surenkama-monolitinė konstrukcija</li>
              <li>Skaičiavimas pagal EN 1992: sluoksnis, šlyties jungtis</li>
              <li>Mazgai, sandūros, angos</li>
              <li>Darbo brėžiniai ir BIM</li>
              <li>Jūsų projekto aptarimas</li>
            </ul>
            <div className="res">
              <b>REZULTATAS</b>Projektavimo vadovas, mazgų biblioteka ir tiesioginis kontaktas su Helstomm konstruktoriumi.
            </div>
            <div className="go">
              <button type="button" className="btn dark" onClick={() => openForm(AKADEMIJA_PROGRAMS[1])}>
                Registruotis →
              </button>
            </div>
          </div>

          <div className="prog svc">
            <div className="top">
              <div className="k">PAPILDOMA PASLAUGA</div>
              <h3>Montavimo specialistas jūsų objekte</h3>
              <p>Helstomm specialistas dirba kartu su jūsų brigada aikštelėje.</p>
            </div>
            <div className="meta">
              <div>
                Trukmė<b>1–3 dienos</b>
              </div>
              <div>
                Kaina<b>valandinis įkainis</b>
              </div>
            </div>
            <ul>
              <li>Dirba kartu su jūsų brigada</li>
              <li>Rodo montavimo eigą ir sprendžia klausimus vietoje</li>
              <li>Tikrina ramsčius, sandūras ir betonavimą</li>
              <li>Tinka pirmam objektui arba sudėtingiems mazgams</li>
            </ul>
            <div className="res">
              <b>REZULTATAS</b>Brigada išmoksta dirbdama savo objekte, o pirmas montavimas vyksta be klaidų.
            </div>
            <div className="go">
              <button type="button" className="btn lime" onClick={() => openForm(AKADEMIJA_PROGRAMS[2])}>
                Užsakyti specialistą →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec mods w">
        <div className="sh">
          <span className="tag l">MOKYMŲ PROGRAMA</span>
          <h2>
            Ko <em>išmoksite</em>
          </h2>
        </div>
        <div className="twocol">
          <div className="mcard">
            <h3>Sertifikuotas montuotojas</h3>
            <div className="sub">2 dienos · iki 12 dalyvių · nemokamai · teorija ir praktika</div>
            <div className="day">
              <div className="dh">
                1 DIENA · TEORIJA<span>7 val.</span>
              </div>
              {M1.map((item) => (
                <div className="mod" key={item[0]}>
                  <span className="n">{item[0]}</span>
                  <div>
                    <b>{item[1]}</b>
                    <small>{item[2]}</small>
                  </div>
                  <span className="t">{item[3]}</span>
                </div>
              ))}
            </div>
            <div className="day">
              <div className="dh">
                2 DIENA · PRAKTIKA STENDE ARBA OBJEKTE<span>6 val.</span>
              </div>
              {M2.map((item) => (
                <div className="mod" key={item[0]}>
                  <span className="n">{item[0]}</span>
                  <div>
                    <b>{item[1]}</b>
                    <small>{item[2]}</small>
                  </div>
                  <span className="t">{item[3]}</span>
                </div>
              ))}
            </div>
            <div className="exam">
              <Icon name="star" />
              <span>
                <b>Egzaminas:</b> testas ir praktinė užduotis. Išlaikiusiems išduodamas Helstomm sertifikatas.
              </span>
            </div>
          </div>

          <div className="mcard">
            <h3>Projektavimas su Filigran</h3>
            <div className="sub">2 val. · nemokamai · gamykloje arba nuotoliu · grupei arba individualiai</div>
            <div className="day">
              <div className="dh">
                PROGRAMA<span>2 val.</span>
              </div>
              {K.map((item) => (
                <div className="mod" key={item[0]}>
                  <span className="n">{item[0]}</span>
                  <div>
                    <b>{item[1]}</b>
                    <small>{item[2]}</small>
                  </div>
                  <span className="t">{item[3]}</span>
                </div>
              ))}
            </div>
            <div className="before">
              <b>Prieš pradedant projektą</b>
              Pradedate projektuoti su Filigran? Užsiregistruokite į individualią sesiją: per 2 val. aptarsime
              sistemą ir jūsų objektą, o po to dirbsite su mūsų konstruktoriumi tiesiogiai.
            </div>
            <div className="exam">
              <Icon name="cap" />
              <span>
                <b>Gausite:</b> projektavimo vadovą, mazgų biblioteką (DWG), prieigą prie skaičiuoklių ir
                tiesioginį kontaktą su mūsų konstruktoriumi.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="sec dark w">
        <div className="sh">
          <span className="tag d">SERTIFIKUOTIEMS MONTUOTOJAMS</span>
          <h2>
            Tapkite <em>Helstomm partneriu</em>
          </h2>
          <p>
            Sertifikuota įmonė gali montuoti Helstomm gaminius bet kuriam klientui ir gauna užsakymų bei paramą
            iš mūsų.
          </p>
        </div>
        <div className="ben">
          <div>
            <span className="ic">
              <Icon name="map" />
            </span>
            <h3>Vieta partnerių žemėlapyje</h3>
            <p>Jūsų įmonė rodoma svetainėje tarp sertifikuotų montuotojų pagal regioną.</p>
          </div>
          <div>
            <span className="ic">
              <Icon name="hand" />
            </span>
            <h3>Užsakymai iš mūsų klientų</h3>
            <p>Klientams, kuriems reikia montavimo, rekomenduojame sertifikuotus partnerius.</p>
          </div>
          <div>
            <span className="ic">
              <Icon name="cap" />
            </span>
            <h3>Nemokami atnaujinimai</h3>
            <p>Naujų gaminių ir mazgų mokymai sertifikuotiems partneriams – nemokamai.</p>
          </div>
          <div>
            <span className="ic">
              <Icon name="helmet" />
            </span>
            <h3>Specialistas jūsų objekte</h3>
            <p>Prireikus galite užsisakyti Helstomm montavimo specialistą 1–3 dienoms (valandinis įkainis).</p>
          </div>
          <div>
            <span className="ic">
              <Icon name="chat" />
            </span>
            <h3>Techninė pagalba</h3>
            <p>Tiesioginis telefonas Helstomm inžinieriams montavimo metu.</p>
          </div>
          <div>
            <span className="ic">
              <Icon name="star" />
            </span>
            <h3>Partnerio ženklas</h3>
            <p>Ženklas „Sertifikuotas Filigran montuotojas“ jūsų pasiūlymams ir svetainei.</p>
          </div>
        </div>
        <div className="badge">
          <div className="seal">
            SERTIFI-
            <br />
            KUOTAS
            <br />
            FILIGRAN
            <br />
            MONTUOTOJAS
            <br />
            2026
          </div>
          <div>
            <h3>Sertifikatas galioja 2 metus</h3>
            <p>Jį pratęsia kvalifikacijos kėlimo mokymai ir kokybiškai įvykdyti objektai.</p>
          </div>
        </div>
      </section>

      <section className="sec w">
        <div className="sh">
          <span className="tag l">KAIP VYKSTA</span>
          <h2>
            Nuo registracijos <em>iki pirmo objekto</em>
          </h2>
        </div>
        <div className="flow">
          <div className="st">
            <span className="c">1</span>
            <b>Registracija</b>
            <small>Pasirenkate programą ir datą</small>
          </div>
          <div className="st">
            <span className="c">2</span>
            <b>Teorija</b>
            <small>Gamykloje arba nuotoliu</small>
          </div>
          <div className="st">
            <span className="c">3</span>
            <b>Praktika</b>
            <small>Mokomajame stende arba jūsų objekte</small>
          </div>
          <div className="st">
            <span className="c">4</span>
            <b>Egzaminas</b>
            <small>Testas ir praktinė užduotis</small>
          </div>
          <div className="st">
            <span className="c">5</span>
            <b>Sertifikatas</b>
            <small>Įrašas partnerių sąraše</small>
          </div>
          <div className="st">
            <span className="c">6</span>
            <b>Pirmas objektas</b>
            <small>Prireikus – su Helstomm montavimo specialistu</small>
          </div>
        </div>
      </section>

      <section className="sec w" id="akademija-kalendorius" style={{ paddingTop: 0 }}>
        <div className="sh">
          <span className="tag l">KALENDORIUS</span>
          <h2>
            Artimiausi <em>mokymai</em>
          </h2>
        </div>
        <div className="cal">
          <div className="row h">
            <span>DATA</span>
            <span>PROGRAMA</span>
            <span>VIETA</span>
            <span>LIKO VIETŲ</span>
            <span></span>
          </div>
          {calendar.map((event) => {
            const full = event.seatsTotal > 0 && event.seatsLeft <= 0;
            return (
              <div className="row" key={`${event.dateLabel}-${event.program}`}>
                <div className="date">
                  <b>{event.dateLabel}</b>
                  {event.dateNote && <span>{event.dateNote}</span>}
                </div>
                <div>
                  {event.audience && (
                    <span className={event.audienceTone === 'blue' ? 'pill b' : 'pill'}>
                      {event.audience}
                    </span>
                  )}{' '}
                  {event.program}
                </div>
                <div>{event.place}</div>
                <div>{seatsLabel(event)}</div>
                <button
                  type="button"
                  className="reg"
                  disabled={full}
                  onClick={() => openForm(event.program)}
                >
                  {full ? 'Užpildyta' : 'Registruotis'}
                </button>
              </div>
            );
          })}
        </div>
        <p className="note">{calendarNote}</p>
      </section>

      <section className="sec w" id="akademija-registracija" style={{ paddingTop: 0 }}>
        <div className="fq">
          <div>
            <div className="sh" style={{ textAlign: 'left', margin: 0 }}>
              <span className="tag l">DUK</span>
              <h2>
                Dažni <em>klausimai</em>
              </h2>
            </div>
            <div className="faq">
              <details>
                <summary>Kiek kainuoja mokymai?</summary>
                <p>Mokymai nemokami – tiek montuotojams, tiek konstruktoriams.</p>
              </details>
              <details>
                <summary>Kam skirtas montuotojų kursas?</summary>
                <p>Bet kurioms statybos įmonėms ir brigadoms, norinčioms montuoti Filigran gaminius.</p>
              </details>
              <details>
                <summary>Kur vyksta praktika?</summary>
                <p>Gamykloje, mokomajame stende. Įmonės brigadai praktiką galime surengti ir jūsų objekte.</p>
              </details>
              <details>
                <summary>Ar galite atsiųsti specialistą į objektą?</summary>
                <p>Taip. Helstomm montavimo specialistas gali dirbti su jūsų brigada 1–3 dienas. Paslauga mokama valandiniu įkainiu.</p>
              </details>
              <details>
                <summary>Ar sertifikatas galioja visoje Lietuvoje?</summary>
                <p>Taip. Sertifikuotas montuotojas gali montuoti Helstomm gaminius bet kuriame objekte. Sertifikatas galioja 2 metus.</p>
              </details>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <h3>Registracija</h3>
            <p>Susisieksime per 1 darbo dieną ir patvirtinsime datą.</p>
            {submitted ? (
              <p className="ok">Registracija išsiųsta. Helstomm susisieks adresu {form.email}.</p>
            ) : (
              <>
                <div className="g2">
                  <div className="fl">
                    <label htmlFor="ak-name">Vardas, pavardė *</label>
                    <input
                      id="ak-name"
                      required
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      placeholder="Jonas Jonaitis"
                    />
                  </div>
                  <div className="fl">
                    <label htmlFor="ak-company">Įmonė *</label>
                    <input
                      id="ak-company"
                      required
                      value={form.company}
                      onChange={(event) => setForm({ ...form, company: event.target.value })}
                      placeholder="UAB Statyba"
                    />
                  </div>
                  <div className="fl">
                    <label htmlFor="ak-email">El. paštas *</label>
                    <input
                      id="ak-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      placeholder="jonas@statyba.lt"
                    />
                  </div>
                  <div className="fl">
                    <label htmlFor="ak-phone">Telefonas *</label>
                    <input
                      id="ak-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      placeholder="+370 600 00000"
                    />
                  </div>
                  <div className="fl">
                    <label htmlFor="ak-topic">Programa arba paslauga *</label>
                    <select
                      id="ak-topic"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value as AkademijaProgram)}
                    >
                      {AKADEMIJA_PROGRAMS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="fl">
                    <label htmlFor="ak-count">Dalyvių skaičius</label>
                    <input
                      id="ak-count"
                      value={form.participantsCount}
                      onChange={(event) => setForm({ ...form, participantsCount: event.target.value })}
                      placeholder="4"
                    />
                  </div>
                  <div className="fl full">
                    <label htmlFor="ak-project">Planuojamas objektas (nebūtina)</label>
                    <input
                      id="ak-project"
                      value={form.project}
                      onChange={(event) => setForm({ ...form, project: event.target.value })}
                      placeholder="Daugiabutis, Vilnius, 2027 m. pavasaris"
                    />
                  </div>
                </div>
                {error && <p className="err">{error}</p>}
                <button className="btn lime" type="submit" disabled={submitting}>
                  {submitting ? 'Siunčiama…' : 'Registruotis →'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
