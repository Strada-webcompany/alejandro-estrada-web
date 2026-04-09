document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(7, 9, 14, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(7, 9, 14, 0.8)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Apple-style Scroll Storytelling & Parallax Engine ---
    
    const parallaxElements = document.querySelectorAll('.parallax-el, .hero-bg-effect, .hero-visual');
    const revealElements = document.querySelectorAll('.card, .service-item, .story-element, .section-header, .hero-text, .final-cta .cta-content, .trust-point');
    
    // Pre-setup reveal items
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        // Add subtle delay to elements depending on their index or type for cascade effect
        const delay = el.classList.contains('trust-point') ? (index % 3) * 0.15 : 0;
        
        el.style.transform = 'translateY(60px)';
        el.style.transition = `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        el.style.willChange = 'opacity, transform';
    });

    const scrollRender = () => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;

        // Parallax Effect
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.1;
            const rect = el.getBoundingClientRect();
            
            // Only animate if element is in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate distance from center of screen for smooth parallax
                const centerOffset = (rect.top + (rect.height/2)) - (windowHeight/2);
                const yPos = (centerOffset * speed);
                
                // Add tiny scale effect to hero visual
                if (el.classList.contains('hero-visual')) {
                    const scale = Math.max(0.9, 1 - (scrolled * 0.0005));
                    el.style.transform = `translateY(${scrolled * 0.2}px) scale(${scale})`;
                } else {
                    el.style.transform = `translateY(${yPos}px)`;
                }
            }
        });

        // Intersection reveal (Scroll Storytelling)
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Trigger when element crosses the 85% threshold of viewport height
            if (rect.top < windowHeight * 0.85) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });

        requestAnimationFrame(scrollRender);
    };

    // Kickoff the loop
    requestAnimationFrame(scrollRender);

});
