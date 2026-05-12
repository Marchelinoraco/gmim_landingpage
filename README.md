# GMIM Landing Page — Dokumentasi Tujuan & Penggunaan

Repo ini berisi **landing page statis** untuk *Sistem Keuangan GMIM* (file utama: `index.html`), dengan komponen HTML dinamis sederhana dari `src/render.js` (fitur & daftar jemaat).

## 1) Tujuan Landing Page

Landing page ini dibuat untuk:

1. **Menjelaskan value utama sistem** secara singkat (transparansi, kerapian, kemudahan akses).
2. **Mengarahkan pengunjung ke aksi utama**:
   - **Masuk ke sistem** (CTA ke halaman login).
   - **Menghubungi admin** untuk pendaftaran/aktivasi jemaat (CTA WhatsApp).
3. **Membangun kepercayaan** melalui:
   - Ringkasan fitur (apa yang bisa dilakukan sistem).
   - Alur penggunaan (bagaimana prosesnya dari input sampai laporan).
   - Daftar jemaat yang sudah bergabung (social proof).
   - FAQ (mengurangi keraguan dan pertanyaan berulang).

## 2) Target Pengguna

Landing page ini ditujukan untuk:

- **Pengurus gereja/jemaat** (bendahara, sekretaris, tim keuangan) yang akan menggunakan sistem.
- **Pimpinan/penanggung jawab** yang butuh gambaran cepat sebelum memutuskan memakai sistem.
- **Jemaat umum** yang ingin memahami konsep transparansi keuangan (sesuai kebijakan akses).

## 3) Pesan Utama (Messaging)

Pesan yang ingin ditangkap pengunjung:

- Sistem membantu **pencatatan pemasukan/pengeluaran** secara terstruktur.
- Sistem memudahkan **pembuatan laporan** yang rapi dan siap digunakan.
- Sistem mendorong **transparansi** dan **akuntabilitas**.

## 4) Struktur Halaman (Section & Perannya)

- `#hero`: ringkasan nilai utama + CTA utama (Masuk / lihat fitur).
- “Trust strip”: penguat kepercayaan (standar pelaporan, akses, cepat dipakai).
- `#fitur`: daftar fitur unggulan (dirender dari `src/render.js`).
- `#alur`: alur penggunaan (input → validasi/rekap → laporan).
- `#jemaat`: social proof (dirender dari `src/render.js` berdasarkan data `churches` di script `index.html`).
- `#faq`: pertanyaan umum untuk mengurangi friksi.
- `#kontak`: CTA WhatsApp (pendaftaran/aktivasi).
- `footer`: navigasi ringkas + CTA tambahan.

## 5) Aksi Utama yang Diukur (KPI Sederhana)

Jika nanti dipasang analytics (opsional), metrik yang paling relevan:

- Klik tombol **“Masuk ke Sistem”**.
- Klik tombol **WhatsApp**.
- Scroll depth (apakah pengunjung membaca sampai `#fitur` / `#jemaat` / `#faq`).

## 6) Cara Update Konten

### Ubah URL login
- Edit tautan `https://app.gmim-keuangan.id/login` di `index.html`.

### Ubah nomor WhatsApp
- Edit tautan `https://wa.me/628123456789` di `index.html`.

### Ubah daftar jemaat yang tampil
- Data jemaat ada di variabel `churches` pada script `index.html`.
- Format item:
  - `name`: nama jemaat
  - `location`: lokasi
  - `mapsUrl` (opsional): link maps

### Ubah daftar fitur
- Edit array `features` di `src/render.js`.
- Format item:
  - `icon`: emoji/ikon singkat
  - `title`: judul
  - `description`: deskripsi

## 7) Development & Testing

Jalankan unit test:

```bash
npm test
```

Catatan:
- Test yang ada memverifikasi rendering dasar, struktur section, perilaku hamburger menu, dan footer year.
- Landing page memakai Tailwind via CDN; perubahan UI sebagian besar ada di `index.html` dan gaya kartu di `src/render.js`.

## 8) Non-Tujuan (Supaya Scope Jelas)

Landing page ini **bukan** tempat untuk:

- Menampilkan data keuangan asli (itu ranah aplikasi utama).
- Melakukan pendaftaran akun secara otomatis (saat ini diarahkan via admin/WhatsApp).

