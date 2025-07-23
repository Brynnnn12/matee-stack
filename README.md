# Game Characterpedia

Sebuah website katalog karakter dari berbagai game 2D/3D. Cocok untuk mencari informasi seperti nama, asal game, gambar, skill, dan deskripsi karakter.

## 🚀 Teknologi yang Digunakan

- [Express.js](https://expressjs.com/) — Backend framework Node.js
- [EJS](https://ejs.co/) — Templating engine untuk rendering halaman
- [Tailwind CSS](https://tailwindcss.com/) — Styling cepat & responsif
- [MySQL](https://www.mysql.com/) — Database relasional

---

## 🧠 Fitur Utama

| Fitur              | Keterangan                                           |
|--------------------|-----------------------------------------------------|
| 📄 Halaman Home    | Menampilkan list karakter                           |
| 👤 Detail Karakter | Menampilkan info lengkap & gambar                   |
| 🔎 Filter & Search | Cari karakter berdasarkan game atau nama            |
| ➕ Tambah Karakter | (opsional, hanya untuk admin)                       |
| 🧙 Daftar Skill    | Skill atau ability tiap karakter                    |
| 💬 Komentar        | Komentar user (opsional)                            |

---

## 🗃️ ERD Sederhana

**Tabel Users**
- `id`
- `name`
- `email`
- `roleId`
- `avatar`
- `password`

**Tabel Genre**
- `id`
- `name`
- `slug`


**Tabel Games**
- `id`
- `title`
- `slug`
- `genre_id`

**Tabel Characters**
- `id`
- `name`
- `game_id` → games.id
- `description`
- `avatar_url`

**Tabel Skills**
- `id`
- `character_id` → characters.id
- `name`
- `description`

---

## 🧱 Struktur Folder

```
characterpedia/
├── public/
│   └── src/
│       └── output.css                # Hasil build Tailwind
├── src/
│   ├── app.js                        # Entry point Express
│   ├── routes/
│   │   └── web.js                    # Routing utama
│   ├── controllers/
│   │   └── characterController.js    # Logic karakter
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.ejs              # Layout template EJS
│   │   ├── index.ejs                 # Halaman daftar karakter
│   │   ├── detail.ejs                # Halaman detail karakter
│   └── models/
│       └── user.js                   # Model User
│       └── game.js                   # Model Game
│       └── character.js              # Model Character
│       └── skill.js                  # Model Skill
├── .env                              # Konfigurasi environment
└── package.json                      # Info & dependencies Node
```

---

## 🔧 Fitur Awal

1. **Halaman Home /**  
   Menampilkan daftar karakter: nama, gambar, asal game.

2. **Halaman Detail /characters/:id**  
   Menampilkan deskripsi dan list skill karakter.

---

## 💻 Cara Instalasi & Menjalankan Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/yourusername/characterpedia.git
   cd characterpedia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Konfigurasi environment (.env):**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=characterpedia
   ```

4. **Generate file Tailwind:**
   ```bash
   npx tailwindcss -i ./src/input.css -o ./public/src/output.css --watch
   ```

5. **Jalankan server:**
   ```bash
   npm start
   ```

6. **Akses website:**  
   Buka [http://localhost:3000](http://localhost:3000)

---

## 📄 Contoh Tampilan

- **Home:** List karakter dengan gambar & nama
- **Detail Karakter:** Info lengkap, deskripsi, asal game, dan daftar skill

---

## 📦 Dependencies Utama

- express
- ejs
- mysql2
- dotenv
- tailwindcss

Tambahkan/instal dependencies lain sesuai kebutuhan.

---

## 📝 Kontribusi

Silakan buat pull request atau issue jika ingin menambah fitur atau melaporkan bug.

---

## 📬 Lisensi

[MIT](LICENSE)
