// Contact Form Validation and WhatsApp Integration
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const errorMessages = document.querySelectorAll('.error-message');

    // Phone number validation
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        const errorElement = phoneInput.nextElementSibling;
        if (e.target.value.length !== 10) {
            errorElement.style.display = 'block';
            errorElement.textContent = 'Please enter a valid 10-digit phone number';
        } else {
            errorElement.style.display = 'none';
        }
    });

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    emailInput.addEventListener('input', (e) => {
        const errorElement = emailInput.nextElementSibling;
        if (!isValidEmail(e.target.value)) {
            errorElement.style.display = 'block';
            errorElement.textContent = 'Please enter a valid email address';
        } else {
            errorElement.style.display = 'none';
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error messages
        errorMessages.forEach(error => error.style.display = 'none');
        
        // Validate all fields
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            nameInput.nextElementSibling.style.display = 'block';
            nameInput.nextElementSibling.textContent = 'Name is required';
            isValid = false;
        }
        
        if (phoneInput.value.length !== 10) {
            phoneInput.nextElementSibling.style.display = 'block';
            phoneInput.nextElementSibling.textContent = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }
        
        if (!isValidEmail(emailInput.value)) {
            emailInput.nextElementSibling.style.display = 'block';
            emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (!messageInput.value.trim()) {
            messageInput.nextElementSibling.style.display = 'block';
            messageInput.nextElementSibling.textContent = 'Message is required';
            isValid = false;
        }

        if (isValid) {
            // Format the message for WhatsApp
            const whatsappMessage = encodeURIComponent(
                `*New Contact Form Submission*\n\n` +
                `*Name:* ${nameInput.value}\n` +
                `*Phone:* ${phoneInput.value}\n` +
                `*Email:* ${emailInput.value}\n` +
                `*Message:* ${messageInput.value}`
            );

            // Replace with your WhatsApp number
            const whatsappNumber = '917699388372';
            
            // Open WhatsApp with the formatted message
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
            
            // Reset the form
            contactForm.reset();
        }
    });
}); 