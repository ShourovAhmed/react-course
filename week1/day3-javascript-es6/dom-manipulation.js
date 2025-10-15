// DOM Manipulation & Modern Web APIs
// Day 3: Interactive DOM Learning Environment

class DOMManipulation {
    constructor() {
        this.playgroundArea = null;
        this.outputPanel = null;
        this.animationId = null;
        this.observers = new Map();
        this.initializePlayground();
    }

    initializePlayground() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupPlayground());
        } else {
            this.setupPlayground();
        }
    }

    setupPlayground() {
        this.playgroundArea = document.querySelector('.playground-area');
        this.outputPanel = document.querySelector('.output-content');
        
        if (!this.playgroundArea) {
            console.warn('Playground area not found');
            return;
        }

        this.clearPlayground();
        this.log('DOM Playground ready! 🎮');
    }

    log(message) {
        if (this.outputPanel) {
            const timestamp = new Date().toLocaleTimeString();
            this.outputPanel.textContent += `[${timestamp}] ${message}\n`;
            this.outputPanel.scrollTop = this.outputPanel.scrollHeight;
        }
        console.log(message);
    }

    clearPlayground() {
        if (this.playgroundArea) {
            this.playgroundArea.innerHTML = '<p>Ready for DOM manipulation experiments!</p>';
        }
        if (this.outputPanel) {
            this.outputPanel.textContent = '';
        }
    }

    // Basic DOM Creation and Manipulation
    createBasicElements() {
        this.clearPlayground();
        this.log('Creating basic DOM elements...');

        // Create container
        const container = document.createElement('div');
        container.className = 'demo-container';
        container.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            border-radius: 10px;
            color: white;
            text-align: center;
            margin: 10px 0;
        `;

        // Create title
        const title = document.createElement('h3');
        title.textContent = 'Dynamically Created Elements';
        title.style.marginBottom = '15px';

        // Create interactive button
        const button = document.createElement('button');
        button.textContent = 'Click me!';
        button.style.cssText = `
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            margin: 0 10px;
            transition: transform 0.2s;
        `;
        
        let clickCount = 0;
        button.addEventListener('click', () => {
            clickCount++;
            button.textContent = `Clicked ${clickCount} times!`;
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            this.log(`Button clicked ${clickCount} times`);
        });

        // Create input with real-time updates
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type something...';
        input.style.cssText = `
            padding: 8px 12px;
            border: none;
            border-radius: 5px;
            margin: 0 10px;
        `;

        const output = document.createElement('p');
        output.textContent = 'Type in the input above!';
        output.style.marginTop = '15px';

        input.addEventListener('input', (e) => {
            const value = e.target.value;
            output.textContent = value ? `You typed: "${value}"` : 'Type in the input above!';
            this.log(`Input changed: ${value}`);
        });

        // Assemble elements
        container.appendChild(title);
        container.appendChild(button);
        container.appendChild(input);
        container.appendChild(output);
        
        this.playgroundArea.appendChild(container);
        this.log('Basic elements created successfully!');
    }

    // Advanced Event Handling
    demonstrateEventHandling() {
        this.clearPlayground();
        this.log('Demonstrating advanced event handling...');

        const container = document.createElement('div');
        container.style.cssText = `
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #dee2e6;
        `;

        // Event delegation demo
        const list = document.createElement('ul');
        list.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 20px 0;
        `;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add Item';
        addButton.style.cssText = `
            background: #28a745;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 15px;
        `;

        let itemCount = 0;
        addButton.addEventListener('click', () => {
            itemCount++;
            const item = document.createElement('li');
            item.innerHTML = `
                <span style="display: inline-block; width: 200px;">Item ${itemCount}</span>
                <button class="delete-btn" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; margin-left: 10px;">Delete</button>
            `;
            item.style.cssText = `
                padding: 8px;
                margin: 5px 0;
                background: white;
                border-radius: 5px;
                border: 1px solid #dee2e6;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            list.appendChild(item);
            this.log(`Added item ${itemCount}`);
        });

        // Event delegation - single listener for all delete buttons
        list.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const item = e.target.closest('li');
                const itemText = item.querySelector('span').textContent;
                item.remove();
                this.log(`Deleted: ${itemText}`);
            }
        });

        // Keyboard events
        const keyboardDemo = document.createElement('div');
        keyboardDemo.innerHTML = `
            <h4>Keyboard Events Demo</h4>
            <input type="text" placeholder="Press keys here..." style="width: 100%; padding: 8px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px;">
            <div id="key-info" style="background: #e9ecef; padding: 10px; border-radius: 5px; font-family: monospace;">Press any key...</div>
        `;

        const keyInput = keyboardDemo.querySelector('input');
        const keyInfo = keyboardDemo.querySelector('#key-info');

        keyInput.addEventListener('keydown', (e) => {
            keyInfo.innerHTML = `
                <strong>Key:</strong> ${e.key}<br>
                <strong>Code:</strong> ${e.code}<br>
                <strong>Alt:</strong> ${e.altKey} | <strong>Ctrl:</strong> ${e.ctrlKey} | <strong>Shift:</strong> ${e.shiftKey}
            `;
            this.log(`Key pressed: ${e.key} (${e.code})`);
        });

        container.appendChild(document.createElement('h3')).textContent = 'Event Handling Demo';
        container.appendChild(addButton);
        container.appendChild(list);
        container.appendChild(keyboardDemo);

        this.playgroundArea.appendChild(container);
        this.log('Event handling demo ready!');
    }

    // CSS Manipulation and Animations
    demonstrateCSSManipulation() {
        this.clearPlayground();
        this.log('Demonstrating CSS manipulation and animations...');

        const container = document.createElement('div');
        container.style.cssText = `
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            padding: 30px;
            border-radius: 15px;
            color: white;
            text-align: center;
        `;

        // Animated box
        const animatedBox = document.createElement('div');
        animatedBox.style.cssText = `
            width: 100px;
            height: 100px;
            background: white;
            margin: 20px auto;
            border-radius: 10px;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #333;
        `;
        animatedBox.textContent = 'Click me!';

        const transforms = [
            'rotate(45deg) scale(1.2)',
            'rotate(90deg) scale(0.8)',
            'rotate(180deg) scale(1.5)',
            'rotate(270deg) scale(1)',
            'rotate(360deg) scale(1)'
        ];
        let transformIndex = 0;

        animatedBox.addEventListener('click', () => {
            animatedBox.style.transform = transforms[transformIndex];
            transformIndex = (transformIndex + 1) % transforms.length;
            this.log(`Applied transform: ${transforms[transformIndex - 1] || transforms[transforms.length - 1]}`);
        });

        // Color changer
        const colorChanger = document.createElement('div');
        colorChanger.innerHTML = `
            <h4>Dynamic Styling</h4>
            <button id="change-bg">Change Background</button>
            <button id="toggle-theme">Toggle Theme</button>
            <button id="animate-text">Animate Text</button>
        `;

        const changeBgBtn = colorChanger.querySelector('#change-bg');
        const toggleThemeBtn = colorChanger.querySelector('#toggle-theme');
        const animateTextBtn = colorChanger.querySelector('#animate-text');

        // Style buttons
        [changeBgBtn, toggleThemeBtn, animateTextBtn].forEach(btn => {
            btn.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid white;
                padding: 8px 16px;
                margin: 5px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'white';
                btn.style.color = '#333';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
                btn.style.color = 'white';
            });
        });

        changeBgBtn.addEventListener('click', () => {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#e74c3c', '#9b59b6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            container.style.background = `linear-gradient(45deg, ${randomColor}, #2c3e50)`;
            this.log(`Background changed to: ${randomColor}`);
        });

        let isDark = false;
        toggleThemeBtn.addEventListener('click', () => {
            isDark = !isDark;
            if (isDark) {
                container.style.background = 'linear-gradient(45deg, #2c3e50, #34495e)';
                container.style.color = '#ecf0f1';
            } else {
                container.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                container.style.color = 'white';
            }
            this.log(`Theme switched to: ${isDark ? 'dark' : 'light'}`);
        });

        animateTextBtn.addEventListener('click', () => {
            const title = container.querySelector('h3');
            title.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                title.style.animation = '';
            }, 500);
            this.log('Text animation triggered');
        });

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        container.appendChild(document.createElement('h3')).textContent = 'CSS Manipulation Demo';
        container.appendChild(animatedBox);
        container.appendChild(colorChanger);

        this.playgroundArea.appendChild(container);
        this.log('CSS manipulation demo ready!');
    }

    // Modern Web APIs
    demonstrateModernAPIs() {
        this.clearPlayground();
        this.log('Demonstrating modern Web APIs...');

        const container = document.createElement('div');
        container.style.cssText = `
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #dee2e6;
        `;

        // Intersection Observer demo
        const observerDemo = document.createElement('div');
        observerDemo.innerHTML = `
            <h4>Intersection Observer API</h4>
            <p>Scroll down to see elements appear!</p>
            <div style="height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;">
        `;

        for (let i = 1; i <= 10; i++) {
            const item = document.createElement('div');
            item.className = 'observer-item';
            item.textContent = `Item ${i} - Not visible yet`;
            item.style.cssText = `
                height: 80px;
                margin: 20px 0;
                background: #e9ecef;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                opacity: 0.3;
                transform: translateX(-50px);
                transition: all 0.5s ease;
            `;
            observerDemo.appendChild(item);
        }

        observerDemo.innerHTML += '</div>';

        // Setup Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.background = '#28a745';
                    entry.target.style.color = 'white';
                    entry.target.textContent = entry.target.textContent.replace('Not visible yet', 'Visible!');
                    this.log(`Item became visible: ${entry.target.textContent}`);
                }
            });
        }, { threshold: 0.5 });

        // Observe all items
        setTimeout(() => {
            observerDemo.querySelectorAll('.observer-item').forEach(item => {
                observer.observe(item);
            });
        }, 100);

        // Resize Observer demo
        const resizeDemo = document.createElement('div');
        resizeDemo.innerHTML = `
            <h4>Resize Observer API</h4>
            <div id="resizable" style="
                width: 200px;
                height: 100px;
                background: #007bff;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                resize: both;
                overflow: auto;
                margin: 10px 0;
            ">Resize me!</div>
            <p id="size-info">Size: 200px × 100px</p>
        `;

        const resizableElement = resizeDemo.querySelector('#resizable');
        const sizeInfo = resizeDemo.querySelector('#size-info');

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                sizeInfo.textContent = `Size: ${Math.round(width)}px × ${Math.round(height)}px`;
                this.log(`Element resized to: ${Math.round(width)}px × ${Math.round(height)}px`);
            }
        });

        resizeObserver.observe(resizableElement);

        // Geolocation API demo
        const locationDemo = document.createElement('div');
        locationDemo.innerHTML = `
            <h4>Geolocation API</h4>
            <button id="get-location">Get My Location</button>
            <div id="location-info" style="margin-top: 10px; padding: 10px; background: #e9ecef; border-radius: 5px;">
                Click the button to get your location
            </div>
        `;

        const getLocationBtn = locationDemo.querySelector('#get-location');
        const locationInfo = locationDemo.querySelector('#location-info');

        getLocationBtn.style.cssText = `
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        `;

        getLocationBtn.addEventListener('click', () => {
            if ('geolocation' in navigator) {
                locationInfo.textContent = 'Getting location...';
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        locationInfo.innerHTML = `
                            <strong>Latitude:</strong> ${latitude.toFixed(6)}<br>
                            <strong>Longitude:</strong> ${longitude.toFixed(6)}<br>
                            <strong>Accuracy:</strong> ${position.coords.accuracy} meters
                        `;
                        this.log(`Location obtained: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                    },
                    (error) => {
                        locationInfo.textContent = `Error: ${error.message}`;
                        this.log(`Geolocation error: ${error.message}`);
                    }
                );
            } else {
                locationInfo.textContent = 'Geolocation is not supported by this browser.';
                this.log('Geolocation not supported');
            }
        });

        container.appendChild(document.createElement('h3')).textContent = 'Modern Web APIs Demo';
        container.appendChild(observerDemo);
        container.appendChild(resizeDemo);
        container.appendChild(locationDemo);

        this.playgroundArea.appendChild(container);
        this.log('Modern APIs demo ready!');
    }

    // Performance optimization demo
    demonstratePerformance() {
        this.clearPlayground();
        this.log('Demonstrating performance optimization techniques...');

        const container = document.createElement('div');
        container.style.cssText = `
            background: #fff3cd;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #ffeaa7;
        `;

        // Virtual scrolling demo
        const virtualScrollDemo = document.createElement('div');
        virtualScrollDemo.innerHTML = `
            <h4>Virtual Scrolling Performance</h4>
            <button id="render-many">Render 10,000 Items (Optimized)</button>
            <button id="render-naive">Render 10,000 Items (Naive)</button>
            <div id="scroll-container" style="
                height: 300px;
                overflow-y: auto;
                border: 1px solid #ccc;
                margin: 10px 0;
                padding: 10px;
            "></div>
            <div id="performance-info"></div>
        `;

        const renderManyBtn = virtualScrollDemo.querySelector('#render-many');
        const renderNaiveBtn = virtualScrollDemo.querySelector('#render-naive');
        const scrollContainer = virtualScrollDemo.querySelector('#scroll-container');
        const performanceInfo = virtualScrollDemo.querySelector('#performance-info');

        [renderManyBtn, renderNaiveBtn].forEach(btn => {
            btn.style.cssText = `
                background: #007bff;
                color: white;
                border: none;
                padding: 8px 16px;
                margin: 5px;
                border-radius: 5px;
                cursor: pointer;
            `;
        });

        renderManyBtn.addEventListener('click', () => {
            const startTime = performance.now();
            
            // Optimized approach using DocumentFragment
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < 10000; i++) {
                const item = document.createElement('div');
                item.textContent = `Optimized Item ${i + 1}`;
                item.style.cssText = 'padding: 5px; border-bottom: 1px solid #eee;';
                fragment.appendChild(item);
            }
            
            scrollContainer.innerHTML = '';
            scrollContainer.appendChild(fragment);
            
            const endTime = performance.now();
            const duration = endTime - startTime;
            performanceInfo.innerHTML = `✅ Optimized rendering: ${duration.toFixed(2)}ms`;
            this.log(`Optimized rendering completed in ${duration.toFixed(2)}ms`);
        });

        renderNaiveBtn.addEventListener('click', () => {
            const startTime = performance.now();
            
            // Naive approach - direct DOM manipulation
            scrollContainer.innerHTML = '';
            for (let i = 0; i < 10000; i++) {
                const item = document.createElement('div');
                item.textContent = `Naive Item ${i + 1}`;
                item.style.cssText = 'padding: 5px; border-bottom: 1px solid #eee;';
                scrollContainer.appendChild(item); // This triggers reflow each time!
            }
            
            const endTime = performance.now();
            const duration = endTime - startTime;
            performanceInfo.innerHTML = `⚠️ Naive rendering: ${duration.toFixed(2)}ms`;
            this.log(`Naive rendering completed in ${duration.toFixed(2)}ms`);
        });

        // Debouncing demo
        const debounceDemo = document.createElement('div');
        debounceDemo.innerHTML = `
            <h4>Debouncing & Throttling</h4>
            <input type="text" id="search-input" placeholder="Type to search..." style="width: 100%; padding: 8px; margin: 10px 0;">
            <div id="search-results" style="background: #f8f9fa; padding: 10px; border-radius: 5px; min-height: 40px;">
                Type in the search box...
            </div>
        `;

        const searchInput = debounceDemo.querySelector('#search-input');
        const searchResults = debounceDemo.querySelector('#search-results');

        // Debounce function
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Simulated search function
        const performSearch = (query) => {
            if (!query) {
                searchResults.textContent = 'Type in the search box...';
                return;
            }
            
            searchResults.innerHTML = `
                <div>🔍 Searching for "${query}"...</div>
                <div>Found ${Math.floor(Math.random() * 100)} results</div>
                <div style="font-size: 0.8em; color: #666;">Search performed at ${new Date().toLocaleTimeString()}</div>
            `;
            this.log(`Search performed for: ${query}`);
        };

        // Debounced search (waits 300ms after user stops typing)
        const debouncedSearch = debounce((e) => {
            performSearch(e.target.value);
        }, 300);

        searchInput.addEventListener('input', debouncedSearch);

        container.appendChild(document.createElement('h3')).textContent = 'Performance Optimization Demo';
        container.appendChild(virtualScrollDemo);
        container.appendChild(debounceDemo);

        this.playgroundArea.appendChild(container);
        this.log('Performance optimization demo ready!');
    }

    // Clean up observers and animations
    cleanup() {
        // Clear any running animations
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // Disconnect observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();

        this.log('Cleanup completed');
    }
}

// Create global instance
window.domManipulation = new DOMManipulation();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOMManipulation;
}