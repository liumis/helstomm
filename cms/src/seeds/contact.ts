export const CONTACT_SETTING_SEED = {
  heading: 'Susisiekite su mumis',
  subtitle: 'Pateikite užklausą arba prisegkite brėžinius nemokamai inžinerinei analizei',
  targetEmail: 'info@helstomm.lt',
  companyName: 'UAB „Helstomm Group“',
  address: 'Dūmų g. 3, Vilnius, LT-11119, Lietuva',
  phone: '+370 686 15499',
  publicEmail: 'info@helstomm.lt',
  copyrightText: 'UAB „Helstomm Group“. Visos teisės saugomos. Filigran® Surenkamo Monolitinio Gelžbetonio Sprendimai.',
  footerLine:
    '© {year} UAB „Helstomm Group“. Visos teisės saugomos. Filigran® Surenkamo Monolitinio Gelžbetonio Sprendimai.',
  formLabel: 'Pildymo forma',
  namePlaceholder: 'Vardas*',
  emailPlaceholder: 'El. paštas*',
  filePlaceholder: '+ Įkelti failą',
  fileAttachedPrefix: 'Prisegtas:',
  submitLabel: 'Pateikti',
  submittingLabel: 'Siunčiama...',
  successTitle: 'Užklausa Pateikta Sėkmingai!',
  successText: 'Dėkojame, susisieksime su Jumis el. paštu {email} artimiausiu metu.',
  sendAnotherLabel: 'Siųsti Kito Projekto Užklausą',
  errorText: 'Nepavyko išsiųsti užklausos. Bandykite dar kartą.',
  addressLabel: 'Adresas:',
  phoneLabel: 'Telefonas:',
  emailLabel: 'El.p.:',
};

export const CONTACT_PERSON_SEEDS = [
  {
    name: 'MINDAUGAS DAGYS',
    position: 'Chief Technical Officer',
    phone: '+370 686 15499',
    email: 'mindaugas@helstomm.lt',
    photoUrl: '/Mindaugas.png',
    sortOrder: 1,
  },
  {
    name: 'ANDRIUS GUZAITIS',
    position: 'Chief Administrative Officer',
    phone: '+370 650 79303',
    email: 'andrius@helstomm.lt',
    photoUrl: '/Andrius_Guzaitis.jpg',
    sortOrder: 2,
  },
];

export const FORM_MAIL_SETTING_SEED = {
  fromName: 'Helstomm Group',
  fromEmail: 'noreply@helstomm.lt',
  contactNotifyEmails: 'info@helstomm.lt',
  analysisNotifyEmails: 'info@helstomm.lt',
  trainingNotifyEmails: 'info@helstomm.lt',
  calculatorNotifyEmails: 'info@helstomm.lt',
};

export const SOCIAL_LINK_SEEDS = [
  {
    platform: 'facebook' as const,
    label: 'Facebook',
    url: 'https://www.facebook.com/',
    sortOrder: 1,
  },
  {
    platform: 'instagram' as const,
    label: 'Instagram',
    url: 'https://www.instagram.com/helstomm_group/',
    sortOrder: 2,
  },
  {
    platform: 'linkedin' as const,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/helstomm-group/',
    sortOrder: 3,
  },
];
