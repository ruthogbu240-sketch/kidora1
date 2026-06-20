import { getCurrentUser } from './auth.js';

console.log('Kidora1 Application Initialized (MIS Backend)');

document.addEventListener('DOMContentLoaded', async () => {
    // Check for logged in user securely via API
    const user = await getCurrentUser();
    if (user) {
        console.log(`Welcome back, ${user.full_name} (${user.role})`);
        
        // Update auth buttons to show dashboard instead of login
        const authButtons = document.querySelectorAll('.auth-buttons, .mobile-auth');
        authButtons.forEach(container => {
            container.innerHTML = `<a href="dashboard.html" class="btn btn-primary">Go to Dashboard</a>`;
        });
    }

    // Auth Menu Toggle (Mobile)
    const authMenuToggle = document.getElementById('authMenuToggle');
    const authMenu = document.getElementById('authMenu');

    if (authMenuToggle && authMenu) {
        authMenuToggle.addEventListener('click', () => {
            authMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!authMenuToggle.contains(e.target) && !authMenu.contains(e.target)) {
                authMenu.classList.remove('active');
            }
        });

        // Close menu when clicking a link or button
        authMenu.querySelectorAll('a, .btn').forEach(item => {
            item.addEventListener('click', () => {
                authMenu.classList.remove('active');
            });
        });
    }
});
