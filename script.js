
document.addEventListener("DOMContentLoaded", function() {

 
    const roles = ["Computer Science Student", "Data Enthusiast", "IoT Enthusiast"];
    const typingSpeed = 100;
    const deletingSpeed = 50; 
    const delayBetweenRoles = 2000; 


    const roleElement = document.querySelector("#role-typing span");

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        let targetText = "";

        if (isDeleting) {
  
            targetText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
      
            targetText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        roleElement.textContent = targetText;

    
        if (!isDeleting && charIndex === currentRole.length) {
  
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenRoles);
        } else if (isDeleting && charIndex === 0) {
    
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; 
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


const sections = document.querySelectorAll("section[id]");

// Ambil semua link navigasi
const navLinks = document.querySelectorAll(".navbar a");


function updateActiveNav() {

    if (window.scrollY < 10) { 
        navLinks.forEach(link => {
            link.classList.remove("active"); // Hapus semua class active
        });

        document.querySelector('.navbar a[href*="#home"]').classList.add("active");
        return; // Hentikan eksekusi fungsi agar tidak dilanjutkan
    }


    let currentSectionId = "";


    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        

        if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
            currentSectionId = section.getAttribute("id");
        }
    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (currentSectionId && link.getAttribute("href").includes(currentSectionId)) {
            link.classList.add("active");
        }
    });
}


window.addEventListener("scroll", updateActiveNav);


document.addEventListener("DOMContentLoaded", updateActiveNav);


const options = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.5 
};


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


const observer = new IntersectionObserver(callback, options);


const targets = document.querySelectorAll('.section-header h2');


targets.forEach(target => {
    observer.observe(target);
});