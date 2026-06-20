import User from './User.js';

export default class Child extends User {
    constructor(name, age, parentId) {
        super(name, '', 'child'); // Children might not have emails
        this.age = age;
        this.parentId = parentId;
        this.moodLogs = [];
        this.achievements = [];
    }

    logMood(mood) {
        this.moodLogs.push({ date: new Date(), mood });
        console.log(`Mood ${mood} logged for ${this.name}`);
    }
}
