export default class Activity {
    constructor(title, description, category, difficulty) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.title = title;
        this.description = description;
        this.category = category; // 'emotional', 'behavioral', 'social'
        this.difficulty = difficulty; // 'easy', 'medium', 'hard'
        this.isCompleted = false;
    }

    complete(user) {
        this.isCompleted = true;
        // In a real app, logic to update user stats would go here
        console.log(`Activity ${this.title} completed by ${user.name}`);
    }
}
