// Global Header JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const navigation = document.querySelector('.navigation');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const body = document.body;
    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.querySelector('.nav-overlay');

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
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
    }

    // Close menu when overlay is clicked
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

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

    // Logo Animation Effects
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

    // Smooth scroll for navigation links (for anchor links)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link on the same page
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

    // Set active nav item based on current page
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop();
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref.split('/').pop().split('#')[0];
            
            // Remove active class from all
            link.parentElement.classList.remove('current-page');
            
            // Add active class to current page
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === '')) {
                link.parentElement.classList.add('current-page');
            }
        });
    }

    // Set initial active nav item
    setActiveNavItem();

    // Touch swipe to close menu
    let touchStartX = 0;

    if (navMenu) {
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
    }

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
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }, 250);

    window.addEventListener('resize', debouncedResize);
});