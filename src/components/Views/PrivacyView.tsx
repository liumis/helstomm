import React from 'react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#7a8a18] mb-3">
        Teisinė informacija
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
        Privatumo politika
      </h1>
      <div className="space-y-5 text-[15px] leading-7 text-slate-700">
        <p>
          UAB Helstomm Group tvarko asmens duomenis, kuriuos pateikiate svetainėje
          helstomm.lt: skaičiuoklių registraciją, klausimus konstruktoriui, pranešimus apie
          ruošiamas skaičiuokles, mokymų registraciją ir projektų analizės užklausas.
        </p>
        <p>
          Renkame vardą, pavardę, el. paštą, įmonę, projekto pavadinimą ir su užklausa
          susijusius techninius duomenis (IP adresą, naršyklę), kad galėtume suteikti
          paslaugą, atsakyti ir tobulinti įrankius.
        </p>
        <p>
          Duomenys saugomi tiek, kiek reikia užklausai įvykdyti ir teisėtiems Helstomm
          interesams, tada ištrinami arba anonimizuojami. Duomenų neperduodame trečiosioms
          šalims rinkodarai.
        </p>
        <p>
          Sutikimą galite atšaukti bet kada parašę{' '}
          <a className="font-bold text-slate-900 underline" href="mailto:info@helstomm.lt">
            info@helstomm.lt
          </a>
          . Tuo pačiu adresu galite prašyti susipažinti su savo duomenimis, juos pataisyti
          arba ištrinti.
        </p>
      </div>
    </div>
  );
};
