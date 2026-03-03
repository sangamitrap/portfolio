// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, 200);
                }
            }
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.timeline-item, .skill-category, .project-card, .achievement-card, .certificate-card, .profile-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        link.style.fontWeight = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '600';
        }
    });
});

// Typing effect for hero name
const nameElement = document.querySelector('.name');
if (nameElement) {
    const name = nameElement.textContent;
    nameElement.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < name.length) {
            nameElement.textContent += name.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project card hover effect with tilt
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Achievement counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

// Add data-target attributes to elements that need counting
document.addEventListener('DOMContentLoaded', () => {
    // Example: Add counters for achievements if needed
    // const counters = document.querySelectorAll('.counter');
    // counters.forEach(counter => {
    //     counterObserver.observe(counter);
    // });
});

// Form validation (if contact form is added later)
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    let isValid = true;
    
    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.classList.add('error');
        isValid = false;
    } else if (email) {
        email.classList.remove('error');
    }
    
    if (message && message.value.trim().length < 10) {
        message.classList.add('error');
        isValid = false;
    } else if (message) {
        message.classList.remove('error');
    }
    
    return isValid;
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Copy email to clipboard
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.textContent.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const email = item.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                // Show copied feedback
                const originalText = item.innerHTML;
                item.innerHTML = '<i class="fas fa-check"></i><span>Email copied!</span>';
                setTimeout(() => {
                    item.innerHTML = originalText;
                }, 2000);
            });
        });
    }
});

// Add loading states to external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.target) {
            e.preventDefault();
            link.target = '_blank';
            link.click();
        }
    });
});

// Console welcome message
console.log('%c👋 Welcome to Sangamitra\'s Portfolio!', 'color: #1e3a8a; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion and modern web technologies', 'color: #3b82f6; font-size: 14px;');
