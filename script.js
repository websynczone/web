// Dark mode toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
const body = document.body;

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

function updateThemeUI(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        document.querySelectorAll('.theme-toggle i, .mobile-theme-toggle i').forEach(icon => {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        });
    } else {
        body.classList.remove('dark-mode');
        document.querySelectorAll('.theme-toggle i, .mobile-theme-toggle i').forEach(icon => {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        });
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    updateThemeUI(true);
}

// Toggle theme function
function toggleTheme() {
    const isDark = body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    
    updateThemeUI(!isDark);
    localStorage.setItem('theme', newTheme);
}

// Add click event listeners to both theme toggle buttons
themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Smooth scroll for navigation links with improved mobile support
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = 80; // Height of your fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Enable smooth scrolling behavior for the whole page
if (CSS.supports('scroll-behavior', 'smooth')) {
    document.documentElement.style.scrollBehavior = 'smooth';
} else {
    // Fallback for browsers that don't support smooth scrolling
    const smoothScroll = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothScroll);
            window.scrollTo(0, currentScroll - currentScroll / 8);
        }
    };

    // Add smooth scrolling to "back to top" functionality
    document.querySelectorAll('a[href="#top"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll();
        });
    });
}

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-text, .animate-card, .animate-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation check
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Phone number validation
document.getElementById('phone').addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// Form validation with animations
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-input');
    
    // Add validation classes to form elements
    inputs.forEach(input => {
        const wrapper = input.parentElement;
        const validationLine = document.createElement('div');
        validationLine.className = 'validation-line';
        wrapper.appendChild(validationLine);
    });

    // Real-time validation for name field
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        const wrapper = this.parentElement;
        const validationLine = wrapper.querySelector('.validation-line');
        
        // Remove any numbers from the name
        this.value = this.value.replace(/[0-9]/g, '');
        
        if (value.length >= 2 && !/[0-9]/.test(value)) {
            wrapper.classList.remove('invalid');
            wrapper.classList.add('valid');
            validationLine.style.transform = 'scaleX(1)';
            validationLine.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        } else {
            wrapper.classList.remove('valid');
            wrapper.classList.add('invalid');
            validationLine.style.transform = 'scaleX(1)';
            validationLine.style.backgroundColor = '#ff3366';
        }
        
        if (value === '') {
            wrapper.classList.remove('valid', 'invalid');
            validationLine.style.transform = 'scaleX(0)';
        }
    });

    // Real-time validation for phone field
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        const wrapper = this.parentElement;
        const validationLine = wrapper.querySelector('.validation-line');
        
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
        
        if (value.length === 10) {
            wrapper.classList.remove('invalid');
            wrapper.classList.add('valid');
            validationLine.style.transform = 'scaleX(1)';
            validationLine.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        } else {
            wrapper.classList.remove('valid');
            wrapper.classList.add('invalid');
            validationLine.style.transform = 'scaleX(1)';
            validationLine.style.backgroundColor = '#ff3366';
        }
        
        if (value === '') {
            wrapper.classList.remove('valid', 'invalid');
            validationLine.style.transform = 'scaleX(0)';
        }
    });

    // Real-time validation for email field
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        const wrapper = this.parentElement;
        const validationLine = wrapper.querySelector('.validation-line');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(value)) {
            wrapper.classList.remove('invalid');
            wrapper.classList.add('valid');
            validationLine.style.transform = 'scaleX(1)';
            validationLine.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        } else {
            wrapper.classList.remove('valid');
            wrapper.classList.add('invalid');
            validationLine.style.transform = 'scaleX(1)';
            validationLine.style.backgroundColor = '#ff3366';
        }
        
        if (value === '') {
            wrapper.classList.remove('valid', 'invalid');
            validationLine.style.transform = 'scaleX(0)';
        }
    });

    // Add these styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .input-wrapper {
            position: relative;
            margin-bottom: 5px;
        }
        
        .validation-line {
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .input-wrapper.valid .form-input {
            border-color: var(--primary-color);
        }
        
        .input-wrapper.invalid .form-input {
            border-color: #ff3366;
        }
        
        [data-theme="dark"] .input-wrapper.valid .form-input {
            border-color: var(--primary-color);
        }
        
        [data-theme="dark"] .input-wrapper.invalid .form-input {
            border-color: #ff6666;
        }
        
        .input-wrapper.valid i {
            color: var(--primary-color);
        }
        
        .input-wrapper.invalid i {
            color: #ff3366;
        }
        
        [data-theme="dark"] .input-wrapper.valid i {
            color: var(--primary-color);
        }
        
        [data-theme="dark"] .input-wrapper.invalid i {
            color: #ff6666;
        }
    `;
    document.head.appendChild(style);
});

// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset all error states
    const errorMessages = document.querySelectorAll('.error-message');
    const formInputs = document.querySelectorAll('.form-input');
    errorMessages.forEach(msg => msg.classList.remove('show'));
    formInputs.forEach(input => input.classList.remove('error'));

    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate name (minimum 2 characters)
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate phone (exactly 10 digits)
    if (phone === '') {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
        showError('phone', 'Please enter a valid 10-digit phone number');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message (minimum 10 characters)
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Format the WhatsApp message
        const whatsappMessage = `Name: ${name}%0APhone: ${phone}%0AEmail: ${email}%0A%0AMessage: ${message}`;
        const whatsappUrl = `https://wa.me/917699388372?text=${whatsappMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you! Redirecting to WhatsApp...';
        this.appendChild(successMessage);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = field.parentElement.nextElementSibling;
    field.classList.add('error');
    errorSpan.textContent = message;
    errorSpan.classList.add('show');
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}); 