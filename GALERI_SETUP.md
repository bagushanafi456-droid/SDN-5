# Setup Galeri Dinamis SDN GAYAM 5

## Struktur Folder

Galeri sudah diatur dalam struktur folder otomatis:

```
asset/galeri/
├── ekstrakurikuler/
│   ├── futsal/
│   │   ├── foto1.jpg
│   │   ├── foto2.jpg
│   │   └── ...
│   ├── basket/
│   ├── paduan-suara/
│   ├── pramuka/
│   └── tari/
├── fasilitas/
│   ├── gedung-sekolah/
│   ├── perpustakaan/
│   ├── lab-komputer/
│   ├── lapangan-olahraga/
│   └── aula/
└── kegiatan/
    ├── upacara-bendera/
    ├── pembelajaran/
    ├── hari-kemerdekaan/
    ├── acara-tahunan/
    └── kegiatan-sosial/
```

## Cara Menambahkan Gambar

1. **Buka File Explorer** dan navigasi ke folder proyek `d:\Download\SDN-5\`

2. **Masuk ke folder** `asset/galeri/` sesuai kategori yang ingin diisi:
   - `ekstrakurikuler/futsal/` untuk foto ekstrakurikuler futsal
   - `fasilitas/perpustakaan/` untuk foto perpustakaan
   - `kegiatan/upacara-bendera/` untuk foto upacara
   - dll

3. **Copy/Paste gambar** ke folder tujuan

4. **Format gambar yang didukung:**
   - `.jpg` / `.jpeg`
   - `.png`
   - `.webp`

5. **Simpan dan refresh browser** - Galeri akan otomatis menampilkan gambar baru

## Bagaimana Sistemnya Bekerja

### API Endpoints

Server Python menyediakan 2 API endpoint:

**1. Get Daftar Kategori dan Subfolder**
```
GET /api/galeri/categories
```
Response:
```json
{
  "ekstrakurikuler": [
    {
      "name": "futsal",
      "display_name": "Futsal",
      "path": "asset/galeri/ekstrakurikuler/futsal",
      "image_count": 5
    },
    ...
  ],
  ...
}
```

**2. Get Daftar Gambar di Subfolder**
```
GET /api/galeri/images?path=ekstrakurikuler/futsal
```
Response:
```json
[
  {
    "filename": "foto1.jpg",
    "path": "asset/galeri/ekstrakurikuler/futsal/foto1.jpg",
    "size": 125000
  },
  ...
]
```

## Cara Menjalankan

1. **Buka Terminal** di VS Code (Ctrl + `)

2. **Jalankan server:**
   ```powershell
   python server.py
   ```

3. **Buka browser** dan kunjungi:
   ```
   http://localhost:5000/galeri.html
   ```

4. **Server akan menampilkan:**
   ```
   Server running at http://0.0.0.0:5000/
   API endpoints:
     - GET /api/galeri/categories
     - GET /api/galeri/images?path=subfolder_path
   ```

## Fitur Galeri

✅ Menampilkan 3 kategori utama (Ekstrakurikuler, Fasilitas, Kegiatan)
✅ Subfolder otomatis terbaca dari folder `asset/galeri/`
✅ Gambar otomatis terbaca dan ditampilkan
✅ Lightbox modal untuk melihat gambar full size
✅ Responsive design untuk mobile dan desktop
✅ Menghitung jumlah gambar di setiap subfolder

## Troubleshooting

### Gambar tidak muncul
- Pastikan gambar berada di folder yang benar
- Refresh browser (Ctrl + F5)
- Cek Console (F12) untuk error messages

### Subfolder tidak muncul
- Pastikan folder dibuat dengan nama yang tepat (menggunakan hyphen `-` bukan space)
- Contoh: `futsal` bukan `Futsal`

### Port 5000 sudah digunakan
- Ubah PORT di `server.py` menjadi port lain (misal 8000)
- Restart server

## File-file yang Diubah

- ✅ `galeri.html` - Tambah section untuk gallery images
- ✅ `script.js` - Fungsi baru untuk load API dan menampilkan gambar
- ✅ `style.css` - CSS untuk gallery image cards
- ✅ `server.py` - Tambah API endpoints
- ✅ `api_galeri.py` - Module baru untuk handle folder structure

## Notes

- Gambar akan ditampilkan sesuai urutan alphabetical
- Ukuran gambar tidak ada batasan, tapi disarankan gunakan ukuran standar (max 5MB per gambar)
- Untuk performa optimal, gunakan format JPG untuk foto
- Format PNG cocok untuk gambar dengan transparansi
