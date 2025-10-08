// Menunggu sampai seluruh halaman HTML dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function() {

    // --- Kustomisasi di sini ---
    const roles = ["Computer Science Student", "Data Analysis Enthusiast", "IoT Enthusiast"];
    const typingSpeed = 100; // Kecepatan mengetik (dalam milidetik)
    const deletingSpeed = 50; // Kecepatan menghapus (dalam milidetik)
    const delayBetweenRoles = 2000; // Jeda sebelum mulai menghapus (dalam milidetik)
    // -------------------------

    const roleElement = document.querySelector("#role-typing span");

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        let targetText = "";

        if (isDeleting) {
            // Proses menghapus teks
            targetText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Proses mengetik teks
            targetText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        roleElement.textContent = targetText;

        // Logika untuk beralih antara mengetik dan menghapus
        if (!isDeleting && charIndex === currentRole.length) {
            // Selesai mengetik, jeda, lalu mulai hapus
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenRoles);
        } else if (isDeleting && charIndex === 0) {
            // Selesai menghapus, ganti ke role berikutnya
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Loop kembali ke awal jika sudah di akhir
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Lanjutkan mengetik atau menghapus
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeEffect, speed);
        }
    }

    // Mulai efek ketik saat halaman dimuat
    typeEffect();
});

// Ambil semua section yang memiliki ID
const sections = document.querySelectorAll("section[id]");

// Ambil semua link navigasi
const navLinks = document.querySelectorAll(".navbar a");

// Fungsi untuk meng-update status aktif pada link navigasi
function updateActiveNav() {
    // --- PERBAIKAN DIMULAI DI SINI ---
    // Cek khusus jika pengguna berada di paling atas halaman
    if (window.scrollY < 10) { 
        navLinks.forEach(link => {
            link.classList.remove("active"); // Hapus semua class active
        });
        // Tambahkan class active hanya ke link "Home"
        document.querySelector('.navbar a[href*="#home"]').classList.add("active");
        return; // Hentikan eksekusi fungsi agar tidak dilanjutkan
    }
    // --- PERBAIKAN SELESAI ---

    let currentSectionId = "";

    // Loop melalui setiap section untuk menemukan yang sedang terlihat di layar
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Cek apakah posisi scroll berada di dalam section ini
        // Angka 150 adalah offset agar highlight berpindah sedikit lebih awal
        if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
            currentSectionId = section.getAttribute("id");
        }
    });

    // Loop melalui setiap link navigasi
    navLinks.forEach(link => {
        // Hapus class 'active' dari semua link terlebih dahulu
        link.classList.remove("active");

        // Jika href link mengandung ID section yang sedang aktif, tambahkan class 'active'
        if (currentSectionId && link.getAttribute("href").includes(currentSectionId)) {
            link.classList.add("active");
        }
    });
}

// Jalankan fungsi saat halaman di-scroll
window.addEventListener("scroll", updateActiveNav);

// Jalankan fungsi sekali saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", updateActiveNav);

// Opsi untuk Intersection Observer
const options = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.5 
};

// Fungsi yang akan dijalankan saat elemen terlihat atau tidak terlihat
const callback = (entries, observer) => {
    entries.forEach(entry => {
        // Cek apakah elemen sedang terlihat di layar
        if (entry.isIntersecting) {
            // Jika YA, tambahkan kelas 'visible' untuk memunculkan garis
            entry.target.classList.add('visible');
        } else {
            // Jika TIDAK, hapus kelas 'visible' untuk menghilangkan garis
            entry.target.classList.remove('visible');
        }
    });
};

// Buat observer baru
const observer = new IntersectionObserver(callback, options);

// Pilih semua elemen yang ingin diamati
const targets = document.querySelectorAll('.section-header h2');

// Mulai amati setiap elemen
targets.forEach(target => {
    observer.observe(target);
});