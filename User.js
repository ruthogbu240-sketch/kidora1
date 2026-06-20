/**
 * Base User Class
 * Handles common functionality for all user types.
 */
export default class User {
    constructor(name, email, role) {
        this.id = this.generateId();
        this.name = name;
        this.email = email;
        this.role = role; // 'parent', 'child', 'donor', 'admin'
        this.dateCreated = new Date().toISOString();
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    login() {
        console.log(`${this.name} logged in.`);
        // Logic to save session to LocalStorage
        localStorage.setItem('currentUser', JSON.stringify(this));
    }

    logout() {
        console.log(`${this.name} logged out.`);
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}
