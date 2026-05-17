document.addEventListener("DOMContentLoaded", function () {
    // 1. FUNGSI JAM & TANGGAL REAL-TIME
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('live-time').innerText = timeStr;
        document.getElementById('live-date').innerText = dateStr;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. LOGIKA SINGLE PAGE APPLICATION (Navigasi Menu)
    const navLinks = document.querySelectorAll('.nav-menu li');
    const views = document.querySelectorAll('.view-section');
    const headerTitle = document.getElementById('header-title');
    const headerSubtitle = document.getElementById('header-subtitle');

    const menuData = {
        'dashboard-view': { title: 'Sistem Peringatan Dini Badai (Early Warning System)', sub: 'Prediksi Kecepatan Angin Ekstrem menggunakan Deep Learning' },
        'radar-view': { title: 'Radar Atmosfer Global', sub: 'Pemantauan pergerakan angin dan tekanan udara real-time' },
        'arsitektur-view': { title: 'Spesifikasi Arsitektur Neural Network', sub: 'Rincian hyperparameter dan topologi algoritma komparatif' },
        'log-view': { title: 'Pipeline Data & Log Sinkronisasi', sub: 'Monitoring stream data telemetri Apache Kafka' },
        'ekspor-view': { title: 'Pusat Pelaporan', sub: 'Generate dokumen analitik untuk keperluan akademik/industri' }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus status aktif dari semua menu
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Sembunyikan semua konten
            views.forEach(v => v.classList.remove('active'));
            
            // Munculkan konten yang diklik
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Update Teks Header
            headerTitle.innerText = menuData[targetId].title;
            headerSubtitle.innerText = menuData[targetId].sub;
        });
    });

    // 3. SIMULASI KAFKA LOG TERMINAL
    const terminal = document.getElementById('kafka-terminal');
    if(terminal) {
        setInterval(() => {
            const temp = (Math.random() * (40 - 20) + 20).toFixed(1);
            const wind = (Math.random() * (120 - 10) + 10).toFixed(1);
            const id = Math.floor(Math.random() * 90000) + 10000;
            const logLine = `> [RCV] Payload_ID: ${id} | Lat: -6.9, Lon: 107.6 | Temp: ${temp}C | Wind: ${wind} km/h | Status: Ingested<br>`;
            terminal.innerHTML += logLine;
            terminal.scrollTop = terminal.scrollHeight; // Auto scroll ke bawah
        }, 2500); // Muncul tiap 2.5 detik
    }

    // 4. ANIMASI LOADING FORM
    const form = document.getElementById("predictForm");
    if (form) {
        form.addEventListener("submit", function () {
            const btn = this.querySelector("button[type='submit']");
            const spinner = btn.querySelector(".spinner-border");
            const icon = btn.querySelector(".fa-microchip");
            btn.classList.add("disabled");
            icon.classList.add("d-none");
            spinner.classList.remove("d-none");
            btn.innerHTML = btn.innerHTML.replace("DETEKSI BADAI", "MENGHITUNG MATRIKS...");
        });
    }

    // 5. RENDER GRAFIK CHART.JS 
    if (typeof chartData !== 'undefined') {
        const ctx = document.getElementById('predChart').getContext('2d');
        let gradientCyan = ctx.createLinearGradient(0, 0, 0, 400);
        gradientCyan.addColorStop(0, 'rgba(0, 243, 255, 0.8)'); gradientCyan.addColorStop(1, 'rgba(0, 243, 255, 0.05)');
        let gradientPurple = ctx.createLinearGradient(0, 0, 0, 400);
        gradientPurple.addColorStop(0, 'rgba(188, 19, 254, 0.8)'); gradientPurple.addColorStop(1, 'rgba(188, 19, 254, 0.05)');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lin. Reg', 'ANN', 'Backprop', 'LSTM'],
                datasets: [{
                    data: chartData,
                    backgroundColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', gradientPurple, gradientCyan],
                    borderColor: ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.8)', '#bc13fe', '#00f3ff'],
                    borderWidth: 2, borderRadius: 8, barPercentage: 0.5
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, animation: { duration: 2000, easing: 'easeOutExpo' },
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748b' } },
                    x: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { weight: 'bold' } } }
                }
            }
        });
    }
});