// Register dokumen resmi PTI yang dapat diverifikasi lewat QR code.
// Setiap dokumen punya kode acak (tidak berurutan) supaya tidak bisa ditebak.
// Halaman: https://pti-co.tech/verifikasi/<kode>

export interface ItemDokumen {
  nama: string;
  nilai: number;
  dibayar: boolean;
}

export interface Dokumen {
  kode: string;
  jenis: 'Kuitansi' | 'Invoice' | 'Surat';
  nomor: string;
  tanggal: string;
  diterbitkan: string;
  pihak: string;
  uraian: string;
  referensi?: string;
  nilai: number;
  status: string;
  sisa?: number;
  metode?: string;
  items?: ItemDokumen[];
  penandatangan: string;
}

export const dokumen: Dokumen[] = [
  {
    kode: '5ths7s3x4u',
    jenis: 'Kuitansi',
    nomor: '003/KWT/PTPTI/XI/2026',
    tanggal: '5 November 2026',
    diterbitkan: '10 November 2026',
    pihak: 'PT Mpaigelah',
    uraian: 'Managed Technology Service Fee Gladiator ERP — Oktober 2026',
    referensi: 'Invoice 003/INV/PTPTI/X/2026 (19 Oktober 2026)',
    nilai: 44_000_000,
    status: 'Dibayar sebagian',
    sisa: 16_000_000,
    metode: 'Setor tunai Bank Mandiri',
    items: [
      { nama: 'Cloud & Production Infrastructure', nilai: 14_000_000, dibayar: true },
      { nama: 'DevOps & Technical Operation', nilai: 16_000_000, dibayar: false },
      { nama: 'Application Maintenance', nilai: 8_000_000, dibayar: true },
      { nama: 'AI / OCR / API Services Allowance', nilai: 8_000_000, dibayar: true },
      { nama: 'Technical Support & SLA', nilai: 6_000_000, dibayar: true },
      { nama: 'Database, Storage & Backup', nilai: 5_000_000, dibayar: true },
      { nama: 'Security & Monitoring', nilai: 3_000_000, dibayar: true },
    ],
    penandatangan: 'Azrullah Kainage, Direktur Utama',
  },
];

export const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');
