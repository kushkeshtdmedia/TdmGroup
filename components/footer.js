// Global Footer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Social icons hover effects
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Footer links smooth scroll for anchor links
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 100; // Adjust based on your header height
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add loading animation to footer on scroll
    const footer = document.querySelector('.global-footer');
    let footerObserver;

    if (footer) {
        footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add fade-in animation to footer sections
                    const footerSections = footer.querySelectorAll('.footer-section');
                    footerSections.forEach((section, index) => {
                        setTimeout(() => {
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        footerObserver.observe(footer);

        // Initially hide footer sections for animation
        const footerSections = footer.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // Email and phone click handlers
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Optional: Add analytics tracking or other functionality
            console.log('Email link clicked:', this.getAttribute('href'));
        });
    });

    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Optional: Add analytics tracking or other functionality
            console.log('Phone link clicked:', this.getAttribute('href'));
        });
    });

    // Dynamic year update
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom-content p');
    if (copyrightText && copyrightText.textContent.includes('2024')) {
        copyrightText.textContent = copyrightText.textContent.replace('2024', currentYear);
    }

    // Add hover effects to footer links
    const footerLinksWithHover = document.querySelectorAll('.footer-links a');
    footerLinksWithHover.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.paddingLeft = '8px';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.paddingLeft = '0';
        });
    });

    // Cleanup observer on page unload
    window.addEventListener('beforeunload', function() {
        if (footerObserver) {
            footerObserver.disconnect();
        }
    });
});