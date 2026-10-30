document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inquiryForm');
    const status = document.getElementById('form-status');
    if (!form || !status) return;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const projType = document.getElementById('proj_type');
    const budget = document.getElementById('budget');
    const message = document.getElementById('message');
    const fields = [name, email, projType, budget, message];

    const nameErr = document.getElementById('name-error');
    const emailErr = document.getElementById('email-error');
    const projTypeErr = document.getElementById('proj_type-error');
    const budgetErr = document.getElementById('budget-error');
    const messageErr = document.getElementById('message-error');

    // Auto-populate form if arriving from cart checkout
    const cart = window.GNCart;
    if (cart && cart.items.length && new URLSearchParams(location.search).has('order')) {
        const lines = cart.items.map(i => i.qty + ' x ' + i.name + ' (' + cart.format(i.price) + ' each)');
        message.value = "I'd like to order:\n" + lines.join('\n') + '\n\nTotal: ' + cart.format(cart.total());
        budget.value = Math.ceil(cart.total());
        status.className = 'form-status success';
        status.textContent = 'Your cart items have been added to the message below. Add your name and email, then submit.';
    }

    function isValidEmail(emailStr) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
    }

    function validateField(field) {
        let msg = '';
        if (field === name && field.value.trim().length > 0 && field.value.trim().length < 2) {
            msg = 'Enter your full name (at least 2 characters).';
        } else if (field === email && field.value.trim().length > 0 && !isValidEmail(field.value.trim())) {
            msg = 'Enter a valid email address so Green Nursery can reply.';
        } else if (field === projType && field.value === '') {
            msg = 'Please select a project type.';
        } else if (field === budget && field.value !== '' && !(parseFloat(field.value) > 0)) {
            msg = 'Enter a valid budget greater than R0.';
        } else if (field === message && field.value.trim().length > 0 && field.value.trim().length < 10) {
            msg = 'Write your message (at least 10 characters).';
        }

        if (msg) {
            field.setAttribute('aria-invalid', 'true');
            if (field === name) nameErr.textContent = msg;
            if (field === email) emailErr.textContent = msg;
            if (field === projType) projTypeErr.textContent = msg;
            if (field === budget) budgetErr.textContent = msg;
            if (field === message) messageErr.textContent = msg;
        } else {
            field.removeAttribute('aria-invalid');
            if (field === name) nameErr.textContent = '';
            if (field === email) emailErr.textContent = '';
            if (field === projType) projTypeErr.textContent = '';
            if (field === budget) budgetErr.textContent = '';
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
            nameErr.textContent = 'Enter your full name (at least 2 characters).';
            hasError = true;
        }
        if (!isValidEmail(email.value.trim())) {
            email.setAttribute('aria-invalid', 'true');
            emailErr.textContent = 'Enter a valid email address so Green Nursery can reply.';
            hasError = true;
        }
        if (!projType.value) {
            projType.setAttribute('aria-invalid', 'true');
            projTypeErr.textContent = 'Please select a project type.';
            hasError = true;
        }
        if (!(parseFloat(budget.value) > 0)) {
            budget.setAttribute('aria-invalid', 'true');
            budgetErr.textContent = 'Enter a valid budget greater than R0.';
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
        status.textContent = 'Sending your inquiry...';

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        // --- EMAILJS CREDENTIALS ---
        const SERVICE_ID = "service_jmifnur";
        const TEMPLATE_ID = "template_3ltbtxv";

        const templateParams = {
            name: name.value.trim(),
            email: email.value.trim(),
            proj_type: projType.value,
            budget: budget.value,
            message: message.value.trim(),
            title: "Custom Project Inquiry"
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                status.className = 'form-status success';
                status.textContent = 'Thank you, ' + name.value.trim() + '! Your inquiry has been sent successfully.';
                form.reset();
                fields.forEach(f => f.removeAttribute('aria-invalid'));
                submitBtn.disabled = false;
            })
            .catch((error) => {
                status.className = 'form-status error';
                status.textContent = 'Failed to send inquiry. Please try again later.';
                console.error('EmailJS error:', error);
                submitBtn.disabled = false;
            });
    });
});
