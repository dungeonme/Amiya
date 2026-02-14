import { School } from '../types';

export const schoolDatabase: School[] = [
  // --- Central Government ---
  {
    id: 'kv_01',
    name: 'Kendriya Vidyalaya (KV)',
    type: 'Central Govt | CBSE',
    tags: ['Central Govt'],
    website: 'https://kvsangathan.nic.in',
    description: 'Premier central government schools for children of transferable central government employees.'
  },
  {
    id: 'jnv_01',
    name: 'Jawahar Navodaya Vidyalaya (JNV)',
    type: 'Fully Funded | Residential | CBSE',
    tags: ['Central Govt', 'Fully Funded', 'Residential'],
    website: 'https://navodaya.gov.in',
    description: 'Co-educational residential schools for talented rural children, providing free quality education.'
  },
  {
    id: 'sainik_01',
    name: 'Sainik Schools',
    type: 'Residential | Defence Oriented',
    tags: ['Central Govt', 'Residential'],
    website: 'https://sainikschool.ncog.gov.in',
    description: 'Schools preparing students for entry into the National Defence Academy (NDA).'
  },
  {
    id: 'rms_01',
    name: 'Rashtriya Military Schools',
    type: 'Residential',
    tags: ['Central Govt', 'Residential'],
    website: 'https://rashtriyamilitaryschools.edu.in',
    description: 'Residential schools run by the Ministry of Defence for holistic development.'
  },
  {
    id: 'emrs_01',
    name: 'Eklavya Model Residential Schools (EMRS)',
    type: 'Fully Funded | Tribal Students',
    tags: ['Central Govt', 'Fully Funded', 'Residential'],
    website: 'https://emrs.tribal.gov.in',
    description: 'Dedicated to providing quality education to ST students in remote areas.'
  },

  // --- State Government ---
  {
    id: 'delhi_govt',
    name: 'Delhi Government Schools',
    type: 'State Govt | Model Schools',
    tags: ['State Govt'],
    website: 'https://edudel.nic.in',
    description: 'Modernized government schools with focus on holistic curriculum and happiness classes.'
  },
  {
    id: 'maha_govt',
    name: 'Maharashtra Government Schools',
    type: 'State Govt',
    tags: ['State Govt'],
    website: 'https://education.maharashtra.gov.in',
    description: 'State-run schools providing primary to higher secondary education across Maharashtra.'
  },
  {
    id: 'tn_govt',
    name: 'Tamil Nadu Government Schools',
    type: 'State Govt',
    tags: ['State Govt'],
    website: 'https://tnschools.gov.in',
    description: 'Focus on inclusive education and welfare schemes for students in Tamil Nadu.'
  },

  // --- Sports ---
  {
    id: 'sport_iis',
    name: 'Inspire Institute of Sport',
    type: 'High Performance Center',
    tags: ['Sports', 'Private'],
    website: 'https://www.inspireinstituteofsport.com',
    description: 'World-class training institute for Olympic sports aspirants.'
  },
  {
    id: 'sport_hockey',
    name: 'Odisha Naval Tata Hockey Academy',
    type: 'Sports Academy',
    tags: ['Sports', 'Private'],
    website: 'https://www.tatatrusts.org',
    description: 'Elite hockey training academy for nurturing young talent.'
  },
  {
    id: 'sport_haryana',
    name: 'Haryana Sports Schools',
    type: 'State Sports School',
    tags: ['Sports', 'State Govt'],
    website: 'https://haryanasports.gov.in',
    description: 'Specialized sports nurseries and schools promoted by the Haryana government.'
  },

  // --- Private Academic Excellence ---
  {
    id: 'doon',
    name: 'The Doon School',
    type: 'Private | Residential',
    tags: ['Private', 'Residential'],
    website: 'https://www.doonschool.com',
    description: 'One of India\'s finest all-boys boarding schools offering IB and ISC curriculums.'
  },
  {
    id: 'dps',
    name: 'Delhi Public School (DPS)',
    type: 'Private | CBSE',
    tags: ['Private'],
    website: 'https://www.dpsfamily.org',
    description: 'A large chain of private schools known for academic excellence and extracurriculars.'
  },
  {
    id: 'ryan',
    name: 'Ryan International Schools',
    type: 'Private',
    tags: ['Private'],
    website: 'https://www.ryangroup.org',
    description: 'Global network of schools focusing on holistic development and leadership.'
  },
  {
    id: 'dav',
    name: 'DAV Schools',
    type: 'Private | Vedic Values',
    tags: ['Private'],
    website: 'https://davcmc.net.in',
    description: 'Schools blending Anglo-Vedic values with modern science and technology.'
  },
  {
    id: 'amity',
    name: 'Amity International Schools',
    type: 'Private',
    tags: ['Private'],
    website: 'https://amity.edu/ais',
    description: 'Premium schools known for global standards and holistic education.'
  },

  // --- Fully Residential / Boarding ---
  {
    id: 'rishi',
    name: 'Rishi Valley School',
    type: 'Boarding | Alternative',
    tags: ['Private', 'Residential'],
    website: 'https://rishivalley.org',
    description: 'Founded by J. Krishnamurti, known for its unique educational philosophy.'
  },
  {
    id: 'mayo',
    name: 'Mayo College',
    type: 'Boarding | Heritage',
    tags: ['Private', 'Residential'],
    website: 'https://www.mayocollege.com',
    description: 'Prestigious boarding school in Ajmer combining tradition with modern education.'
  },
  {
    id: 'scindia',
    name: 'The Scindia School',
    type: 'Boarding | Fort School',
    tags: ['Private', 'Residential'],
    website: 'https://www.scindia.edu',
    description: 'Located in Gwalior Fort, focusing on creating leaders of tomorrow.'
  }
];
