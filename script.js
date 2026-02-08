// --- SCROLL REVEAL ANIMATION ---
const observerOptions = {
    threshold: 0.15 // Trigger when 15% of section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Apply initial hidden state to all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)"; // Slide up effect
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});

// --- SMOOTH NAV SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});