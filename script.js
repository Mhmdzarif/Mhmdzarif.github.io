// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();

        const headerOffset = 80; // Sticky header height
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.max(Math.abs(distance)/2, 500), 1500);

        let startTime = null;

        function easeInOutQuad(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed/duration, 1);
            const run = startPosition + distance*easeInOutQuad(progress);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    });
});

// Scroll-triggered animations
const scrollElements = document.querySelectorAll('.animate-on-scroll');

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (el) => { el.classList.add('visible'); };
const hideScrollElement = (el) => { el.classList.remove('visible'); };

const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if (elementInView(el, 150)) displayScrollElement(el);
        // Optional: hide if out of view
        // else hideScrollElement(el);
    });
};

window.addEventListener('scroll', () => { handleScrollAnimation(); });
window.addEventListener('load', () => { handleScrollAnimation(); });
