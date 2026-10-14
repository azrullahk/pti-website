# Website PT Papua Teknologi Informasi — pti-co.tech

Website company profile PTI. Dibangun dengan **Astro 5** (hasilnya HTML statis, sangat ringan) dan **Lenis** untuk smooth scroll. Semua animasi lain memakai CSS dan sedikit JavaScript murni (±7 KB gzip). Font Onest dan JetBrains Mono di-host sendiri, jadi website tidak memanggil server pihak ketiga.

## Mengubah isi website

Hampir semua teks ada di **`src/data/site.ts`**: data perusahaan, 6 layanan, mitra, nilai I.N.S.P.I.R.E, dan alasan memilih PTI. Ubah di sana, lalu build ulang.

| Bagian | File |
|---|---|
| Teks layanan, mitra, nilai | `src/data/site.ts` |
| Judul & teks hero | `src/components/Hero.astro` |
| Warna, jarak, animasi | `src/styles/global.css` (variabel di `:root`) |
| Interaksi (scroll, tab, hitung angka) | `src/scripts/main.ts` |
| Meta SEO & gambar share | `src/layouts/Base.astro`, `public/og-image.jpg` |

## Menjalankan di komputer

Butuh Node.js 18.20 atau lebih baru.

```bash
npm install
npm run dev      # buka http://localhost:4321
npm run build    # hasil di folder dist/
npm start        # jalankan dist/ lewat server.js (port 3000)
```

## Alur kerja GitHub

```bash
git add .
git commit -m "Ubah teks layanan"
git push origin main
```

Setiap push ke `main` menjalankan pengecekan build otomatis di tab **Actions** GitHub (`.github/workflows/build.yml`). Kalau build gagal, GitHub memberi tanda merah sehingga website rusak tidak ikut ter-deploy tanpa disadari. Hasil build juga bisa diunduh dari Actions (artifact `dist`).

## Deploy ke Hostinger

### Opsi A (disarankan) — Hostinger Web Apps (Node.js) terhubung ke GitHub, sama seperti cartenszpyramid.com
1. Di hPanel buat **Web App** baru → pilih **GitHub** → izinkan akses dan pilih repo `pti-website`, branch `main`.
2. Framework: **Node.js** (versi 22) · Build command: `npm run build` · Start command: `npm start`.
3. Hubungkan domain **pti-co.tech** ke Web App tersebut dan aktifkan SSL.
4. Selesai — setiap `git push` ke `main`, Hostinger otomatis build dan memperbarui website.

`server.js` melayani `dist/` dengan kompresi Brotli/Gzip, cache, header keamanan, serta redirect `www` → `pti-co.tech` dan `http` → `https`.

### Opsi B — Hosting biasa (public_html)
1. Jalankan `npm run build` di komputer (folder `dist/` tidak ikut disimpan di GitHub).
2. Unggah **isi** folder `dist/` ke `public_html` domain pti-co.tech.
3. Aktifkan SSL di hPanel.

## Struktur

```
src/
  data/site.ts        semua konten
  layouts/Base.astro  <head>, SEO, JSON-LD Organization
  components/         Nav, Hero, Marquee, Stats, Services, Partners, Talent, Values, Why, End
  scripts/main.ts     Lenis, reveal on scroll, grid hero, count-up, tab layanan, nilai
  styles/global.css   desain & animasi
public/               logo, ikon, og-image, topo.svg, robots.txt, sitemap.xml
server.js             server statis tanpa dependensi untuk Hostinger Node
```

## Catatan
- Animasi otomatis dimatikan bila pengguna mengaktifkan "kurangi gerakan" di perangkatnya.
- Contoh nomor surat di ilustrasi layanan AI hanya ilustrasi.
- Logo mitra selain Adventure Carstensz belum tersedia; strip mitra memakai nama (wordmark).
