// Auth management module interacting with the new PHP backend
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role') ? document.getElementById('role').value : 'parent'; // Assume 'parent' if not present

        try {
            const res = await fetch('api/auth.php?action=register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName: name, email, password, role })
            });

            const data = await res.json();
            
            if (data.success) {
                alert('Account created successfully! Please login.');
                window.location.href = 'login.html';
            } else {
                alert(data.message || 'Error occurred during registration.');
            }
        } catch (err) {
            console.error('Registration failed:', err);
            alert('An unexpected error occurred.');
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('api/auth.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            
            if (data.success) {
                alert(`Welcome back, ${data.user.full_name}!`);
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Invalid credentials.');
            }
        } catch (err) {
            console.error('Login failed:', err);
            alert('An unexpected error occurred.');
        }
    });
}

// Help functionality for password toggle
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePassword.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    });
}

// Global user fetching utility for dashboard
export async function getCurrentUser() {
    try {
        const res = await fetch('api/auth.php?action=me');
        const data = await res.json();
        return data.success ? data.user : null;
    } catch (err) {
        return null;
    }
}

export async function logoutUser() {
    try {
        await fetch('api/auth.php?action=logout');
        window.location.href = 'login.html';
    } catch (err) {
        console.error('Logout failed:', err);
    }
}
