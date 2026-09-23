# English Daily

Aplikasi belajar kosakata & grammar bahasa Inggris harian. Situs statis murni (HTML/CSS/JS, tanpa build step), siap di-deploy ke Netlify.

## Isi folder

- `index.html` — seluruh aplikasi (UI, data kosakata, logika kuis & spaced repetition).
- `manifest.json` + `icons/` — supaya bisa di-install sebagai PWA (ikon di home screen HP, tampil seperti aplikasi native).
- `sw.js` — service worker sederhana untuk dukungan offline.
- `netlify.toml` — konfigurasi deploy Netlify (tidak perlu build command).

## Cara kerja progres belajar

Tidak ada login/akun. Progres (kata yang sudah dipelajari, jadwal review, hari beruntun) tersimpan otomatis di `localStorage` browser masing-masing perangkat. Ini artinya:

- Setiap orang yang membuka situs di perangkatnya sendiri otomatis punya progres sendiri, terpisah dari orang lain.
- Progres TIDAK otomatis pindah antar perangkat (misal dari HP ke laptop). Untuk memindahkan, buka tab **Progres** di aplikasi lalu:
  1. Klik **Export Progres** di perangkat lama -- file `.json` akan terunduh.
  2. Klik **Import Progres** di perangkat baru, lalu pilih file tadi.

## Deploy ke Netlify (lewat GitHub, auto-deploy)

1. **Buat repo GitHub baru** (misal nama `english-daily-app`), lalu upload semua isi folder ini ke repo tersebut (bisa drag & drop lewat halaman GitHub, tidak wajib pakai command line git).
2. Di **Netlify**, klik **Add new site → Import an existing project → Deploy with GitHub**, lalu pilih repo `english-daily-app` tadi.
3. Build settings: kosongkan **Build command**, isi **Publish directory** dengan `.` (titik). Klik **Deploy site**.
4. Selesai -- Netlify akan memberi URL seperti `nama-acak.netlify.app`. Bisa diganti ke domain sendiri lewat **Site settings → Domain management** kalau Anda punya domain.
5. Setiap kali ada update dari saya (nambah kosakata, fitur baru, dll), Anda tinggal terima perubahan di GitHub (lewat Pull Request atau langsung commit) -- Netlify otomatis build & deploy ulang, tidak perlu upload manual lagi.

## Rencana pengembangan lanjutan (opsional, kalau nanti dibutuhkan)

- **Sinkron otomatis lintas perangkat tanpa export/import manual**: butuh sistem login (misal Netlify Identity atau Supabase Auth) + database (Netlify Blobs, Supabase, atau Firebase). Ini lompatan yang lebih besar -- baru layak dikerjakan kalau export/import manual mulai terasa merepotkan.
- **Struktur kode lebih modular**: saat ini semua (HTML, CSS, JS, data kosakata) ada dalam satu file `index.html` supaya mudah dikelola dari sisi Claude Artifact sebelumnya. Untuk pengembangan jangka panjang di GitHub, kosakata bisa dipisah ke file `vocab.json` tersendiri supaya lebih mudah di-diff/di-review saat ada penambahan data.
