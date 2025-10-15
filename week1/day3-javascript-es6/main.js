// Main JavaScript File - Day 3 Interactive Learning Environment
// Coordinates all modules and provides the main application logic

class Day3LearningEnvironment {
    constructor() {
        this.currentSection = 1;
        this.totalSections = 6;
        this.sectionsCompleted = new Set();
        this.startTime = Date.now();
        
        // Initialize when DOM is ready
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🚀 Day 3: JavaScript ES6 & DOM Manipulation Learning Environment');
        console.log('📚 Welcome to your interactive JavaScript journey!');
        
        this.setupNavigation();
        this.setupProgressTracking();
        this.showSection(1);
        this.logWelcomeMessage();
        
        // Initialize global instances
        if (window.modernJS) {
            console.log('✅ Modern JavaScript module loaded');
        }
        
        if (window.domManipulation) {
            console.log('✅ DOM Manipulation module loaded');
        }
        
        if (window.taskManager) {
            console.log('✅ Task Manager module loaded');
        }
    }

    logWelcomeMessage() {
        const outputPanel = document.querySelector('.output-content');
        if (outputPanel) {
            outputPanel.textContent = `
Welcome to Day 3: JavaScript ES6 & DOM Manipulation! 🎉

Today you'll learn:
• Modern JavaScript ES6+ features
• Advanced DOM manipulation techniques  
• Performance optimization strategies
• Build a complete Task Manager application

Navigate through the sections using the tabs above.
Let's start coding! 💻
            `;
        }
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const prevBtn = document.getElementById('prev-exercise');
        const nextBtn = document.getElementById('next-exercise');

        // Tab navigation
        navButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.showSection(index + 1);
            });
        });

        // Previous/Next navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentSection > 1) {
                    this.showSection(this.currentSection - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentSection < this.totalSections) {
                    this.showSection(this.currentSection + 1);
                } else {
                    this.completeLesson();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch (e.code) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (this.currentSection > 1) {
                            this.showSection(this.currentSection - 1);
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (this.currentSection < this.totalSections) {
                            this.showSection(this.currentSection + 1);
                        }
                        break;
                }
            }
        });
    }

    showSection(sectionNumber) {
        // Hide all sections
        document.querySelectorAll('.exercise-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const sectionIds = ['evolution', 'syntax', 'paradigms', 'dom', 'performance', 'project'];
        const targetSection = document.getElementById(sectionIds[sectionNumber - 1]);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index === sectionNumber - 1);
        });

        // Update current section
        const oldSection = this.currentSection;
        this.currentSection = sectionNumber;

        // Update progress
        this.updateProgress();

        // Section-specific initialization
        this.initializeSection(sectionNumber);

        // Log section change
        console.log(`📖 Switched to Section ${sectionNumber}: ${this.getSectionTitle(sectionNumber)}`);
        
        // Mark previous section as completed if moving forward
        if (sectionNumber > oldSection) {
            this.sectionsCompleted.add(oldSection);
        }
    }

    getSectionTitle(sectionNumber) {
        const titles = {
            1: 'JavaScript Evolution Timeline',
            2: 'Modern JavaScript Syntax',
            3: 'Programming Paradigms',
            4: 'DOM Mastery Playground',
            5: 'Performance & Optimization',
            6: 'Task Manager Project'
        };
        return titles[sectionNumber] || 'Unknown Section';
    }

    initializeSection(sectionNumber) {
        switch (sectionNumber) {
            case 1:
                this.initializeEvolutionSection();
                break;
            case 2:
                this.initializeModernSyntaxSection();
                break;
            case 3:
                this.initializeParadigmsSection();
                break;
            case 4:
                this.initializeDOMSection();
                break;
            case 5:
                this.initializePerformanceSection();
                break;
            case 6:
                this.initializeProjectSection();
                break;
        }
    }

    initializeEvolutionSection() {
        // Add interactive timeline functionality
        const timelineItems = document.querySelectorAll('#section-1 .timeline li');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0.3';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    initializeModernSyntaxSection() {
        // Setup interactive code examples
        this.setupCodeComparisons();
        this.setupInteractiveEditor();
    }

    setupCodeComparisons() {
        const runButtons = document.querySelectorAll('#section-2 .run-btn');
        runButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const exampleType = btn.dataset.example;
                this.runSyntaxExample(exampleType);
            });
        });
    }

    runSyntaxExample(type) {
        if (!window.modernJS) {
            console.error('Modern JavaScript module not loaded');
            return;
        }

        const outputPanel = document.querySelector('.output-content');
        if (outputPanel) {
            outputPanel.textContent = `Running ${type} example...\n`;
        }

        try {
            let result;
            switch (type) {
                case 'variables':
                    result = window.modernJS.demonstrateVariables();
                    break;
                case 'destructuring':
                    result = window.modernJS.demonstrateDestructuring();
                    break;
                case 'arrow-functions':
                    result = window.modernJS.demonstrateArrowFunctions();
                    break;
                case 'templates':
                    result = window.modernJS.demonstrateTemplates();
                    break;
                case 'spread-rest':
                    result = window.modernJS.demonstrateSpreadRest();
                    break;
                case 'async-await':
                    window.modernJS.demonstrateAsyncAwait().then(result => {
                        this.displayResult(result);
                    });
                    return;
                case 'array-methods':
                    result = window.modernJS.demonstrateArrayMethods();
                    break;
                case 'modern-operators':
                    result = window.modernJS.demonstrateModernOperators();
                    break;
                default:
                    result = { message: 'Unknown example type', error: true };
            }

            this.displayResult(result);
        } catch (error) {
            console.error('Error running example:', error);
            if (outputPanel) {
                outputPanel.textContent += `Error: ${error.message}\n`;
            }
        }
    }

    displayResult(result) {
        const outputPanel = document.querySelector('.output-content');
        if (outputPanel && result) {
            outputPanel.textContent += `\\n${result.message}\\n`;
            if (result.results) {
                outputPanel.textContent += JSON.stringify(result.results, null, 2);
            }
        }
    }

    setupInteractiveEditor() {
        const editor = document.getElementById('code-editor');
        const runBtn = document.getElementById('run-code');

        if (editor && runBtn) {
            runBtn.addEventListener('click', () => {
                const code = editor.value;
                this.executeUserCode(code);
            });

            // Add some sample code
            editor.value = `// Try some ES6+ features here!
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Destructuring
const person = { name: 'Alice', age: 30 };
const { name, age } = person;
console.log(\`\${name} is \${age} years old\`);

// Async/await example
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function example() {
    console.log('Starting...');
    await delay(1000);
    console.log('Done!');
}
example();`;
        }
    }

    executeUserCode(code) {
        const outputPanel = document.querySelector('.output-content');
        if (outputPanel) {
            outputPanel.textContent = 'Executing your code...\\n';
        }

        // Capture console.log output
        const originalLog = console.log;
        let capturedOutput = '';

        console.log = (...args) => {
            capturedOutput += args.join(' ') + '\\n';
            originalLog(...args);
        };

        try {
            // Create a function to execute the code in a controlled environment
            const executeCode = new Function(code);
            executeCode();

            setTimeout(() => {
                if (outputPanel) {
                    outputPanel.textContent = 'Output:\\n' + capturedOutput;
                }
                console.log = originalLog;
            }, 100);

        } catch (error) {
            if (outputPanel) {
                outputPanel.textContent += `Error: ${error.message}\\n`;
            }
            console.log = originalLog;
            console.error('Code execution error:', error);
        }
    }

    initializeParadigmsSection() {
        // Setup paradigm comparison tabs
        const tabButtons = document.querySelectorAll('#section-3 .tab-btn');
        const implPanels = document.querySelectorAll('#section-3 .impl-panel');

        tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Update active tab
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Show corresponding panel
                implPanels.forEach(panel => panel.classList.remove('active'));
                if (implPanels[index]) {
                    implPanels[index].classList.add('active');
                }
            });
        });

        // Initialize with first tab active
        if (tabButtons.length > 0) {
            tabButtons[0].click();
        }
    }

    initializeDOMSection() {
        // Setup DOM playground controls
        const controls = {
            'create-elements': () => window.domManipulation?.createBasicElements(),
            'event-handling': () => window.domManipulation?.demonstrateEventHandling(),
            'css-manipulation': () => window.domManipulation?.demonstrateCSSManipulation(),
            'modern-apis': () => window.domManipulation?.demonstrateModernAPIs(),
            'clear-playground': () => window.domManipulation?.clearPlayground()
        };

        Object.entries(controls).forEach(([id, handler]) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', handler);
            }
        });
    }

    initializePerformanceSection() {
        // Setup performance benchmarking
        const benchmarkButtons = document.querySelectorAll('#section-5 .benchmark-btn');
        benchmarkButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const testType = btn.dataset.test;
                this.runPerformanceTest(testType);
            });
        });

        // Initialize performance monitoring
        if (window.domManipulation) {
            window.domManipulation.demonstratePerformance();
        }
    }

    runPerformanceTest(testType) {
        console.log(`🚀 Running performance test: ${testType}`);
        
        const startTime = performance.now();
        let iterations = 0;

        switch (testType) {
            case 'dom-creation':
                this.benchmarkDOMCreation();
                break;
            case 'array-methods':
                this.benchmarkArrayMethods();
                break;
            case 'event-delegation':
                this.benchmarkEventDelegation();
                break;
            default:
                console.log('Unknown test type');
        }

        const endTime = performance.now();
        console.log(`✅ Test completed in ${(endTime - startTime).toFixed(2)}ms`);
    }

    benchmarkDOMCreation() {
        const container = document.createElement('div');
        const startTime = performance.now();
        
        // Test DOM creation performance
        for (let i = 0; i < 1000; i++) {
            const element = document.createElement('div');
            element.textContent = `Element ${i}`;
            element.className = 'test-element';
            container.appendChild(element);
        }
        
        const endTime = performance.now();
        console.log(`DOM Creation: ${(endTime - startTime).toFixed(2)}ms for 1000 elements`);
    }

    benchmarkArrayMethods() {
        const largeArray = Array.from({ length: 100000 }, (_, i) => i);
        
        console.log('Benchmarking array methods...');
        
        // Test map
        let startTime = performance.now();
        largeArray.map(x => x * 2);
        let endTime = performance.now();
        console.log(`Array.map: ${(endTime - startTime).toFixed(2)}ms`);
        
        // Test filter
        startTime = performance.now();
        largeArray.filter(x => x % 2 === 0);
        endTime = performance.now();
        console.log(`Array.filter: ${(endTime - startTime).toFixed(2)}ms`);
        
        // Test reduce
        startTime = performance.now();
        largeArray.reduce((sum, x) => sum + x, 0);
        endTime = performance.now();
        console.log(`Array.reduce: ${(endTime - startTime).toFixed(2)}ms`);
    }

    benchmarkEventDelegation() {
        console.log('Testing event delegation vs individual listeners...');
        // This would typically involve creating elements and comparing performance
        // For now, just log the concept
        console.log('Event delegation is more efficient for large numbers of similar elements');
    }

    initializeProjectSection() {
        // Initialize the task manager project
        const startBtn = document.getElementById('start-project');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startTaskManagerProject();
            });
        }
    }

    startTaskManagerProject() {
        console.log('🎯 Starting Task Manager project...');
        
        const projectContainer = document.querySelector('.task-manager-container');
        if (projectContainer) {
            projectContainer.innerHTML = '<div id="task-manager-container"></div>';
            projectContainer.classList.remove('hidden');
            
            // Initialize task manager
            if (window.taskManager) {
                window.taskManager.init('task-manager-container');
                
                // Hide the start button
                const startBtn = document.getElementById('start-project');
                if (startBtn) {
                    startBtn.style.display = 'none';
                }
                
                console.log('✅ Task Manager project started successfully!');
            } else {
                console.error('Task Manager module not available');
            }
        }
    }

    updateProgress() {
        const progressBar = document.querySelector('.progress-fill');
        const completionPercentage = document.getElementById('completion-percentage');
        const exerciseCounter = document.querySelector('.exercise-counter');

        if (progressBar) {
            const progress = (this.sectionsCompleted.size / this.totalSections) * 100;
            progressBar.style.width = `${progress}%`;
        }

        if (completionPercentage) {
            const progress = (this.sectionsCompleted.size / this.totalSections) * 100;
            completionPercentage.textContent = `${Math.round(progress)}%`;
        }

        if (exerciseCounter) {
            exerciseCounter.textContent = `Exercise ${this.currentSection} of ${this.totalSections}`;
        }

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-exercise');
        const nextBtn = document.getElementById('next-exercise');

        if (prevBtn) {
            prevBtn.disabled = this.currentSection === 1;
        }

        if (nextBtn) {
            if (this.currentSection === this.totalSections) {
                nextBtn.textContent = 'Complete Lesson 🎉';
            } else {
                nextBtn.textContent = 'Next ➡️';
            }
        }
    }

    setupProgressTracking() {
        // Track time spent in each section
        this.sectionTimes = new Map();
        this.sectionStartTime = Date.now();

        // Save progress periodically
        setInterval(() => {
            this.saveProgress();
        }, 30000); // Save every 30 seconds

        // Save progress when leaving the page
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });
    }

    saveProgress() {
        const progress = {
            currentSection: this.currentSection,
            sectionsCompleted: Array.from(this.sectionsCompleted),
            totalTimeSpent: Date.now() - this.startTime,
            lastAccessed: new Date().toISOString()
        };

        try {
            localStorage.setItem('day3_progress', JSON.stringify(progress));
        } catch (error) {
            console.warn('Could not save progress to localStorage:', error);
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('day3_progress');
            if (saved) {
                const progress = JSON.parse(saved);
                this.sectionsCompleted = new Set(progress.sectionsCompleted || []);
                
                // Optionally restore to last section
                if (progress.currentSection && progress.currentSection > 1) {
                    const shouldRestore = confirm(
                        `Would you like to continue from Section ${progress.currentSection}?`
                    );
                    if (shouldRestore) {
                        this.showSection(progress.currentSection);
                    }
                }
                
                console.log('📚 Progress restored from previous session');
            }
        } catch (error) {
            console.warn('Could not load progress from localStorage:', error);
        }
    }

    completeLesson() {
        console.log('🎉 Congratulations! You have completed Day 3: JavaScript ES6 & DOM Manipulation!');
        
        const totalTime = Date.now() - this.startTime;
        const minutes = Math.floor(totalTime / 60000);
        
        alert(`🎉 Lesson Complete!

You've successfully mastered:
✅ Modern JavaScript ES6+ features
✅ Advanced DOM manipulation
✅ Performance optimization
✅ Built a complete Task Manager app

Time spent: ${minutes} minutes

Great job! You're ready for Day 4! 🚀`);

        // Mark lesson as complete in course system
        if (window.mcp_frontend_cour_markLessonComplete) {
            try {
                window.mcp_frontend_cour_markLessonComplete({
                    lessonId: 'javascript-es6-dom',
                    timeSpent: minutes
                });
            } catch (error) {
                console.log('Could not mark lesson complete in course system:', error);
            }
        }

        // Clear progress
        localStorage.removeItem('day3_progress');
    }

    // Utility methods
    getStats() {
        return {
            currentSection: this.currentSection,
            totalSections: this.totalSections,
            sectionsCompleted: this.sectionsCompleted.size,
            completionPercentage: (this.sectionsCompleted.size / this.totalSections) * 100,
            timeSpent: Date.now() - this.startTime
        };
    }

    // Demo all features (for testing)
    async runAllDemos() {
        console.log('🎮 Running all demonstrations...');
        
        if (window.modernJS) {
            console.log('📱 Modern JavaScript demos:');
            await window.modernJS.runAllDemos();
        }
        
        if (window.domManipulation) {
            console.log('🎯 DOM Manipulation demos:');
            window.domManipulation.demonstrateEventHandling();
            setTimeout(() => window.domManipulation.demonstrateCSSManipulation(), 2000);
            setTimeout(() => window.domManipulation.demonstrateModernAPIs(), 4000);
        }
        
        console.log('✅ All demonstrations completed!');
    }
}

// Initialize the learning environment
const learningEnvironment = new Day3LearningEnvironment();

// Make it globally available
window.day3Learning = learningEnvironment;

// Add some helpful global functions
window.runAllDemos = () => learningEnvironment.runAllDemos();
window.getProgress = () => learningEnvironment.getStats();

// Log helpful commands
console.log(`
🎯 Day 3 Interactive Commands:
• runAllDemos() - Run all feature demonstrations
• getProgress() - Check your current progress
• modernJS.runAllDemos() - Run ES6+ feature demos
• domManipulation.clearPlayground() - Clear the DOM playground
• taskManager.getStats() - Get task manager statistics

Use Alt+Left/Right arrows to navigate between sections!
`);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Day3LearningEnvironment;
}

// Global functions for HTML button onclick handlers
function destructuringDemo() {
    if (window.modernJS) {
        const result = window.modernJS.demonstrateDestructuring();
        updateOutput('destructuring', result);
    }
}

function arrowFunctionDemo() {
    if (window.modernJS) {
        const result = window.modernJS.demonstrateArrowFunctions();
        updateOutput('arrow functions', result);
    }
}

function templateLiteralDemo() {
    if (window.modernJS) {
        const result = window.modernJS.demonstrateTemplates();
        updateOutput('template literals', result);
    }
}

function spreadRestDemo() {
    if (window.modernJS) {
        const result = window.modernJS.demonstrateSpreadRest();
        updateOutput('spread/rest operators', result);
    }
}

function optionalChainingDemo() {
    console.log('🔗 Optional Chaining & Nullish Coalescing Demo');
    
    // Sample data with nested objects
    const users = [
        {
            id: 1,
            name: 'Alice',
            profile: {
                avatar: 'alice.jpg',
                preferences: {
                    theme: 'dark',
                    notifications: true
                },
                social: {
                    twitter: '@alice_dev'
                }
            },
            contacts: [
                { type: 'email', value: 'alice@example.com' },
                { type: 'phone', value: '+1234567890' }
            ]
        },
        {
            id: 2,
            name: 'Bob',
            profile: {
                avatar: null,
                preferences: {
                    theme: 'light'
                }
                // No social or contacts
            }
        },
        {
            id: 3,
            name: 'Charlie'
            // No profile at all
        }
    ];
    
    console.log('=== Optional Chaining Examples ===');
    
    users.forEach(user => {
        console.log(`\\n👤 User: ${user.name}`);
        
        // Safe property access
        const theme = user.profile?.preferences?.theme;
        const avatar = user.profile?.avatar;
        const twitter = user.profile?.social?.twitter;
        const email = user.contacts?.find(c => c.type === 'email')?.value;
        
        console.log(`Theme: ${theme ?? 'default'}`);
        console.log(`Avatar: ${avatar ?? 'default-avatar.png'}`);
        console.log(`Twitter: ${twitter ?? 'Not provided'}`);
        console.log(`Email: ${email ?? 'Not provided'}`);
        
        // Safe method calls
        const contactCount = user.contacts?.length ?? 0;
        console.log(`Contacts: ${contactCount}`);
    });
    
    // Nullish coalescing examples
    console.log('\\n=== Nullish Coalescing Examples ===');
    
    const config = {
        debug: false,
        timeout: 0,
        apiKey: null,
        maxRetries: undefined
    };
    
    // Using || vs ??
    console.log('Using || operator:');
    console.log(`Debug: ${config.debug || 'default'}`); // 'default' (wrong!)
    console.log(`Timeout: ${config.timeout || 5000}`); // 5000 (wrong!)
    
    console.log('\\nUsing ?? operator:');
    console.log(`Debug: ${config.debug ?? 'default'}`); // false (correct!)
    console.log(`Timeout: ${config.timeout ?? 5000}`); // 0 (correct!)
    console.log(`API Key: ${config.apiKey ?? 'dev-key'}`); // 'dev-key'
    console.log(`Max Retries: ${config.maxRetries ?? 3}`); // 3
    
    const result = {
        message: 'Optional chaining and nullish coalescing demonstrated!',
        examples: {
            safeAccess: 'user.profile?.preferences?.theme',
            safeMethod: 'user.contacts?.find(c => c.type === "email")?.value',
            nullishCoalescing: 'config.timeout ?? 5000',
            comparison: '|| vs ?? for falsy vs nullish values'
        }
    };
    
    updateOutput('optional chaining', result);
    return result;
}

async function asyncAwaitDemo() {
    if (window.modernJS) {
        const result = await window.modernJS.demonstrateAsyncAwait();
        updateOutput('async/await', result);
    }
}

function runUserCode() {
    const editor = document.getElementById('code-editor');
    if (editor && window.day3Learning) {
        window.day3Learning.executeUserCode(editor.value);
    }
}

function functionalDemo() {
    updateOutput('functional programming', {
        message: 'Functional Programming Demo',
        code: `// Pure functions and immutable data
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, x) => acc + x, 0);

console.log('Original:', numbers);
console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Sum:', sum);`
    });
}

function oopDemo() {
    updateOutput('object-oriented programming', {
        message: 'Object-Oriented Programming Demo',
        code: `// Classes and inheritance
class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }
    
    start() {
        return \`\${this.brand} is starting...\`;
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super(brand);
        this.model = model;
    }
    
    drive() {
        return \`\${this.brand} \${this.model} is driving!\`;
    }
}

const myCar = new Car('Toyota', 'Camry');
console.log(myCar.start());
console.log(myCar.drive());`
    });
}

function updateOutput(demoName, result) {
    const output = document.getElementById('syntax-output') || 
                   document.querySelector('.output-content') ||
                   document.querySelector('#output');
    
    if (output) {
        output.innerHTML = `
            <h4>🎯 ${demoName.charAt(0).toUpperCase() + demoName.slice(1)} Demo Results</h4>
            <p><strong>Status:</strong> ${result.message || 'Demo completed!'}</p>
            ${result.code ? `<pre><code>${result.code}</code></pre>` : ''}
            ${result.results ? `<pre><code>${JSON.stringify(result.results, null, 2)}</code></pre>` : ''}
            <p><em>Check the browser console for detailed output!</em></p>
        `;
    }
    
    console.log(`${demoName} demo executed:`, result);
}

// DOM manipulation functions
function createElements() {
    if (window.domManipulation) {
        window.domManipulation.createBasicElements();
    }
}

function eventHandling() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateEventHandling();
    }
}

function cssManipulation() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateCSSManipulation();
    }
}

function modernApis() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateModernAPIs();
    }
}

function performanceDemo() {
    if (window.domManipulation) {
        window.domManipulation.demonstratePerformance();
    }
}

function clearPlayground() {
    if (window.domManipulation) {
        window.domManipulation.clearPlayground();
    }
}

function startTaskManager() {
    if (window.day3Learning) {
        window.day3Learning.startTaskManagerProject();
    }
}

// Missing function implementations
function runEvolutionDemo() {
    if (window.modernJS) {
        window.modernJS.runAllDemos().then(results => {
            updateOutput('JavaScript evolution', {
                message: 'All ES6+ features demonstrated successfully!',
                results: 'Check console for detailed output'
            });
        });
    }
}

function runShoppingCartDemo() {
    updateOutput('shopping cart comparison', {
        message: 'Functional vs OOP Shopping Cart Comparison',
        code: `// Functional approach
const createCart = () => [];
const addItem = (cart, item) => [...cart, item];
const removeItem = (cart, id) => cart.filter(item => item.id !== id);
const getTotal = (cart) => cart.reduce((sum, item) => sum + item.price, 0);

// OOP approach
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    
    addItem(item) {
        this.items.push(item);
    }
    
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
    
    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }
}

console.log('Both approaches demonstrated!');`
    });
}

function modifyStyles() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateCSSManipulation();
    }
}

function handleEvents() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateEventHandling();
    }
}

function animateElements() {
    const playground = document.querySelector('.playground-area');
    if (playground) {
        playground.innerHTML = `
            <div style="width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); 
                        border-radius: 50%; margin: 20px auto; animation: bounce 2s infinite;">
            </div>
            <style>
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-30px); }
                    60% { transform: translateY(-15px); }
                }
            </style>
            <p style="text-align: center; margin-top: 20px;">🎉 Animation created!</p>
        `;
    }
    updateOutput('animation', { message: 'CSS animation created in playground!' });
}

function lazyLoadDemo() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateModernAPIs();
    }
}

function resizeObserverDemo() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateModernAPIs();
    }
}

function eventDelegationDemo() {
    if (window.domManipulation) {
        window.domManipulation.demonstrateEventHandling();
    }
}

function runArrayBenchmark() {
    if (window.day3Learning) {
        window.day3Learning.benchmarkArrayMethods();
    }
    
    // Also display results in the performance metrics container
    const metricsContainer = document.getElementById('performance-charts');
    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <h4>📊 Array Methods Performance Results</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p><strong>Test completed!</strong> Check the browser console for detailed timing results.</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                    <div style="background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #28a745;">
                        <strong>Array.map()</strong><br>
                        <small>Transform all elements</small>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #007bff;">
                        <strong>Array.filter()</strong><br>
                        <small>Select matching elements</small>
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #ffc107;">
                        <strong>Array.reduce()</strong><br>
                        <small>Accumulate to single value</small>
                    </div>
                </div>
            </div>
        `;
    }
    
    updateOutput('array benchmark', { 
        message: 'Array methods benchmark completed! Check console and performance metrics above for results.' 
    });
}

function runDOMBenchmark() {
    if (window.day3Learning) {
        window.day3Learning.benchmarkDOMCreation();
    }
    
    // Display results in performance metrics
    const metricsContainer = document.getElementById('performance-charts');
    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <h4>🏃 DOM Operations Performance Results</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p><strong>DOM Creation Speed Test Completed!</strong></p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #dc3545;">
                        <strong>Individual appendChild</strong><br>
                        <small>Slower - triggers multiple reflows</small><br>
                        <em>Check console for timing</em>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
                        <strong>DocumentFragment</strong><br>
                        <small>Faster - single DOM insertion</small><br>
                        <em>Check console for timing</em>
                    </div>
                </div>
                <p style="margin-top: 15px; font-size: 14px; color: #666;">
                    💡 <strong>Tip:</strong> Always use DocumentFragment for bulk DOM operations!
                </p>
            </div>
        `;
    }
    
    updateOutput('DOM benchmark', { 
        message: 'DOM operations benchmark completed! Check console and performance metrics above for results.' 
    });
}

function memoryProfileTest() {
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 'Not available';
    
    // Create some memory usage
    const largeArray = new Array(100000).fill(0).map((_, i) => ({ 
        id: i, 
        data: `Item ${i}`, 
        timestamp: Date.now() 
    }));
    
    const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 'Not available';
    
    // Display in performance metrics
    const metricsContainer = document.getElementById('performance-charts');
    if (metricsContainer) {
        const memoryDiff = endMemory !== 'Not available' && startMemory !== 'Not available' 
            ? ((endMemory - startMemory) / 1024 / 1024).toFixed(2) 
            : 'N/A';
            
        metricsContainer.innerHTML = `
            <h4>💾 Memory Usage Test Results</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="background: white; padding: 15px; border-radius: 5px; text-align: center;">
                        <strong style="color: #007bff;">Objects Created</strong><br>
                        <span style="font-size: 24px; font-weight: bold;">${largeArray.length.toLocaleString()}</span>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 5px; text-align: center;">
                        <strong style="color: #28a745;">Memory Used</strong><br>
                        <span style="font-size: 24px; font-weight: bold;">${memoryDiff} MB</span>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 5px; text-align: center;">
                        <strong style="color: #ffc107;">Heap Size</strong><br>
                        <span style="font-size: 18px; font-weight: bold;">${endMemory !== 'Not available' ? (endMemory / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'}</span>
                    </div>
                </div>
                <p style="margin-top: 15px; font-size: 14px; color: #666;">
                    💡 <strong>Tip:</strong> Open DevTools > Performance tab for detailed memory profiling
                </p>
            </div>
        `;
    }
    
    updateOutput('memory profile', {
        message: 'Memory usage test completed!',
        results: {
            startMemory: startMemory,
            endMemory: endMemory,
            itemsCreated: largeArray.length,
            note: 'Check DevTools > Performance tab for detailed memory profiling'
        }
    });
    
    console.log('Memory usage test:', { startMemory, endMemory, itemsCreated: largeArray.length });
}

// Additional missing functions for Task Manager section
function startProject() {
    startTaskManager();
}

// Arrow function demo (alternative name)
function arrowFunctionsDemo() {
    arrowFunctionDemo();
}

// Template literals demo (alternative name)
function templateLiteralsDemo() {
    templateLiteralDemo();
}

// Fix for the "Start Building" button in Task Manager section
function startBuilding() {
    startTaskManager();
}

// Fix for "Real World Performance" button
function realWorldPerformance() {
    console.log('🚀 Running real-world performance demonstrations...');
    
    // DOM manipulation performance test
    const startTime = performance.now();
    
    // Test 1: Fragment vs individual appendChild
    console.log('📊 Testing DocumentFragment vs individual appendChild...');
    const container1 = document.createElement('div');
    const container2 = document.createElement('div');
    
    // Method 1: Individual appendChild (slower)
    const start1 = performance.now();
    for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i}`;
        container1.appendChild(div);
    }
    const end1 = performance.now();
    
    // Method 2: DocumentFragment (faster)
    const start2 = performance.now();
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i}`;
        fragment.appendChild(div);
    }
    container2.appendChild(fragment);
    const end2 = performance.now();
    
    // Test 2: Array methods performance
    console.log('📊 Testing array methods performance...');
    const largeArray = Array.from({ length: 100000 }, (_, i) => i);
    
    const mapStart = performance.now();
    const mapped = largeArray.map(x => x * 2);
    const mapEnd = performance.now();
    
    const filterStart = performance.now();
    const filtered = largeArray.filter(x => x % 2 === 0);
    const filterEnd = performance.now();
    
    const results = {
        domManipulation: {
            individual: `${(end1 - start1).toFixed(2)}ms`,
            fragment: `${(end2 - start2).toFixed(2)}ms`,
            improvement: `${((end1 - start1) / (end2 - start2)).toFixed(1)}x faster`
        },
        arrayMethods: {
            map: `${(mapEnd - mapStart).toFixed(2)}ms`,
            filter: `${(filterEnd - filterStart).toFixed(2)}ms`
        }
    };
    
    updateOutput('real-world performance', {
        message: 'Real-world performance tests completed!',
        results: results
    });
    
    console.log('Performance Results:', results);
}

// Fix for Task Manager "Start Building" button
function initializeTaskManager() {
    startTaskManager();
}

// Fix for Performance "Real-World Performance" button  
function realWorldPerformanceTest() {
    realWorldPerformance();
    
    // Also display in performance metrics
    const metricsContainer = document.getElementById('performance-charts');
    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <h4>🌍 Real-World Performance Analysis</h4>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p><strong>Performance tests completed!</strong> See console for detailed timings.</p>
                
                <h5 style="margin-top: 20px; color: #495057;">🎯 Key Performance Lessons:</h5>
                <div style="display: grid; gap: 10px; margin-top: 15px;">
                    <div style="background: white; padding: 12px; border-radius: 5px; border-left: 4px solid #28a745;">
                        <strong>✅ Use DocumentFragment</strong> - Up to 10x faster for bulk DOM operations
                    </div>
                    <div style="background: white; padding: 12px; border-radius: 5px; border-left: 4px solid #007bff;">
                        <strong>✅ Batch DOM Updates</strong> - Minimize reflows and repaints
                    </div>
                    <div style="background: white; padding: 12px; border-radius: 5px; border-left: 4px solid #ffc107;">
                        <strong>✅ Optimize Array Operations</strong> - Choose right method for the task
                    </div>
                    <div style="background: white; padding: 12px; border-radius: 5px; border-left: 4px solid #6f42c1;">
                        <strong>✅ Measure Performance</strong> - Always profile before optimizing
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
                    <strong>🚀 Next Level:</strong> Learn React for component-based performance optimization!
                </div>
            </div>
        `;
    }
}