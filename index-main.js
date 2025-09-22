// Index Page Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // CTA Button Enhanced Effects
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('.arrow-circle');
            if (arrow) {
                arrow.style.transform = 'translateX(5px) rotate(90deg)';
                arrow.style.transition = 'all 0.3s ease';
            }
        });

        ctaButton.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('.arrow-circle');
            if (arrow) {
                arrow.style.transform = 'translateX(0) rotate(0deg)';
            }
        });
    }

    // Card Hover Effects Enhancement
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle parallax effect to icon
            const icon = this.querySelector('.icon-svg');
            if (icon) {
                icon.style.transform = 'scale(1.1) translateY(-2px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon-svg');
            if (icon) {
                icon.style.transform = 'scale(1) translateY(0)';
            }
        });
    });

    // Spectrum Cards Animation
    const spectrumCards = document.querySelectorAll('.spectrum-card');
    spectrumCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add rotation effect to card image icon
            const cardIcon = this.querySelector('.card-image > div');
            if (cardIcon) {
                cardIcon.style.transform = 'scale(1.1) rotate(5deg)';
                cardIcon.style.transition = 'all 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const cardIcon = this.querySelector('.card-image > div');
            if (cardIcon) {
                cardIcon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Explore Button Wave Effect
    const exploreButton = document.querySelector('.explore-button');
    if (exploreButton) {
        exploreButton.addEventListener('mouseenter', function() {
            // Trigger the wave effect
            this.style.backgroundSize = '400% 400%';
            this.style.animation = 'gradientShift 2s ease infinite';
        });

        exploreButton.addEventListener('mouseleave', function() {
            this.style.backgroundSize = '100% 100%';
            this.style.animation = 'none';
        });
    }

    // Scroll-based Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.impact-card, .spectrum-card, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Smooth scroll for CTA and explore buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Performance optimization - Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Add any scroll-based functionality here
        }, 10);
    });
});

// Add CSS for gradient animation
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .explore-button:hover {
        background: linear-gradient(-45deg, #FF6347, #FFD700, #FF6347, #FFD700);
        background-size: 400% 400%;
    }
`;
document.head.appendChild(style);