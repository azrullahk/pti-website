// Semua teks utama website PTI ada di sini — ubah di file ini, lalu jalankan `npm run build`.

export const company = {
  name: 'PT Papua Teknologi Informasi',
  short: 'Papua Teknologi Informasi',
  tagline: 'Menghubungkan Papua, membangun masa depan.',
  email: 'admin@pti-co.tech',
  address: 'Jl. Kusuma Bangsa, Oyehe, Kec. Nabire, Kab. Nabire, Papua Tengah',
  kbli: ['62019', '62021', '62090', '63111', '63112', '63122', '63912', '73100', '85495', '78429'],
  url: 'https://pti-co.tech',
};

export type Service = {
  id: string;
  tab: string;
  kicker: string;
  title: string;
  body: string;
  chips: string[];
  kbli: string;
};

export const services: Service[] = [
  {
    id: 'ai',
    tab: 'AI & Otomasi',
    kicker: 'AI & OTOMASI',
    title: 'Otomasi pekerjaan rutin dinas dan bisnis dengan AI',
    body: 'Asisten dan chatbot AI, pembacaan dokumen otomatis, serta alur kerja yang berjalan sendiri — untuk instansi pemerintah maupun perusahaan swasta, dengan data tetap di bawah kendali Anda.',
    chips: ['Asisten & chatbot AI', 'Baca dokumen otomatis (OCR)', 'Otomasi alur kerja'],
    kbli: 'KBLI 62019 · 62090',
  },
  {
    id: 'software',
    tab: 'Software',
    kicker: 'SOFTWARE',
    title: 'Sistem yang mengikuti cara organisasi Anda bekerja',
    body: 'Aplikasi kustom, sistem informasi manajemen, ERP, dan portal web — dibangun bertahap dari proses yang sudah berjalan, divalidasi bersama pengguna.',
    chips: ['Aplikasi kustom', 'ERP & SIM', 'Portal web'],
    kbli: 'KBLI 62019 · 62021 · 62090',
  },
  {
    id: 'data',
    tab: 'Data',
    kicker: 'DATA',
    title: 'Data yang rapi, aman, dan siap dipakai mengambil keputusan',
    body: 'Tata kelola database untuk pemerintah, institusi hukum, dan swasta — termasuk migrasi, cloud, hosting, backup, dan pemulihan data.',
    chips: ['Database', 'Cloud & hosting', 'Backup & pemulihan'],
    kbli: 'KBLI 63111 · 63112',
  },
  {
    id: 'publikasi',
    tab: 'Publikasi',
    kicker: 'PUBLIKASI',
    title: 'Informasi publik yang cepat sampai ke masyarakat',
    body: 'Portal berita digital, platform konten, dan kanal informasi publik yang mudah dikelola tim Anda sendiri.',
    chips: ['Portal berita', 'Platform konten', 'Informasi publik'],
    kbli: 'KBLI 63122 · 63912',
  },
  {
    id: 'marketing',
    tab: 'Marketing',
    kicker: 'MARKETING',
    title: 'Membawa produk dari Papua ke pasar dunia',
    body: 'Strategi kampanye, iklan Google, Meta, dan TikTok, website multibahasa, serta pengelolaan media sosial — diukur sampai calon pelanggan menghubungi Anda.',
    chips: ['Iklan digital', 'Website multibahasa', 'Media sosial'],
    kbli: 'KBLI 73100',
  },
  {
    id: 'sdm',
    tab: 'Edukasi IT',
    kicker: 'EDUKASI IT',
    title: 'Talenta lokal yang siap bekerja di proyek nyata',
    body: 'Pelatihan coding, konsultasi IT, dan program CSR pelatihan IT gratis untuk masyarakat Papua.',
    chips: ['Pelatihan coding', 'Konsultasi IT', 'CSR pelatihan gratis'],
    kbli: 'KBLI 85495 · 78429',
  },
];

export const partners = {
  kerja: [
    {
      name: 'Adventure Carstensz',
      desc: 'Operator ekspedisi Carstensz Pyramid & wisata bahari. Kampanye digital kami menjangkau 23 negara lewat dua website baru dalam 7 bahasa.',
      role: 'Website · Iklan · Media sosial',
    },
    {
      name: 'PT Mpaigelah',
      desc: 'Kontraktor umum & penyedia tenaga kerja di Mimika. Bersama-sama memodernisasi sistem pengelolaan SDM.',
      role: 'Transformasi digital HCM',
    },
  ],
  dukungan: [
    {
      name: 'PT Nexfood Inti Teknologi',
      desc: 'Perusahaan IT digital di Papua yang mendukung PTI dan memperkuat kapasitas teknologi kami.',
      role: 'Mitra teknologi',
    },
    {
      name: 'Gladiator Grup Papua',
      desc: 'Grup usaha Papua yang mendukung pertumbuhan PTI bersama ekonomi daerah.',
      role: 'Mitra strategis',
    },
  ],
};

export const values = [
  { letter: 'I', name: 'Innovation', id: 'Inovasi', desc: 'Selalu mencari cara yang lebih baik — menghadirkan teknologi terkini yang benar-benar menjawab kebutuhan klien, bukan sekadar mengikuti tren.' },
  { letter: 'N', name: 'Nurture', id: 'Pemberdayaan', desc: 'Mengasah dan memajukan talenta digital Papua lewat pelatihan, pendampingan, dan keterlibatan langsung di proyek nyata.' },
  { letter: 'S', name: 'Security', id: 'Keamanan', desc: 'Menjaga kerahasiaan, keamanan, dan integritas data klien di setiap lapisan — dari akses pengguna sampai cadangan data.' },
  { letter: 'P', name: 'Partnership', id: 'Kemitraan', desc: 'Hadir sebagai mitra jangka panjang yang solutif: tumbuh bersama klien, bukan sekadar menyelesaikan transaksi.' },
  { letter: 'I', name: 'Integrity', id: 'Integritas', desc: 'Transparan dan berstandar tinggi — setiap angka, keputusan, dan janji dapat dipertanggungjawabkan.' },
  { letter: 'R', name: 'Resilience', id: 'Ketangguhan', desc: 'Tetap bekerja dan memberi hasil di tengah tantangan geografis dan infrastruktur Papua — seperti pendaki yang terus menuju puncak.' },
  { letter: 'E', name: 'Excellence', id: 'Keunggulan', desc: 'Mengerjakan setiap proyek dengan standar kualitas kelas dunia, dari Tanah Papua untuk Indonesia dan dunia.' },
];

export const reasons = [
  { icon: 'mountain', title: 'Paham medan dan budaya', body: 'Kami memahami tantangan infrastruktur dan karakter masyarakat di kawasan Papua.' },
  { icon: 'building', title: 'Instansi & swasta', body: 'Berpengalaman dengan tata kelola data pemerintahan, badan hukum, dan perusahaan swasta.' },
  { icon: 'shield', title: 'Aman sejak awal', body: 'Kerahasiaan dan integritas data klien kami jaga di setiap lapisan sistem.' },
  { icon: 'people', title: 'Dampak sosial nyata', body: 'Sebagian aset perusahaan kami dedikasikan untuk kapasitas digital masyarakat lokal.' },
];
