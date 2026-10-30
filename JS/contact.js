document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contact-form-status');
    if (!form || !status) return;

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    const fields = [name, email, message];

    const nameErr = document.getElementById('contact-name-error');
    const emailErr = document.getElementById('contact-email-error');
    const messageErr = document.getElementById('contact-message-error');

    function isValidEmail(emailStr) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
    }

    function validateField(field) {
        let msg = '';
        if (field === name && field.value.trim().length > 0 && field.value.trim().length < 2) {
            msg = 'Enter your full name.';
        } else if (field === email && field.value.trim().length > 0 && !isValidEmail(field.value.trim())) {
            msg = 'Enter your email address so Green Nursery can reply.';
        } else if (field === message && field.value.trim().length > 0 && field.value.trim().length < 10) {
            msg = 'Write your message (at least 10 characters).';
        }

        if (msg) {
            field.setAttribute('aria-invalid', 'true');
            if (field === name) nameErr.textContent = msg;
            if (field === email) emailErr.textContent = msg;
            if (field === message) messageErr.textContent = msg;
        } else {
            field.removeAttribute('aria-invalid');
            if (field === name) nameErr.textContent = '';
            if (field === email) emailErr.textContent = '';
            if (field === message) messageErr.textContent = '';
        }
        return msg;
    }

    fields.forEach(field => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('change', () => validateField(field));
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        let hasError = false;

        if (name.value.trim().length < 2) {
            name.setAttribute('aria-invalid', 'true');
            nameErr.textContent = 'Enter your full name.';
            hasError = true;
        }
        if (!isValidEmail(email.value.trim())) {
            email.setAttribute('aria-invalid', 'true');
            emailErr.textContent = 'Enter your email address so Green Nursery can reply.';
            hasError = true;
        }
        if (message.value.trim().length < 10) {
            message.setAttribute('aria-invalid', 'true');
            messageErr.textContent = 'Write your message (at least 10 characters).';
            hasError = true;
        }

        if (hasError) {
            status.className = 'form-status error';
            status.textContent = 'Please fix the highlighted fields.';
            status.focus();
            return;
        }

        status.className = 'form-status success';
        status.textContent = 'Sending your message...';

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        // --- EMAILJS CREDENTIALS ---
        const SERVICE_ID = "service_jmifnur";
        const TEMPLATE_ID = "template_3ltbtxv";

        const templateParams = {
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim(),
            title: "Contact Form"
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                status.className = 'form-status success';
                status.textContent = 'Thank you, ' + name.value.trim() + '! Your message has been sent successfully.';
                form.reset();
                fields.forEach(f => f.removeAttribute('aria-invalid'));
                submitBtn.disabled = false;
            })
            .catch((error) => {
                status.className = 'form-status error';
                status.textContent = 'Failed to send message. Please try again later.';
                console.error('EmailJS error:', error);
                submitBtn.disabled = false;
            });
    });
});