const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Initialize users array if not exists
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value;
        const messageDiv = document.getElementById('registerMessage');

        if (!usernameInput || !passwordInput) {
            messageDiv.textContent = 'Please fill in all fields.';
            messageDiv.className = 'error-message';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users'));
        if (users.find(u => u.username === usernameInput)) {
            messageDiv.textContent = 'Username already exists.';
            messageDiv.className = 'error-message';
            return;
        }

        users.push({ username: usernameInput, password: passwordInput });
        localStorage.setItem('users', JSON.stringify(users));
        
        messageDiv.textContent = 'Registration successful! Redirecting to login...';
        messageDiv.className = 'success-message';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');

        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

        if (user) {
            localStorage.setItem('currentUser', user.username);
            window.location.href = 'index.html';
        } else {
            errorDiv.textContent = 'Invalid username or password.';
        }
    });
}
