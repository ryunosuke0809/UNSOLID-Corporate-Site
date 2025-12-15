/**
 * UNSOLID Inc. Corporate Website
 * Interactive Behaviors & Animations
 */

// ========================================
// DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initScrollEffects();
    initFadeInAnimations();
    initContactForm();
    initSmoothScroll();
    initMobileMenu();
});

// ========================================
// Header Scroll Effect
// ========================================
function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add 'scrolled' class when scrolling down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// Fade-in Animations on Scroll
// ========================================
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Contact Form Handling
// ========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showFormMessage('error', 'すべての項目を入力してください。', 'Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('error', 'メールアドレスの形式が正しくありません。', 'Please enter a valid email address.');
            return;
        }
        
        // Disable submit button
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate form submission (since we're using static hosting)
        // In production, this would send to a backend endpoint
        setTimeout(function() {
            showFormMessage('success', 
                'お問い合わせありがとうございます。担当者より折り返しご連絡いたします。',
                'Thank you for your message. We will contact you soon.'
            );
            
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 1000);
        
        // For actual backend integration:
        /*
        fetch('send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showFormMessage('success', 
                    'お問い合わせありがとうございます。担当者より折り返しご連絡いたします。',
                    'Thank you for your message. We will contact you soon.'
                );
                form.reset();
            } else {
                showFormMessage('error', 
                    'エラーが発生しました。もう一度お試しください。',
                    'An error occurred. Please try again.'
                );
            }
        })
        .catch(error => {
            showFormMessage('error', 
                'エラーが発生しました。もう一度お試しください。',
                'An error occurred. Please try again.'
            );
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
        */
    });
}

// ========================================
// Form Message Display
// ========================================
function showFormMessage(type, messageJP, messageEN) {
    // Determine language based on current page
    const isJapanese = document.documentElement.lang === 'ja';
    const message = isJapanese ? messageJP : messageEN;
    
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        font-weight: 600;
        text-align: center;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background-color: rgba(0, 212, 255, 0.1); border: 1px solid var(--color-accent-blue); color: var(--color-accent-blue);'
            : 'background-color: rgba(255, 23, 68, 0.1); border: 1px solid var(--color-accent-red); color: var(--color-accent-red);'
        }
    `;
    
    // Insert after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(function() {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// ========================================
// Add slideIn animation
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Utility: Debounce Function
// ========================================
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

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (!hamburger || !mobileNav) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        
        // Prevent body scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when overlay is clicked
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on window resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }, 250));
}

// ========================================
// Performance: Reduce motion for accessibility
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}
