import { College } from '../types';

export const collegeDatabase: College[] = [
  // Engineering
  { id: 'eng_1', name: 'IIT Madras', location: 'Chennai, TN', domain: 'Engineering', website: 'https://www.iitm.ac.in', entranceExam: 'JEE Advanced' },
  { id: 'eng_2', name: 'IIT Delhi', location: 'New Delhi', domain: 'Engineering', website: 'https://home.iitd.ac.in', entranceExam: 'JEE Advanced' },
  { id: 'eng_3', name: 'IIT Bombay', location: 'Mumbai, MH', domain: 'Engineering', website: 'https://www.iitb.ac.in', entranceExam: 'JEE Advanced' },
  { id: 'eng_4', name: 'IIT Kanpur', location: 'Kanpur, UP', domain: 'Engineering', website: 'https://www.iitk.ac.in', entranceExam: 'JEE Advanced' },
  { id: 'eng_5', name: 'IIT Kharagpur', location: 'Kharagpur, WB', domain: 'Engineering', website: 'https://www.iitkgp.ac.in', entranceExam: 'JEE Advanced' },
  { id: 'eng_6', name: 'NIT Tiruchirappalli', location: 'Trichy, TN', domain: 'Engineering', website: 'https://www.nitt.edu', entranceExam: 'JEE Main' },
  { id: 'eng_7', name: 'BITS Pilani', location: 'Pilani, RJ', domain: 'Engineering', website: 'https://www.bits-pilani.ac.in', entranceExam: 'BITSAT' },
  { id: 'eng_8', name: 'VIT Vellore', location: 'Vellore, TN', domain: 'Engineering', website: 'https://vit.ac.in', entranceExam: 'VITEEE' },
  { id: 'eng_9', name: 'Delhi Technological University (DTU)', location: 'New Delhi', domain: 'Engineering', website: 'https://dtu.ac.in', entranceExam: 'JEE Main' },

  // Medical
  { id: 'med_1', name: 'AIIMS Delhi', location: 'New Delhi', domain: 'Medical', website: 'https://www.aiims.edu', entranceExam: 'NEET UG' },
  { id: 'med_2', name: 'Christian Medical College (CMC)', location: 'Vellore, TN', domain: 'Medical', website: 'https://www.cmch-vellore.edu', entranceExam: 'NEET UG' },
  { id: 'med_3', name: 'Armed Forces Medical College (AFMC)', location: 'Pune, MH', domain: 'Medical', website: 'https://afmc.nic.in', entranceExam: 'NEET UG' },
  { id: 'med_4', name: 'Maulana Azad Medical College (MAMC)', location: 'New Delhi', domain: 'Medical', website: 'https://www.mamc.ac.in', entranceExam: 'NEET UG' },

  // Arts & Commerce
  { id: 'art_1', name: 'Hindu College', location: 'New Delhi', domain: 'Arts', website: 'https://hinducollege.ac.in', entranceExam: 'CUET' },
  { id: 'art_2', name: 'St. Stephen’s College', location: 'New Delhi', domain: 'Arts', website: 'https://www.ststephens.edu', entranceExam: 'CUET' },
  { id: 'art_3', name: 'Lady Shri Ram College', location: 'New Delhi', domain: 'Arts', website: 'https://lsr.edu.in', entranceExam: 'CUET' },
  { id: 'art_4', name: 'St. Xavier’s College', location: 'Mumbai, MH', domain: 'Arts', website: 'https://xaviers.edu', entranceExam: 'Merit/Entrance' },
  { id: 'art_5', name: 'Christ University', location: 'Bengaluru, KA', domain: 'Arts', website: 'https://christuniversity.in', entranceExam: 'CUET' },

  // Sports
  { id: 'spt_1', name: 'National Sports University', location: 'Imphal, MN', domain: 'Sports', website: 'https://www.nsu.ac.in', entranceExam: 'NSU Entrance' },
  { id: 'spt_2', name: 'Netaji Subhas NIS', location: 'Patiala, PB', domain: 'Sports', website: 'https://nsnis.org', entranceExam: 'Direct/Merit' },
  { id: 'spt_3', name: 'Lakshmibai National Institute of PE', location: 'Gwalior, MP', domain: 'Sports', website: 'https://www.lnipe.edu.in', entranceExam: 'Physical Test' },
  { id: 'spt_4', name: 'TNPESU', location: 'Chennai, TN', domain: 'Sports', website: 'https://tnpesu.org', entranceExam: 'Merit' },
  { id: 'spt_5', name: 'IGIPESS', location: 'New Delhi', domain: 'Sports', website: 'https://igipess.du.ac.in', entranceExam: 'CUET + Physical' },

  // Music & Performing Arts
  { id: 'mus_1', name: 'Kalakshetra Foundation', location: 'Chennai, TN', domain: 'Music', website: 'https://www.kalakshetra.in', entranceExam: 'Audition' },
  { id: 'mus_2', name: 'Bhatkhande Music Institute', location: 'Lucknow, UP', domain: 'Music', website: 'https://bhatkhandemusic.edu.in', entranceExam: 'Audition' },
  { id: 'mus_3', name: 'Indira Kala Sangeet Vishwavidyalaya', location: 'Khairagarh, CG', domain: 'Music', website: 'https://www.iksv.ac.in', entranceExam: 'Aptitude Test' },
  { id: 'mus_4', name: 'National School of Drama (NSD)', location: 'New Delhi', domain: 'Music', website: 'https://nsd.gov.in', entranceExam: 'Audition/Interview' },
  { id: 'mus_5', name: 'FTII', location: 'Pune, MH', domain: 'Music', website: 'https://ftii.ac.in', entranceExam: 'JET' },
  { id: 'mus_6', name: 'KM Music Conservatory', location: 'Chennai, TN', domain: 'Music', website: 'https://kmmc.in', entranceExam: 'Audition' },

  // Vocational
  { id: 'voc_1', name: 'IGNOU', location: 'National', domain: 'Vocational', website: 'https://www.ignou.ac.in', entranceExam: 'Direct' },
  { id: 'voc_2', name: 'Anna University (B.Voc)', location: 'Chennai, TN', domain: 'Vocational', website: 'https://www.annauniv.edu', entranceExam: 'Merit' },
  { id: 'voc_3', name: 'KC College', location: 'Mumbai, MH', domain: 'Vocational', website: 'https://kccollege.edu.in', entranceExam: 'Merit' },
  { id: 'voc_4', name: 'Mount Carmel College', location: 'Bengaluru, KA', domain: 'Vocational', website: 'https://mccblr.edu.in', entranceExam: 'Merit' },
];
