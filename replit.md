# SDN GAYAM 5 SUKOHARJO - Website Sekolah

## Overview
Website resmi untuk Sekolah Dasar Negeri GAYAM 5 Sukoharjo. Ini adalah website statis yang menampilkan informasi tentang sekolah, berita, galeri, kontak, dan informasi PPDB (Penerimaan Peserta Didik Baru).

## Project Type
Static website - HTML, CSS, JavaScript with Bootstrap framework

## Project Structure
```
.
├── index.html          # Halaman beranda
├── profil.html         # Halaman profil sekolah
├── berita.html         # Halaman berita dan pengumuman
├── galeri.html         # Halaman galeri foto
├── kontak.html         # Halaman kontak
├── ppdb.html           # Halaman PPDB
├── style.css           # Stylesheet utama
├── script.js           # JavaScript untuk interaktivitas
├── server.py           # Python HTTP server untuk serving files
└── asset/              # Folder untuk gambar dan aset
    ├── beranda/        # Gambar untuk halaman beranda
    ├── favicon.png     # Icon website
    └── logo-sd.png     # Logo sekolah
```

## Technologies Used
- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan custom CSS
- **Bootstrap 5.3.2** - Framework CSS untuk responsive design
- **Bootstrap Icons** - Icon library
- **JavaScript (Vanilla)** - Interaktivitas client-side
- **Python HTTP Server** - Simple web server untuk development

## Features
1. **Responsive Design** - Website dapat diakses dari berbagai perangkat
2. **Hero Carousel** - Slider gambar di halaman beranda
3. **Dynamic Navigation** - Active link highlighting
4. **News Filtering** - Filter berita berdasarkan kategori
5. **Gallery Filtering** - Filter galeri berdasarkan kategori
6. **Contact Form** - Form kontak dengan validasi (data disimpan di localStorage)
7. **PPDB Registration Form** - Form pendaftaran siswa baru (data disimpan di localStorage)
8. **Smooth Scroll** - Animasi scroll yang smooth
9. **Scroll Animations** - Animasi saat scroll halaman

## Setup in Replit
- Python 3.11 installed untuk menjalankan simple HTTP server
- Server berjalan di port 5000 dengan host 0.0.0.0
- Cache-Control headers ditambahkan untuk mencegah caching issues

## Running the Project
The website runs via a Python HTTP server configured in the workflow:
- Command: `python server.py`
- Port: 5000
- Host: 0.0.0.0

## Data Storage
Website ini menggunakan localStorage browser untuk menyimpan:
- Pendaftaran PPDB (ppdbRegistrations)
- Pesan kontak (contactMessages)

Data ini hanya tersimpan di browser pengguna dan tidak ada backend database.

## Recent Changes (November 20, 2025)
- Initial setup for Replit environment
- Added Python HTTP server with cache control
- Configured workflow for port 5000
- Added .gitignore for Python files
- Created replit.md documentation

### Berita (News) Section Update
- Redesigned berita.html dengan hero banner dan breadcrumb navigation
- Modified card berita layout dengan:
  - Gambar placeholder di bagian atas
  - Tanggal publikasi dengan ikon
  - Ikon social media (Facebook, Instagram, TikTok, YouTube)
  - Tombol "Baca Selengkapnya"
- Created detail-berita.html untuk halaman detail berita dengan:
  - Breadcrumb navigation (Beranda / Berita / Detail Berita)
  - Social media share icons (Facebook, Instagram, TikTok)
  - Featured image besar
  - Konten artikel lengkap
  - Sidebar "BERITA LAIN" dengan list berita lainnya
  - HASHTAG section sudah dihapus sesuai permintaan
- Added folder asset/berita/ untuk menyimpan gambar-gambar berita
- Created placeholder.jpg sebagai gambar sementara
- Added CSS styling untuk berita cards, detail page, dan sidebar

### Footer Update (All Pages)
- Updated footer di semua halaman (index, profil, berita, detail-berita, galeri, kontak, ppdb)
- Footer sekarang menampilkan informasi sekolah lengkap dalam 4 kolom:
  - Kolom 1: SDN GAYAM 5 SUKOHARJO dengan tagline
  - Kolom 2: Informasi Sekolah (NPSN, Jenjang, Akreditasi, Kurikulum, Jam Belajar, Kepala Sekolah, Operator)
  - Kolom 3: Kontak (Provinsi, Kabupaten, Kecamatan, Kelurahan, Telepon, Email)
  - Kolom 4: Tautan Cepat
- Data sekolah yang ditampilkan:
  - NPSN: 20330861
  - Jenjang: Sekolah Dasar
  - Kepala Sekolah: Mila Kartika Sari, S.Pd., M.Pd
  - Operator: Indah Ayu Marga Utami, S.Pd
  - Akreditasi: A
  - Kurikulum: Kurikulum Merdeka
  - Jam Belajar: Pagi / 6 hari
  - Telepon: 0271593604
  - Email: sdn.gayam05skh@gmail.com
  - Lokasi: Gayam, Sukoharjo, Jawa Tengah

### Struktur Organisasi Update (November 26, 2025)
- Memperbarui bagian struktur organisasi di halaman profil dengan foto-foto tenaga pendidik asli
- Membuat folder asset/guru/ untuk menyimpan foto-foto tenaga pendidik
- Daftar foto tenaga pendidik yang ditambahkan:
  - mila_kartika_sari.jpg - Kepala Sekolah
  - ratih_windi_tri_hastutik.jpg - Wali Kelas 1
  - siti_chosyatun.jpg - Wali Kelas 2
  - indah_ayu_marga_utami.jpg - Wali Kelas 3
  - zuyyina_fadhila_muhtari.jpg - Wali Kelas 4
  - yandra_dwi_yuliani.jpg - Wali Kelas 5
  - okfi_pusvitasari.jpg - Wali Kelas 6
  - nurrohmah_widiyastuti.jpg - Guru Mapel PAI
  - nia_febrihastuti.jpg - Guru Mapel Bahasa Inggris
  - setyo_adi_widakdo.png - Guru Mapel PJOK
  - widodo.jpg - Penjaga Sekolah
- Menambahkan CSS styling baru untuk foto tenaga pendidik:
  - .org-photo: Foto bulat dengan border berwarna sesuai kategori
  - .org-section: Container untuk setiap bagian struktur organisasi
  - .org-section-title: Judul bagian struktur organisasi
- Struktur organisasi diorganisir dalam kategori:
  - Kepala Sekolah (biru primary)
  - Wali Kelas (hijau success)
  - Guru Mata Pelajaran (biru info)
  - Tenaga Kependidikan (abu secondary)

### SPMB/PPDB Redesign (November 30, 2025)
- Redesign halaman PPDB dengan desain baru SPMB (Sistem Penerimaan Murid Baru) TA 2025/2026
- Halaman PPDB (ppdb.html) sekarang menampilkan:
  - SPMB header dengan judul dan gambar sekolah
  - Info section dengan jadwal pendaftaran (24-26 Juni 2025)
  - Poster PPDB dari file asset/ppdb-poster.jpg
  - Section "Daftar Sekarang!!" dengan link WhatsApp yang bisa diklik
  - Informasi Ekstrakurikuler, Pendidikan Karakter, Syarat Pendaftaran, dan Fasilitas
- Halaman beranda (index.html) diupdate:
  - Section PPDB baru dengan desain yang sama
  - Carousel slide diupdate menjadi "SPMB 2025/2026 DIBUKA!"
  - Link WhatsApp untuk pendaftaran
- Kontak pendaftaran PPDB:
  - 0878-8932-3627 (Bu Okfi P. S.Pd) - link: wa.me/6287889323627
  - 0852-9210-0228 (Bapak Setyo A.W. S.Pd) - link: wa.me/6285292100228
- CSS styling baru untuk SPMB/PPDB sections dengan responsive design
- Header halaman Kontak diubah dari overlay biru menjadi overlay gelap (sama seperti halaman Berita)

## Deployment
Configured as static deployment with public directory serving all HTML/CSS/JS files.
