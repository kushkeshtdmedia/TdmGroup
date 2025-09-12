// Mobile Menu Toggle Functions
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.getElementById('navOverlay');
    
    hamburger.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.getElementById('navOverlay');
    
    hamburger.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners for Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const hamburger = document.querySelector('.hamburger');
        const navOverlay = document.getElementById('navOverlay');
        
        if (!hamburger.contains(event.target) && !navOverlay.contains(event.target)) {
            if (navOverlay.classList.contains('active')) {
                closeMenu();
            }
        }
    });

    // Handle window resize - close menu if window becomes desktop size
    window.addEventListener('resize', function() {
        const navOverlay = document.getElementById('navOverlay');
        if (window.innerWidth > 1024 && navOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Logo Animation Effects
    const logo = document.querySelector('.rotating-logo');
    if (logo) {
        // Pause animation on hover and add scale effect
        logo.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });

        // Click effect
        logo.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });

        logo.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.2)';
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

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // Close menu with Escape key
        if (e.key === 'Escape') {
            const navOverlay = document.getElementById('navOverlay');
            if (navOverlay.classList.contains('active')) {
                closeMenu();
            }
        }
    });

    // Touch Support for Mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const navOverlay = document.getElementById('navOverlay');
        
        if (navOverlay.classList.contains('active')) {
            // Swipe up to close menu
            if (touchStartY - touchEndY > swipeThreshold) {
                closeMenu();
            }
        }
    }
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

// Performance optimization - Debounced resize handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const debouncedResize = debounce(function() {
    const navOverlay = document.getElementById('navOverlay');
    if (window.innerWidth > 1024 && navOverlay.classList.contains('active')) {
        closeMenu();
    }
}, 250);

window.addEventListener('resize', debouncedResize);
// Hamburger Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const navigation = document.querySelector('.navigation');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const body = document.body;

    // Create hamburger menu if it doesn't exist
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        navigation.appendChild(hamburger);
    }

    // Create overlay if it doesn't exist
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Prevent scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    // Close mobile menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }

    // Event listeners
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Close menu when overlay is clicked
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add small delay for smooth transition
            setTimeout(closeMenu, 100);
        });
    });

    // Close menu on window resize (tablet to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Prevent menu from staying open on page load
    closeMenu();

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
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

    // Add active state to current section nav item
    function updateActiveNavItem() {
        const sections = ['#it', '#advertising', '#health', '#hospitality', '#community'];
        const scrollPosition = window.scrollY + 150;

        sections.forEach((sectionId, index) => {
            const section = document.querySelector(sectionId);
            const navLink = document.querySelector(`a[href="${sectionId}"]`);
            
            if (section && navLink) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Remove active class from all nav items
                    navLinks.forEach(link => {
                        link.parentElement.classList.remove('current-page');
                    });
                    
                    // Add active class to current nav item
                    navLink.parentElement.classList.add('current-page');
                }
            }
        });
    }

    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Set initial active nav item
    updateActiveNavItem();

    // Touch swipe to close menu
    let touchStartX = 0;

    navMenu.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    navMenu.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchStartX - touchEndX;
        
        // If swiped right to left by more than 100px, close menu
        if (swipeDistance > 100) {
            closeMenu();
        }
    }, { passive: true });
});