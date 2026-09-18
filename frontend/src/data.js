export const PROFILE = {
  name: 'Asharam Saini',
  brand: 'Asharam.dev',
  role: 'SDE-1 · Aiquant',
  location: 'Jaipur, Rajasthan, India',
  email: 'asharamsaini2380@gmail.com',
  phone: '+91-6350395820',
  github: 'https://github.com/Ashu2380',
  linkedin: 'https://www.linkedin.com/in/asharam-saini/',
  liveProject: 'https://frontend-five-rho-80.vercel.app/',
  resume: '/assets/resume.pdf',
};

export const ROLES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Angular + Spring Boot Developer',
  'Salesforce Developer',
  'Blockchain Enthusiast',
];

export const STATS = [
  { count: 6, suffix: '+', label: 'Projects built' },
  { count: 7, suffix: '', label: 'Internships done' },
  { count: null, value: '9.2', label: 'B.Tech CGPA' },
  { count: 15, suffix: '+', label: 'Technologies' },
];

export const SKILLS = [
  {
    icon: 'fas fa-code',
    cls: 's1',
    title: 'Languages',
    bars: [
      { name: 'Java + DSA', pct: 85 },
      { name: 'JavaScript / TypeScript', pct: 82 },
      { name: 'HTML5 / CSS3', pct: 90 },
      { name: 'SQL', pct: 78 },
    ],
  },
  {
    icon: 'fas fa-layer-group',
    cls: 's2',
    title: 'Frameworks',
    bars: [
      { name: 'React.js (MERN)', pct: 82 },
      { name: 'Node.js + Express', pct: 80 },
      { name: 'Angular', pct: 75 },
      { name: 'Spring Boot', pct: 72 },
    ],
  },
  {
    icon: 'fas fa-database',
    cls: 's3',
    title: 'Data · Cloud · Tools',
    tags: [
      'MongoDB', 'PostgreSQL', 'REST APIs', 'JWT', 'Salesforce Apex',
      'Flows', 'Ethereum', 'Cardano', 'Git / GitHub', 'Linux',
      'VS Code', 'IntelliJ',
    ],
    foot: 'Core CS — DBMS · OS · Networks · Software Engg · Agile/SDLC · OOP',
  },
];

export const PROJECTS = [
  {
    cat: 'fullstack',
    catLabel: 'MERN Stack',
    title: 'Mykart — E-Commerce',
    desc: 'Shopping platform with product browsing, cart & checkout. REST APIs on Express + MongoDB, React storefront, JWT auth — deployed on Vercel.',
    tags: ['MongoDB', 'Express', 'React', 'Node', 'JWT'],
    img: '/images/ecommerce-project.jpg',
    badge: '● Live',
    live: 'https://frontend-five-rho-80.vercel.app/',
    code: 'https://github.com/Ashu2380',
  },
  {
    cat: 'fullstack',
    catLabel: 'Angular + Spring Boot',
    title: 'Campus Event Hub',
    desc: 'Event platform with responsive Angular UI and Spring Boot REST backend — create, manage and RSVP to campus events.',
    tags: ['Angular', 'TypeScript', 'Spring Boot', 'REST'],
    icon: 'fab fa-angular',
    cls: 'f1',
    code: 'https://github.com/Ashu2380',
  },
  {
    cat: 'fullstack',
    catLabel: 'Angular + Spring Boot',
    title: 'Tender & Bidder Portal',
    desc: 'Orgs publish tenders, bidders submit proposals — role-based access for transparent, efficient bid tracking.',
    tags: ['Angular', 'Spring Boot', 'RBAC'],
    icon: 'fas fa-file-contract',
    cls: 'f2',
    code: 'https://github.com/Ashu2380',
  },
  {
    cat: 'salesforce',
    catLabel: 'Salesforce',
    title: 'Event Management System',
    desc: 'Registrations, schedules & participant records with Apex, Flows, reports and dashboards.',
    tags: ['Salesforce', 'Apex', 'Flows'],
    img: '/images/event-management.png',
    badge: 'CRM App',
    code: 'https://github.com/Ashu2380',
  },
  {
    cat: 'salesforce',
    catLabel: 'Salesforce',
    title: 'Hospital Management System',
    desc: 'Patient records, appointments & operations — custom objects, validation rules, role-based access.',
    tags: ['Salesforce', 'Apex', 'Validation'],
    icon: 'fas fa-hospital',
    cls: 'f3',
    code: 'https://github.com/Ashu2380',
  },
  {
    cat: 'frontend',
    catLabel: 'JavaScript',
    title: 'Simon Says Game',
    desc: 'Memory game in vanilla JS — random sequences, input validation, animated visual & audio feedback.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    icon: 'fas fa-gamepad',
    cls: 'f4',
    code: 'https://github.com/Ashu2380',
  },
];

export const EXPERIENCE = [
  { time: 'Jan 2026 — Present · Remote', title: 'SDE-1 — Aiquant Technology', desc: 'Full-stack features + blockchain modules (MERN, Ethereum/Cardano) in an Agile distributed team.' },
  { time: 'Nov 2025 — Jan 2026 · Virtual', title: 'Full Stack Developer Intern — Infosys Springboard', desc: 'End-to-end web features, UI to backend, with industry-standard practices and version control.' },
  { time: 'Sep 2025 — Nov 2025', title: 'Full Stack Developer (MERN) — WebStack Academy', desc: 'Multi-page MERN apps; RESTful APIs connecting React front-ends to backend services.' },
  { time: 'May 2025 — Jul 2025 · Remote', title: 'Cyber Security Trainee — TechForce Academy, Australia', desc: 'Security principles, threat identification, practical defense techniques.' },
  { time: 'May 2025 — Jun 2025 · Remote', title: 'Full Stack Intern — Micro IT Company', desc: 'Front-end + back-end tasks on live modules in a deadline-driven remote internship.' },
  { time: 'Aug 2024 — Sep 2024 · Remote', title: 'Salesforce Trainee — TechForce Academy, Australia', desc: 'Declarative development, object configuration, platform administration basics.' },
  { time: '2023 — 2024', title: 'Linux SysAdmin Trainee — Red Hat Academy', desc: 'User management, shell scripting, system configuration.' },
];

export const EDUCATION = [
  { time: '2022 — 2026', title: 'B.Tech · Information Technology', place: 'Arya College of Engineering & IT, Jaipur (RTU)', score: 'CGPA 9.2 · 1st in 7th sem', icon: 'fas fa-trophy' },
  { time: '2022', title: 'Senior Secondary (XII)', place: 'Tilak Bhal Vidhyapeeth, Malpura (RBSE)', score: '83.80%', icon: 'fas fa-medal' },
  { time: '2020', title: 'Secondary (X)', place: 'Aman Deep Vidhyapeeth, Sanvariya (RBSE)', score: '86% · 2nd rank in school', icon: 'fas fa-star' },
];
