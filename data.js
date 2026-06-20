export const learningModules = [
    {
        id: 1,
        title: "Understanding Emotions",
        description: "Learn to identify what triggers your child's emotional responses and how to navigate them effectively.",
        category: "Emotional Intelligence",
        difficulty: "Easy",
        estimatedTime: "15 mins",
        progress: 0,
        image: "emotional-intelligence.jpg"
    },
    {
        id: 2,
        title: "Positive Discipline",
        description: "Explore methods of correction that teach responsibility without damaging self-esteem.",
        category: "Behavioral",
        difficulty: "Medium",
        estimatedTime: "20 mins",
        progress: 0,
        image: "positive-discipline.jpg"
    },
    {
        id: 3,
        title: "Building Trust",
        description: "Create a safe psychological space where your child feels secure enough to be honest.",
        category: "Relationship",
        difficulty: "Hard",
        estimatedTime: "30 mins",
        progress: 0,
        image: "building-trust.jpg"
    },
    {
        id: 4,
        title: "Active Listening",
        description: "Techniques to truly hear what your child is saying beyond just their words.",
        category: "Communication",
        difficulty: "Easy",
        estimatedTime: "10 mins",
        progress: 0,
        image: "active-listening.jpg"
    }
];

export const resources = {
    articles: [
        {
            title: "Child Psychology 101: The Basics",
            author: "Dr. A. B. Smith",
            readTime: "5 min read",
            summary: "A primer on the developmental stages of children and what to expect."
        },
        {
            title: "The Power of 'Yet'",
            author: "Carol Dweck",
            readTime: "7 min read",
            summary: "How growth mindset can transform a child's approach to learning."
        },
        {
            title: "nutrition for Growing Minds",
            author: "Nutritionist Jane Doe",
            readTime: "4 min read",
            summary: "Essential foods that boost brain power and focus in young children."
        }
    ],
    videos: [
        {
            title: "Handling Tantrums in Public",
            duration: "12:05",
            host: "SuperNanny"
        },
        {
            title: "Bedtime Routines that Work",
            duration: "08:30",
            host: "Sleep Expert Tom"
        }
    ]
};

export const simulatorScenarios = [
    {
        id: "no-praise",
        title: "Scenario 1: The Invisible Effort",
        desc: "Your child brings home a report card with improved grades but you are busy.",
        prompt: "What happens if a child's efforts are consistently ignored?",
        options: {
            "A": {
                label: "Ignore and say 'Expected'",
                outcome: "The child feels their best isn't good enough, potentially leading to apathy or anxiety.",
                type: "negative"
            },
            "B": {
                label: "Stop and Celebrate",
                outcome: "The child feels validated and motivated to maintain or improve their performance.",
                type: "positive"
            }
        }
    },
    {
        id: "public-tantrum",
        title: "Scenario 2: The Supermarket Meltdown",
        desc: "Your child starts screaming because you wouldn't buy candy.",
        prompt: "How you react defines their understanding of boundaries.",
        options: {
            "A": {
                label: "Give in to quiet them",
                outcome: "The child learns that screaming is an effective tool to get what they want.",
                type: "negative"
            },
            "B": {
                label: "Calmly hold boundary",
                outcome: "The child learns that emotional outbursts do not change established rules.",
                type: "positive"
            }
        }
    }
];

export const communityVoices = [
    {
        name: "Mrs. Adebayo",
        role: "Parent",
        quote: "Kidora1 changed how I talk to my teenage son. We actually have conversations now instead of arguments."
    },
    {
        name: "John Doe",
        role: "Donor",
        quote: "Seeing the impact of my small monthly donation on these families is incredibly rewarding."
    },
    {
        name: "Sarah J.",
        role: "Volunteer",
        quote: "The mentorship program is fantastic. I've seen shy kids blossom into confident leaders."
    }
];

export const emotionCards = [
    {
        emotion: "Anger",
        hiddenMessage: "I feel powerless and I'm trying to protect myself.",
        scenario: "When I scream and throw things...",
        response: "Help me find words for my frustration instead of just punishing the noise."
    },
    {
        emotion: "Silence",
        hiddenMessage: "I don't think you'll understand, or I'm afraid to disappoint you.",
        scenario: "When I stop talking to you...",
        response: "Show me that your love isn't conditional on my performance or mood."
    },
    {
        emotion: "Rebellion",
        hiddenMessage: "I'm trying to see if you're still my safe harbor when I'm difficult.",
        scenario: "When I break the rules on purpose...",
        response: "Be firm with the boundary but stay close to my heart."
    }
];

export const traumaAwareness = [
    {
        title: "Recognizing Triggers",
        content: "Sudden loud noises, changes in routine, or specific tones of voice can trigger a trauma response. It's not 'bad behavior'; it's a nervous system overload.",
        action: "Create a 'Safe Corner' with soft items where they can retreat without shame."
    },
    {
        title: "The Rebellion Cycle",
        content: "Rebellion often peaks at ages 12-14. It's a natural drive for independence, not necessarily a rejection of your values.",
        action: "Give them choices in small things to satisfy their need for autonomy."
    }
];

export const dailyActions = [
    {
        day: "Monday",
        action: "Ask 'What was the hardest part of your day?' instead of 'How was school?'",
        impact: "Encourages deep reflection and vulnerability."
    },
    {
        day: "Tuesday",
        action: "Eye contact for 5 seconds when they speak to you.",
        impact: "Builds a sense of being seen and heard."
    },
    {
        day: "Wednesday",
        action: "Admit a small mistake you made today to them.",
        impact: "Models healthy humility and shows it's okay to be imperfect."
    }
];

export const motivationSection = [
    {
        skill: "Critical Thinking",
        benefit: "Helps them navigate social media and peer pressure later in life.",
        nurtureTip: "Ask 'Why do you think that happened?' regularly."
    },
    {
        skill: "Empathy",
        benefit: "The foundation of leadership and strong mental health.",
        nurtureTip: "Point out emotions in book characters or movie scenes."
    }
];

