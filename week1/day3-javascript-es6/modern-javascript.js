// Modern JavaScript ES6+ Features & Demonstrations
// Day 3: Interactive Learning Environment

class ModernJavaScript {
    constructor() {
        this.examples = new Map();
        this.initializeExamples();
    }

    initializeExamples() {
        // ES6+ Features with before/after comparisons
        this.examples.set('variables', {
            title: 'Variables: let, const vs var',
            es5: `// ES5 - var problems
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Always prints 3!
    }, 100);
}

var name = "John";
var name = "Jane"; // Redeclaration allowed
console.log(name); // "Jane"`,
            es6: `// ES6+ - let and const
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // Prints 0, 1, 2
    }, 100);
}

const name = "John";
// const name = "Jane"; // Error!
let age = 25;
age = 26; // OK
console.log(name, age);`
        });

        this.examples.set('destructuring', {
            title: 'Destructuring Assignment',
            es5: `// ES5 - Manual extraction
var person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

var name = person.name;
var age = person.age;
var city = person.city;

var numbers = [1, 2, 3, 4, 5];
var first = numbers[0];
var second = numbers[1];
var rest = numbers.slice(2);`,
            es6: `// ES6+ - Destructuring
const person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

const { name, age, city } = person;

const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

// Advanced destructuring
const { name: personName, age: personAge = 25 } = person;
const [, , third] = numbers; // Skip elements`
        });

        this.examples.set('arrow-functions', {
            title: 'Arrow Functions',
            es5: `// ES5 - Regular functions
var numbers = [1, 2, 3, 4, 5];

var doubled = numbers.map(function(num) {
    return num * 2;
});

var Calculator = {
    multiplier: 2,
    multiply: function(numbers) {
        var self = this;
        return numbers.map(function(num) {
            return num * self.multiplier;
        });
    }
};`,
            es6: `// ES6+ - Arrow functions
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);

const Calculator = {
    multiplier: 2,
    multiply(numbers) {
        return numbers.map(num => num * this.multiplier);
    }
};

// Multiple parameters and blocks
const add = (a, b) => a + b;
const processData = data => {
    const processed = data.filter(item => item.active);
    return processed.map(item => ({ ...item, timestamp: Date.now() }));
};`
        });

        this.examples.set('template-literals', {
            title: 'Template Literals',
            es5: `// ES5 - String concatenation
var name = "Alice";
var age = 30;
var greeting = "Hello, my name is " + name + 
               " and I am " + age + " years old.";

var html = '<div class="card">' +
           '<h2>' + name + '</h2>' +
           '<p>Age: ' + age + '</p>' +
           '</div>';

console.log(greeting);`,
            es6: `// ES6+ - Template literals
const name = "Alice";
const age = 30;
const greeting = \`Hello, my name is \${name} 
                  and I am \${age} years old.\`;

const html = \`
    <div class="card">
        <h2>\${name}</h2>
        <p>Age: \${age}</p>
        <p>Status: \${age >= 18 ? 'Adult' : 'Minor'}</p>
    </div>
\`;

console.log(greeting);`
        });

        this.examples.set('spread-rest', {
            title: 'Spread & Rest Operators',
            es5: `// ES5 - Manual operations
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var combined = arr1.concat(arr2);

function sum() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(acc, num) {
        return acc + num;
    }, 0);
}

var obj1 = { a: 1, b: 2 };
var obj2 = { c: 3 };
var merged = Object.assign({}, obj1, obj2);`,
            es6: `// ES6+ - Spread & Rest
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

const sum = (...numbers) => 
    numbers.reduce((acc, num) => acc + num, 0);

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = { ...obj1, ...obj2 };

// Advanced usage
const [first, ...rest] = combined;
const { a, ...others } = merged;`
        });

        this.examples.set('async-await', {
            title: 'Async/Await vs Promises',
            es5: `// ES5/ES6 - Promises (callback hell solution)
function fetchUserData(userId) {
    return fetch('/api/users/' + userId)
        .then(function(response) {
            return response.json();
        })
        .then(function(user) {
            return fetch('/api/posts/' + user.id);
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(posts) {
            return { user: user, posts: posts };
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}`,
            es6: `// ES2017+ - Async/Await
async function fetchUserData(userId) {
    try {
        const userResponse = await fetch(\`/api/users/\${userId}\`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(\`/api/posts/\${user.id}\`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Parallel execution
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => fetchUserData(id));
    return await Promise.all(promises);
}`
        });
    }

    // Interactive demonstration methods
    demonstrateVariables() {
        console.log('=== Variable Scoping Demo ===');
        
        // Hoisting example
        console.log('Hoisting with var:');
        console.log(varVariable); // undefined (hoisted)
        var varVariable = 'I am var';
        
        // Block scoping
        console.log('\\nBlock scoping:');
        if (true) {
            var functionScoped = 'I am function scoped';
            let blockScoped = 'I am block scoped';
            const alsoBlockScoped = 'I am also block scoped';
        }
        
        console.log(functionScoped); // Works
        // console.log(blockScoped); // Would throw ReferenceError
        
        return {
            message: 'Variables demo completed! Check console for details.',
            demonstration: 'let and const provide block scoping and prevent hoisting issues'
        };
    }

    demonstrateDestructuring() {
        console.log('=== Destructuring Demo ===');
        
        // Object destructuring
        const user = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            address: {
                street: '123 Main St',
                city: 'New York',
                zip: '10001'
            },
            hobbies: ['reading', 'gaming', 'cooking']
        };
        
        // Basic destructuring
        const { name, email } = user;
        console.log('Basic:', { name, email });
        
        // Nested destructuring
        const { address: { city, zip } } = user;
        console.log('Nested:', { city, zip });
        
        // Array destructuring
        const [firstHobby, ...otherHobbies] = user.hobbies;
        console.log('Array:', { firstHobby, otherHobbies });
        
        // Default values
        const { phone = 'Not provided' } = user;
        console.log('Default:', { phone });
        
        return {
            message: 'Destructuring demo completed!',
            extracted: { name, email, city, firstHobby }
        };
    }

    demonstrateArrowFunctions() {
        console.log('=== Arrow Functions Demo ===');
        
        const numbers = [1, 2, 3, 4, 5];
        
        // Different arrow function syntaxes
        const double = x => x * 2;
        const add = (a, b) => a + b;
        const processNumber = num => {
            const doubled = num * 2;
            const squared = doubled * doubled;
            return { original: num, doubled, squared };
        };
        
        console.log('Single param:', numbers.map(double));
        console.log('Multiple params:', add(5, 3));
        console.log('Block body:', processNumber(4));
        
        // this binding demonstration
        const context = {
            name: 'Arrow Function Demo',
            regular: function() {
                return `Regular function: ${this.name}`;
            },
            arrow: () => {
                return `Arrow function: ${this.name}`; // 'this' is lexical
            }
        };
        
        console.log(context.regular());
        console.log(context.arrow());
        
        return {
            message: 'Arrow functions demo completed!',
            results: {
                doubled: numbers.map(double),
                sum: add(5, 3),
                processed: processNumber(4)
            }
        };
    }

    demonstrateTemplates() {
        console.log('=== Template Literals Demo ===');
        
        const user = { name: 'Alice', age: 28, role: 'developer' };
        const score = 85;
        
        // Basic interpolation
        const greeting = `Hello, ${user.name}!`;
        
        // Multi-line strings
        const profile = `
            Name: ${user.name}
            Age: ${user.age}
            Role: ${user.role}
            Status: ${user.age >= 18 ? 'Adult' : 'Minor'}
        `;
        
        // Expressions in templates
        const grade = `Score: ${score}/100 (${score >= 90 ? 'A' : score >= 80 ? 'B' : 'C'})`;
        
        // Tagged templates (advanced)
        function highlight(strings, ...values) {
            return strings.reduce((result, string, i) => {
                const value = values[i] ? `<mark>${values[i]}</mark>` : '';
                return result + string + value;
            }, '');
        }
        
        const highlighted = highlight`User ${user.name} scored ${score}%`;
        
        console.log(greeting);
        console.log(profile);
        console.log(grade);
        console.log(highlighted);
        
        return {
            message: 'Template literals demo completed!',
            examples: { greeting, grade, highlighted }
        };
    }

    demonstrateSpreadRest() {
        console.log('=== Spread & Rest Demo ===');
        
        // Spread with arrays
        const fruits = ['apple', 'banana'];
        const vegetables = ['carrot', 'lettuce'];
        const food = [...fruits, 'orange', ...vegetables];
        
        console.log('Spread arrays:', food);
        
        // Spread with objects
        const baseConfig = { debug: false, theme: 'light' };
        const userConfig = { theme: 'dark', language: 'en' };
        const finalConfig = { ...baseConfig, ...userConfig, version: '1.0' };
        
        console.log('Spread objects:', finalConfig);
        
        // Rest parameters
        const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
        const multiply = (multiplier, ...numbers) => 
            numbers.map(num => num * multiplier);
        
        console.log('Rest sum:', sum(1, 2, 3, 4, 5));
        console.log('Rest multiply:', multiply(3, 1, 2, 3));
        
        // Destructuring with rest
        const [first, second, ...remaining] = food;
        const { debug, ...otherSettings } = finalConfig;
        
        console.log('Array rest:', { first, second, remaining });
        console.log('Object rest:', { debug, otherSettings });
        
        return {
            message: 'Spread & Rest demo completed!',
            results: {
                combinedFood: food,
                config: finalConfig,
                sum: sum(1, 2, 3, 4, 5),
                multiplied: multiply(3, 1, 2, 3)
            }
        };
    }

    async demonstrateAsyncAwait() {
        console.log('=== Async/Await Demo ===');
        
        // Simulate API calls
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        
        const fetchUser = async (id) => {
            await delay(500);
            return { id, name: `User ${id}`, email: `user${id}@example.com` };
        };
        
        const fetchPosts = async (userId) => {
            await delay(300);
            return [
                { id: 1, title: 'Post 1', userId },
                { id: 2, title: 'Post 2', userId }
            ];
        };
        
        try {
            console.log('Fetching user data...');
            const user = await fetchUser(123);
            console.log('User fetched:', user);
            
            console.log('Fetching user posts...');
            const posts = await fetchPosts(user.id);
            console.log('Posts fetched:', posts);
            
            // Parallel execution
            console.log('Fetching multiple users in parallel...');
            const users = await Promise.all([
                fetchUser(1),
                fetchUser(2),
                fetchUser(3)
            ]);
            console.log('All users:', users);
            
            return {
                message: 'Async/Await demo completed!',
                data: { user, posts, users }
            };
        } catch (error) {
            console.error('Error in async demo:', error);
            return { message: 'Error occurred', error: error.message };
        }
    }

    // Modern array methods demonstration
    demonstrateArrayMethods() {
        console.log('=== Modern Array Methods Demo ===');
        
        const products = [
            { id: 1, name: 'Laptop', price: 999, category: 'electronics', inStock: true },
            { id: 2, name: 'Book', price: 15, category: 'books', inStock: true },
            { id: 3, name: 'Phone', price: 699, category: 'electronics', inStock: false },
            { id: 4, name: 'Desk', price: 299, category: 'furniture', inStock: true },
            { id: 5, name: 'Headphones', price: 199, category: 'electronics', inStock: true }
        ];
        
        // Filter - find electronics in stock
        const electronicsInStock = products.filter(p => 
            p.category === 'electronics' && p.inStock
        );
        
        // Map - create summary
        const productSummary = products.map(p => ({
            name: p.name,
            affordable: p.price < 500,
            status: p.inStock ? 'Available' : 'Out of Stock'
        }));
        
        // Reduce - calculate total value
        const totalValue = products
            .filter(p => p.inStock)
            .reduce((sum, p) => sum + p.price, 0);
        
        // Find - get specific product
        const expensiveProduct = products.find(p => p.price > 500);
        
        // Some/Every - check conditions
        const hasAffordableItems = products.some(p => p.price < 100);
        const allInStock = products.every(p => p.inStock);
        
        // Group by category (using reduce)
        const byCategory = products.reduce((groups, product) => {
            const category = product.category;
            groups[category] = groups[category] || [];
            groups[category].push(product);
            return groups;
        }, {});
        
        console.log('Electronics in stock:', electronicsInStock);
        console.log('Product summary:', productSummary);
        console.log('Total value:', totalValue);
        console.log('Expensive product:', expensiveProduct);
        console.log('Has affordable items:', hasAffordableItems);
        console.log('All in stock:', allInStock);
        console.log('By category:', byCategory);
        
        return {
            message: 'Array methods demo completed!',
            results: {
                electronicsInStock,
                totalValue,
                expensiveProduct,
                hasAffordableItems,
                allInStock,
                categories: Object.keys(byCategory)
            }
        };
    }

    // Optional chaining and nullish coalescing
    demonstrateModernOperators() {
        console.log('=== Modern Operators Demo ===');
        
        const user = {
            id: 1,
            name: 'John',
            profile: {
                avatar: null,
                preferences: {
                    theme: 'dark'
                }
            },
            contacts: [
                { type: 'email', value: 'john@example.com' },
                { type: 'phone', value: null }
            ]
        };
        
        // Optional chaining (?.)
        const theme = user.profile?.preferences?.theme;
        const avatar = user.profile?.avatar;
        const phone = user.contacts?.find(c => c.type === 'phone')?.value;
        const nonExistent = user.profile?.social?.twitter;
        
        // Nullish coalescing (??)
        const displayAvatar = avatar ?? 'default-avatar.png';
        const displayPhone = phone ?? 'No phone provided';
        const displayName = user.name ?? 'Anonymous';
        
        // Logical assignment operators
        let config = { debug: false };
        config.theme ??= 'light'; // Only assign if nullish
        config.debug ||= process.env.NODE_ENV === 'development';
        config.timeout &&= Math.min(config.timeout, 5000);
        
        console.log('Optional chaining results:');
        console.log('Theme:', theme);
        console.log('Avatar:', avatar);
        console.log('Phone:', phone);
        console.log('Non-existent:', nonExistent);
        
        console.log('\\nNullish coalescing results:');
        console.log('Display avatar:', displayAvatar);
        console.log('Display phone:', displayPhone);
        console.log('Display name:', displayName);
        
        console.log('\\nLogical assignment:', config);
        
        return {
            message: 'Modern operators demo completed!',
            results: {
                theme,
                displayAvatar,
                displayPhone,
                config
            }
        };
    }

    // Get example by key
    getExample(key) {
        return this.examples.get(key);
    }

    // Get all example keys
    getExampleKeys() {
        return Array.from(this.examples.keys());
    }

    // Run all demonstrations
    async runAllDemos() {
        console.log('🚀 Running all ES6+ demonstrations...');
        
        const results = {
            variables: this.demonstrateVariables(),
            destructuring: this.demonstrateDestructuring(),
            arrowFunctions: this.demonstrateArrowFunctions(),
            templates: this.demonstrateTemplates(),
            spreadRest: this.demonstrateSpreadRest(),
            arrayMethods: this.demonstrateArrayMethods(),
            modernOperators: this.demonstrateModernOperators(),
            asyncAwait: await this.demonstrateAsyncAwait()
        };
        
        console.log('✅ All demonstrations completed!');
        return results;
    }
}

// Create global instance
window.modernJS = new ModernJavaScript();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernJavaScript;
}