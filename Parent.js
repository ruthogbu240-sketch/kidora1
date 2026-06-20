import User from './User.js';

export default class Parent extends User {
    constructor(name, email) {
        super(name, email, 'parent');
        this.children = [];
        this.completedModules = [];
        this.progressScore = 0;
    }

    addChild(child) {
        this.children.push(child);
        this.saveProfile();
        console.log(`Child ${child.name} added.`);
    }

    viewDashboard() {
        return `Welcome Parent ${this.name}. Progress: ${this.progressScore}%`;
    }

    saveProfile() {
        // Update user data in local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.id === this.id);
        if (index !== -1) {
            users[index] = this;
        } else {
            users.push(this);
        }
        localStorage.setItem('users', JSON.stringify(users));
        // Also update current session if it's this user
        localStorage.setItem('currentUser', JSON.stringify(this));
    }
}
