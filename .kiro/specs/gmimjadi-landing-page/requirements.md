# Requirements Document

## Introduction

Landing page untuk memperkenalkan Sistem Keuangan GMIM (Gereja Masehi Injili di Minahasa) kepada jemaat dan pengurus gereja. Halaman ini berfungsi sebagai pintu masuk publik yang menjelaskan manfaat sistem, menampilkan daftar gereja yang terdaftar, dan mendorong adopsi sistem oleh jemaat-jemaat lain. Target pengguna awal adalah Jemaat EBEN HAEZER TUMPAAN I.

Implementasi menggunakan HTML statis dengan Tailwind CSS (tanpa framework JavaScript).

## Glossary

- **Landing_Page**: Halaman web statis yang berfungsi sebagai halaman perkenalan sistem keuangan GMIM.
- **Sistem_Keuangan_GMIM**: Aplikasi pengelolaan keuangan gereja yang dirancang khusus untuk jemaat-jemaat di bawah naungan GMIM.
- **Jemaat**: Komunitas gereja lokal yang terdaftar dalam sistem, contohnya Jemaat EBEN HAEZER TUMPAAN I.
- **Pengurus**: Anggota jemaat yang bertanggung jawab atas pengelolaan keuangan gereja (bendahara, majelis, dll).
- **Hero_Section**: Bagian utama di atas halaman yang menampilkan pesan utama dan ajakan bertindak.
- **Church_List_Section**: Bagian yang menampilkan daftar gereja yang telah terdaftar dalam sistem.
- **Feature_Section**: Bagian yang menjelaskan fitur-fitur utama sistem keuangan.
- **CTA**: Call-to-Action, elemen yang mendorong pengguna untuk mengambil tindakan tertentu.

---

## Requirements

### Requirement 1: Hero Section

**User Story:** Sebagai pengunjung landing page, saya ingin melihat pesan utama yang jelas tentang sistem keuangan GMIM, sehingga saya dapat memahami tujuan dan manfaat sistem ini dalam hitungan detik.

#### Acceptance Criteria

1. THE Landing_Page SHALL menampilkan Hero_Section sebagai bagian pertama yang terlihat saat halaman dimuat.
2. THE Hero_Section SHALL menampilkan nama sistem "Sistem Keuangan GMIM" sebagai judul utama (heading level 1).
3. THE Hero_Section SHALL menampilkan tagline deskriptif yang menjelaskan manfaat utama sistem dalam satu atau dua kalimat.
4. THE Hero_Section SHALL menampilkan tombol CTA utama bertuliskan "Masuk ke Sistem" yang mengarahkan pengguna ke halaman login aplikasi.
5. THE Hero_Section SHALL menampilkan logo atau ikon yang merepresentasikan identitas GMIM.
6. WHEN pengguna mengakses Landing_Page dari perangkat mobile (lebar layar kurang dari 768px), THE Hero_Section SHALL menyesuaikan tata letak menjadi satu kolom vertikal.

---

### Requirement 2: Fitur Unggulan Sistem

**User Story:** Sebagai pengurus jemaat, saya ingin mengetahui fitur-fitur utama sistem keuangan, sehingga saya dapat menilai apakah sistem ini sesuai dengan kebutuhan pengelolaan keuangan gereja saya.

#### Acceptance Criteria

1. THE Landing_Page SHALL menampilkan Feature_Section yang berisi minimal empat fitur unggulan sistem.
2. THE Feature_Section SHALL menampilkan setiap fitur dengan ikon, judul fitur, dan deskripsi singkat (maksimal dua kalimat).
3. THE Feature_Section SHALL mencakup fitur pencatatan pemasukan dan pengeluaran gereja.
4. THE Feature_Section SHALL mencakup fitur laporan keuangan yang dapat dicetak atau diunduh.
5. THE Feature_Section SHALL mencakup fitur transparansi keuangan untuk jemaat.
6. THE Feature_Section SHALL mencakup fitur pengelolaan anggaran per program gereja.
7. WHEN pengguna mengakses Landing_Page dari perangkat mobile, THE Feature_Section SHALL menampilkan fitur-fitur dalam susunan satu kolom.

---

### Requirement 3: Daftar Gereja Terdaftar

**User Story:** Sebagai calon pengguna, saya ingin melihat gereja-gereja mana saja yang sudah menggunakan sistem ini, sehingga saya dapat merasa yakin bahwa sistem ini sudah terpercaya dan digunakan oleh komunitas nyata.

#### Acceptance Criteria

1. THE Landing_Page SHALL menampilkan Church_List_Section yang berisi daftar jemaat yang telah terdaftar dalam sistem.
2. THE Church_List_Section SHALL menampilkan Jemaat EBEN HAEZER TUMPAAN I sebagai jemaat pertama dalam daftar.
3. THE Church_List_Section SHALL menampilkan setiap jemaat dengan nama lengkap jemaat dan lokasi (kota/wilayah).
4. WHEN minimal satu jemaat terdaftar dan memiliki data koordinat, THE Church_List_Section SHALL menampilkan tautan ke peta lokasi Google Maps untuk jemaat tersebut.
5. WHEN data lokasi Google Maps tersedia untuk suatu jemaat, THE Church_List_Section SHALL menampilkan tautan "Lihat Lokasi" yang membuka Google Maps di tab baru.
6. WHEN tidak ada jemaat yang terdaftar dalam sistem, THE Church_List_Section SHALL menyembunyikan seluruh elemen tautan Google Maps.
7. THE Church_List_Section SHALL menampilkan jumlah total jemaat yang terdaftar.
8. WHEN pengguna mengakses Landing_Page dari perangkat mobile, THE Church_List_Section SHALL menampilkan kartu jemaat dalam susunan satu kolom.

---

### Requirement 4: Navigasi Halaman

**User Story:** Sebagai pengunjung, saya ingin dapat berpindah antar bagian halaman dengan mudah, sehingga saya dapat menemukan informasi yang saya cari tanpa harus menggulir seluruh halaman secara manual.

#### Acceptance Criteria

1. THE Landing_Page SHALL menampilkan navigation bar di bagian atas halaman yang tetap terlihat saat pengguna menggulir (sticky/fixed).
2. THE Navigation_Bar SHALL menampilkan logo atau nama "GMIM Keuangan" di sisi kiri.
3. THE Navigation_Bar SHALL menampilkan tautan navigasi ke setiap bagian utama halaman: "Beranda", "Fitur", "Jemaat", dan "Kontak".
4. WHEN pengguna mengklik tautan navigasi, THE Landing_Page SHALL menggulir halaman secara halus (smooth scroll) ke bagian yang dituju.
5. WHEN pengguna mengakses Landing_Page dari perangkat mobile, THE Navigation_Bar SHALL menampilkan tombol menu hamburger sebagai pengganti tautan navigasi horizontal.
6. WHEN pengguna mengklik tombol menu hamburger, THE Navigation_Bar SHALL menampilkan menu navigasi vertikal yang dapat ditutup kembali.

---

### Requirement 5: Bagian Kontak dan Footer

**User Story:** Sebagai pengurus jemaat yang tertarik, saya ingin mengetahui cara menghubungi pengelola sistem, sehingga saya dapat mendaftarkan jemaat saya atau mengajukan pertanyaan.

#### Acceptance Criteria

1. THE Landing_Page SHALL menampilkan bagian kontak yang berisi informasi cara menghubungi pengelola sistem.
2. THE Contact_Section SHALL menampilkan minimal satu saluran komunikasi (nomor WhatsApp atau alamat email).
3. THE Landing_Page SHALL menampilkan footer di bagian paling bawah halaman.
4. THE Footer SHALL menampilkan teks hak cipta dengan tahun berjalan dan nama organisasi "GMIM".
5. THE Footer SHALL menampilkan tautan ke kebijakan privasi atau syarat penggunaan jika tersedia.

---

### Requirement 6: Performa dan Aksesibilitas

**User Story:** Sebagai pengunjung dengan koneksi internet terbatas, saya ingin halaman dapat dimuat dengan cepat, sehingga saya tidak perlu menunggu lama untuk mengakses informasi.

#### Acceptance Criteria

1. THE Landing_Page SHALL dimuat sepenuhnya dalam waktu kurang dari 3 detik pada koneksi internet 4G standar.
2. THE Landing_Page SHALL menggunakan Tailwind CSS yang dimuat melalui CDN tanpa memerlukan proses build.
3. THE Landing_Page SHALL menyertakan atribut `alt` yang deskriptif pada setiap elemen gambar, baik saat gambar berhasil dimuat maupun tidak, untuk mendukung pengguna pembaca layar.
4. THE Landing_Page SHALL menggunakan kontras warna yang memenuhi standar WCAG AA (rasio kontras minimal 4.5:1 untuk teks normal).
5. THE Landing_Page SHALL menggunakan struktur heading yang hierarkis (H1 → H2 → H3) untuk mendukung navigasi dengan pembaca layar.
6. THE Landing_Page SHALL dapat diakses dan berfungsi penuh pada browser modern (Chrome, Firefox, Safari, Edge versi terbaru), dan dianggap tidak memenuhi syarat jika terdapat masalah fungsional pada salah satu browser tersebut.
7. IF gambar eksternal gagal dimuat, THEN THE Landing_Page SHALL menampilkan teks alternatif atau placeholder yang informatif.
