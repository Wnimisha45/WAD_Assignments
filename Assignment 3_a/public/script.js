// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ===== Smooth Scroll Function =====
function scrollTo(selector) {
    const element = document.getElementById(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (window.scrollY === 0 || window.scrollY < 100) {
        const homeLink = document.querySelector('.nav-links a[href="/"]');
        if (homeLink) homeLink.classList.add('active');
    }
});

// ===== Form Handling for Contact Page =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const successMsg = document.querySelector('.success-message');
        const errorMsg = document.querySelector('.error-message');

        // Get form values
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        // Reset messages
        if (successMsg) successMsg.style.display = 'none';
        if (errorMsg) errorMsg.style.display = 'none';

        // Validation
        if (!name || !email || !subject || !message) {
            if (errorMsg) {
                errorMsg.textContent = 'Please fill in all fields';
                errorMsg.style.display = 'block';
            }
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (errorMsg) {
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.style.display = 'block';
            }
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate server response delay
        setTimeout(() => {
            if (successMsg) {
                successMsg.textContent = '✓ Thank you for your message! We will get back to you soon.';
                successMsg.style.display = 'block';
            }

            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Scroll to message
            if (successMsg) {
                successMsg.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1500);
    });
}

// ===== Counter Animation for Statistics =====
const statItems = document.querySelectorAll('.stat-item h2');
let hasAnimated = false;

function animateCounters() {
    statItems.forEach(item => {
        const target = parseInt(item.textContent);
        let current = 0;
        const increment = target / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                item.textContent = target + (item.textContent.includes('+') ? '+' : '');
                clearInterval(counter);
            } else {
                item.textContent = Math.floor(current) + (item.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });
}

// Trigger animation when statistics section is visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// ===== Add animations on scroll =====
const fadeInElements = document.querySelectorAll('.feature-card', '.service-item');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .service-item').forEach(el => {
    fadeInObserver.observe(el);
});

// ===== Utility: Get Current Year for Footer =====
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText && footerText.textContent.includes('2026')) {
        footerText.textContent = `© ${year} TechFlow. All rights reserved.`;
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Toggle Hamburger Animation =====
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function() {
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

console.log('✓ Website scripts loaded successfully');
