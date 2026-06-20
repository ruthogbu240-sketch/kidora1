export default class Simulator {
    constructor(scenarioName, outcomes) {
        this.scenarioName = scenarioName;
        this.outcomes = outcomes; // Object mapping specific choices to results
    }

    simulate(choice) {
        const result = this.outcomes[choice];
        if (result) {
            return {
                outcome: result.text,
                animationClass: result.animationType // CSS class for visual effect
            };
        }
        return { outcome: 'Unknown outcome', animationClass: 'neutral' };
    }
}
