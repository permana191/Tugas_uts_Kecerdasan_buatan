# 🌪️ NEXUS.AI: Sistem Peringatan Dini Badai Berbasis Deep Learning

**Sistem Prediksi Badai AI | Sigit Miraj Permana** Repositori ini berisi *source code* lengkap untuk proyek Ujian Tengah Semester (UTS) Praktikum Kecerdasan Buatan, Program Studi Teknik Informatika, Fakultas Teknologi Informasi, Universitas Bale Bandung (UNIBBA).

---

## 🔗 Tautan Penting Proyek
- 🌐 **Live Website (Aplikasi Aktif):** [www.sistemperingatandinibadaisigit.my.id](http://www.sistemperingatandinibadaisigit.my.id)
- 📺 **Video Presentasi & Demo (YouTube):** [Tonton di sini (youtu.be/e-4auHKiZqI)](https://youtu.be/e-4auHKiZqI)
- 💻 **GitHub Repository:** [permana191/Tugas_uts_Kecerdasan_buatan](https://github.com/permana191/Tugas_uts_Kecerdasan_buatan)

---

## 📖 Deskripsi Proyek
**NEXUS.AI** adalah sebuah platform mitigasi bencana hidrometeorologi (Sistem Peringatan Dini) yang dirancang untuk memprediksi potensi kecepatan angin ekstrem (*Wind Gust Speed*). Sistem ini mengkomparasikan 5 algoritma Kecerdasan Buatan yang berbeda untuk membaca dinamika atmosfer tropis (Suhu, Kelembapan, Tekanan Udara, dan Curah Hujan).

### 🧠 Algoritma Machine Learning & Deep Learning yang Digunakan:
1. **K-Means Clustering:** Bertindak sebagai *Feature Engineering* spasial (Unsupervised Learning).
2. **Linear Regression:** Bertindak sebagai *Baseline Model* statistik.
3. **Custom Backpropagation:** Jaringan Saraf Tiruan yang dibangun murni secara manual menggunakan matriks `Numpy` (Tanpa framework).
4. **Artificial Neural Network (ANN):** Model *Deep Learning* Multilayer Perceptron menggunakan TensorFlow Keras.
5. **Long Short-Term Memory (LSTM):** Arsitektur sel *Sequential* mutakhir untuk menangkap memori fluktuasi deret waktu (*time-series*).

Sistem dilengkapi dengan **Post-Processing Calibration Engine** di lapisan *backend* untuk meredam anomali matematis *Exploding Gradient* saat model menerima input data badai yang ekstrem.

---

## 🚀 Fitur Aplikasi Web
Aplikasi web ini dibangun menggunakan arsitektur **Single Page Application (SPA)** dengan desain **Cyber-Glassmorphism**.
- **Panel Prediksi Real-Time:** Menghitung dan memvisualisasikan hasil komparasi 4 algoritma sekaligus menggunakan grafik interaktif (Chart.js).
- **Radar Atmosfer Global:** Pemantauan titik angin satelit secara langsung (*Live Iframe* dari Windy).
- **Terminal Log Kafka:** Simulasi antarmuka konsol log aliran data masuk (*Data Ingestion*).
- **Ekspor Dokumen:** Mencetak dokumen laporan analitik prediksi ke dalam format PDF sekali klik.

---

## 🛠️ Tech Stack (Arsitektur Teknologi)
- **Data Science & AI:** `Python`, `Pandas`, `Numpy`, `Scikit-Learn`, `TensorFlow/Keras`
- **Backend Web Server:** `Flask`, `Gunicorn`
- **Frontend UI/UX:** `HTML5`, `CSS3 (Glassmorphism)`, `Vanilla JS`, `Bootstrap 5`, `Chart.js`
- **Cloud Deployment:** `Docker`, `Railway.app`, IDwebhost (Custom Domain)

---

## ⚙️ Cara Menjalankan di Komputer Lokal (Localhost)

1. Clone repositori ini:
   ```bash
   git clone [https://github.com/permana191/Tugas_uts_Kecerdasan_buatan.git](https://github.com/permana191/Tugas_uts_Kecerdasan_buatan.git)
   cd Tugas_uts_Kecerdasan_buatan
