// Task Manager Application - Day 3 Final Project
// Demonstrates: ES6+ features, DOM manipulation, modern APIs, and best practices

class TaskManager {
    constructor() {
        this.tasks = new Map();
        this.nextId = 1;
        this.currentFilter = 'all';
        this.sortBy = 'created';
        this.container = null;
        this.isInitialized = false;
        
        // Bind methods to preserve 'this' context
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    // Initialize the task manager
    init(containerId = 'task-manager-container') {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id '${containerId}' not found`);
            return;
        }

        this.loadFromStorage();
        this.render();
        this.setupEventListeners();
        this.isInitialized = true;
        
        console.log('✅ Task Manager initialized successfully!');
        
        // Add some sample tasks for demonstration
        if (this.tasks.size === 0) {
            this.addSampleTasks();
        }
    }

    // Add sample tasks for demonstration
    addSampleTasks() {
        const samples = [
            {
                title: 'Learn ES6+ Features',
                description: 'Master destructuring, arrow functions, and async/await',
                priority: 'high',
                category: 'learning'
            },
            {
                title: 'Build Task Manager',
                description: 'Create a fully functional task management application',
                priority: 'medium',
                category: 'project'
            },
            {
                title: 'Practice DOM Manipulation',
                description: 'Experiment with modern DOM APIs and event handling',
                priority: 'low',
                category: 'practice'
            }
        ];

        samples.forEach(task => this.addTask(task.title, task.description, task.priority, task.category));
        console.log('📝 Sample tasks added');
    }

    // Create a new task
    addTask(title, description = '', priority = 'medium', category = 'general') {
        if (!title.trim()) {
            throw new Error('Task title is required');
        }

        const task = {
            id: this.nextId++,
            title: title.trim(),
            description: description.trim(),
            priority,
            category,
            completed: false,
            created: new Date(),
            updated: new Date(),
            completedAt: null,
            tags: new Set(),
            subtasks: []
        };

        this.tasks.set(task.id, task);
        this.saveToStorage();
        
        if (this.isInitialized) {
            this.render();
            this.showNotification(`Task "${task.title}" added successfully!`, 'success');
        }

        return task;
    }

    // Update an existing task
    updateTask(id, updates) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }

        const updatedTask = { 
            ...task, 
            ...updates, 
            updated: new Date() 
        };

        this.tasks.set(id, updatedTask);
        this.saveToStorage();
        
        if (this.isInitialized) {
            this.render();
        }

        return updatedTask;
    }

    // Toggle task completion
    toggleComplete(id) {
        const task = this.tasks.get(id);
        if (!task) return;

        const updates = {
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : null
        };

        this.updateTask(id, updates);
        
        const status = updates.completed ? 'completed' : 'uncompleted';
        this.showNotification(`Task "${task.title}" ${status}!`, 'info');
    }

    // Delete a task
    deleteTask(id) {
        const task = this.tasks.get(id);
        if (!task) return;

        this.tasks.delete(id);
        this.saveToStorage();
        
        if (this.isInitialized) {
            this.render();
            this.showNotification(`Task "${task.title}" deleted!`, 'warning');
        }
    }

    // Get filtered and sorted tasks
    getFilteredTasks() {
        let tasks = Array.from(this.tasks.values());

        // Apply filters
        switch (this.currentFilter) {
            case 'active':
                tasks = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                tasks = tasks.filter(task => task.completed);
                break;
            case 'high-priority':
                tasks = tasks.filter(task => task.priority === 'high');
                break;
            case 'today':
                const today = new Date().toDateString();
                tasks = tasks.filter(task => task.created.toDateString() === today);
                break;
        }

        // Apply sorting
        tasks.sort((a, b) => {
            switch (this.sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'updated':
                    return new Date(b.updated) - new Date(a.updated);
                case 'created':
                default:
                    return new Date(b.created) - new Date(a.created);
            }
        });

        return tasks;
    }

    // Render the entire task manager UI
    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="task-manager">
                <header class="task-header">
                    <h2>🎯 Task Manager Pro</h2>
                    <div class="task-stats">
                        ${this.renderStats()}
                    </div>
                </header>

                <div class="task-controls">
                    ${this.renderControls()}
                </div>

                <div class="task-form">
                    ${this.renderAddForm()}
                </div>

                <div class="task-list">
                    ${this.renderTaskList()}
                </div>

                <div id="notification-container"></div>
            </div>
        `;

        this.attachEventListeners();
        this.applyStyles();
    }

    // Render task statistics
    renderStats() {
        const totalTasks = this.tasks.size;
        const completedTasks = Array.from(this.tasks.values()).filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        return `
            <div class="stat-card">
                <span class="stat-number">${totalTasks}</span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${pendingTasks}</span>
                <span class="stat-label">Pending</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${completedTasks}</span>
                <span class="stat-label">Completed</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">${completionRate}%</span>
                <span class="stat-label">Success Rate</span>
            </div>
        `;
    }

    // Render filter and sort controls
    renderControls() {
        return `
            <div class="filter-controls">
                <label>Filter:</label>
                <select id="task-filter" value="${this.currentFilter}">
                    <option value="all">All Tasks</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="high-priority">High Priority</option>
                    <option value="today">Today</option>
                </select>
            </div>

            <div class="sort-controls">
                <label>Sort by:</label>
                <select id="task-sort" value="${this.sortBy}">
                    <option value="created">Date Created</option>
                    <option value="updated">Last Updated</option>
                    <option value="title">Title</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            <div class="view-controls">
                <button id="clear-completed" class="btn btn-warning">
                    🗑️ Clear Completed
                </button>
                <button id="export-tasks" class="btn btn-info">
                    📤 Export Tasks
                </button>
            </div>
        `;
    }

    // Render add task form
    renderAddForm() {
        return `
            <form id="add-task-form" class="add-form">
                <div class="form-row">
                    <input 
                        type="text" 
                        id="task-title" 
                        placeholder="What needs to be done?" 
                        required 
                        autocomplete="off"
                    >
                    <button type="submit" class="btn btn-primary">
                        ➕ Add Task
                    </button>
                </div>
                
                <div class="form-row">
                    <input 
                        type="text" 
                        id="task-description" 
                        placeholder="Description (optional)"
                        autocomplete="off"
                    >
                    <select id="task-priority">
                        <option value="low">Low Priority</option>
                        <option value="medium" selected>Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <input 
                        type="text" 
                        id="task-category" 
                        placeholder="Category" 
                        list="category-suggestions"
                        autocomplete="off"
                    >
                </div>

                <datalist id="category-suggestions">
                    <option value="work">
                    <option value="personal">
                    <option value="learning">
                    <option value="project">
                    <option value="health">
                    <option value="finance">
                </datalist>
            </form>
        `;
    }

    // Render task list
    renderTaskList() {
        const tasks = this.getFilteredTasks();
        
        if (tasks.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>No tasks found</h3>
                    <p>Add a new task to get started!</p>
                </div>
            `;
        }

        return `
            <div class="tasks-container">
                ${tasks.map(task => this.renderTask(task)).join('')}
            </div>
        `;
    }

    // Render individual task
    renderTask(task) {
        const { id, title, description, priority, category, completed, created, updated } = task;
        const createdDate = created.toLocaleDateString();
        const updatedDate = updated.toLocaleDateString();
        const timeAgo = this.getTimeAgo(created);

        return `
            <div class="task-item ${completed ? 'completed' : ''} priority-${priority}" data-task-id="${id}">
                <div class="task-content">
                    <div class="task-main">
                        <div class="task-checkbox">
                            <input 
                                type="checkbox" 
                                id="task-${id}" 
                                ${completed ? 'checked' : ''}
                                onchange="taskManager.toggleComplete(${id})"
                            >
                            <label for="task-${id}" class="checkbox-label"></label>
                        </div>
                        
                        <div class="task-details">
                            <h4 class="task-title" ondblclick="taskManager.editTask(${id})">${title}</h4>
                            ${description ? `<p class="task-description">${description}</p>` : ''}
                            
                            <div class="task-meta">
                                <span class="task-priority priority-${priority}">${priority}</span>
                                ${category ? `<span class="task-category">${category}</span>` : ''}
                                <span class="task-date" title="Created: ${createdDate}, Updated: ${updatedDate}">
                                    ${timeAgo}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="task-actions">
                        <button 
                            class="btn-icon" 
                            onclick="taskManager.editTask(${id})"
                            title="Edit task"
                        >
                            ✏️
                        </button>
                        <button 
                            class="btn-icon btn-delete" 
                            onclick="taskManager.deleteTask(${id})"
                            title="Delete task"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Event handlers
    handleAddTask(e) {
        e.preventDefault();
        
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        const prioritySelect = document.getElementById('task-priority');
        const categoryInput = document.getElementById('task-category');

        const title = titleInput.value.trim();
        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            titleInput.focus();
            return;
        }

        try {
            this.addTask(
                title,
                descriptionInput.value.trim(),
                prioritySelect.value,
                categoryInput.value.trim() || 'general'
            );

            // Reset form
            titleInput.value = '';
            descriptionInput.value = '';
            prioritySelect.value = 'medium';
            categoryInput.value = '';
            titleInput.focus();

        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    handleFilterChange(e) {
        this.currentFilter = e.target.value;
        this.render();
    }

    handleSortChange(e) {
        this.sortBy = e.target.value;
        this.render();
    }

    // Edit task functionality
    editTask(id) {
        const task = this.tasks.get(id);
        if (!task) return;

        const newTitle = prompt('Edit task title:', task.title);
        if (newTitle !== null && newTitle.trim() !== '') {
            const newDescription = prompt('Edit task description:', task.description);
            
            this.updateTask(id, {
                title: newTitle.trim(),
                description: newDescription ? newDescription.trim() : task.description
            });
            
            this.showNotification('Task updated successfully!', 'success');
        }
    }

    // Clear completed tasks
    clearCompleted() {
        const completedTasks = Array.from(this.tasks.values()).filter(task => task.completed);
        
        if (completedTasks.length === 0) {
            this.showNotification('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Delete ${completedTasks.length} completed task(s)?`)) {
            completedTasks.forEach(task => this.deleteTask(task.id));
            this.showNotification(`${completedTasks.length} completed tasks cleared!`, 'success');
        }
    }

    // Export tasks to JSON
    exportTasks() {
        const tasks = Array.from(this.tasks.values());
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Tasks exported successfully!', 'success');
    }

    // Attach event listeners
    attachEventListeners() {
        // Form submission
        const form = document.getElementById('add-task-form');
        if (form) {
            form.addEventListener('submit', this.handleAddTask);
        }

        // Filter and sort controls
        const filterSelect = document.getElementById('task-filter');
        if (filterSelect) {
            filterSelect.value = this.currentFilter;
            filterSelect.addEventListener('change', this.handleFilterChange);
        }

        const sortSelect = document.getElementById('task-sort');
        if (sortSelect) {
            sortSelect.value = this.sortBy;
            sortSelect.addEventListener('change', this.handleSortChange);
        }

        // Other controls
        const clearBtn = document.getElementById('clear-completed');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCompleted());
        }

        const exportBtn = document.getElementById('export-tasks');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportTasks());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        document.getElementById('task-title')?.focus();
                        break;
                    case 'f':
                        e.preventDefault();
                        document.getElementById('task-filter')?.focus();
                        break;
                }
            }
        });
    }

    // Setup general event listeners
    setupEventListeners() {
        // Auto-save when window is about to close
        window.addEventListener('beforeunload', () => {
            this.saveToStorage();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Global shortcuts when not in input fields
            if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                switch (e.key) {
                    case 'n':
                        document.getElementById('task-title')?.focus();
                        break;
                    case 'f':
                        document.getElementById('task-filter')?.focus();
                        break;
                }
            }
        });
    }

    // Utility methods
    getTimeAgo(date) {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        
        return date.toLocaleDateString();
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        container.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    // Data persistence
    saveToStorage() {
        try {
            const tasksArray = Array.from(this.tasks.values()).map(task => ({
                ...task,
                created: task.created.toISOString(),
                updated: task.updated.toISOString(),
                completedAt: task.completedAt?.toISOString() || null,
                tags: Array.from(task.tags)
            }));

            localStorage.setItem('taskManager_tasks', JSON.stringify(tasksArray));
            localStorage.setItem('taskManager_nextId', this.nextId.toString());
            localStorage.setItem('taskManager_filter', this.currentFilter);
            localStorage.setItem('taskManager_sort', this.sortBy);
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const tasksJson = localStorage.getItem('taskManager_tasks');
            if (tasksJson) {
                const tasksArray = JSON.parse(tasksJson);
                this.tasks.clear();
                
                tasksArray.forEach(taskData => {
                    const task = {
                        ...taskData,
                        created: new Date(taskData.created),
                        updated: new Date(taskData.updated),
                        completedAt: taskData.completedAt ? new Date(taskData.completedAt) : null,
                        tags: new Set(taskData.tags || [])
                    };
                    this.tasks.set(task.id, task);
                });
            }

            this.nextId = parseInt(localStorage.getItem('taskManager_nextId')) || 1;
            this.currentFilter = localStorage.getItem('taskManager_filter') || 'all';
            this.sortBy = localStorage.getItem('taskManager_sort') || 'created';
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
    }

    // Apply styles to the task manager
    applyStyles() {
        if (document.getElementById('task-manager-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'task-manager-styles';
        styles.textContent = `
            .task-manager {
                max-width: 800px;
                margin: 0 auto;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .task-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .task-header h2 {
                color: #2c3e50;
                margin-bottom: 1rem;
                font-size: 2rem;
            }

            .task-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .stat-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .stat-number {
                display: block;
                font-size: 1.5rem;
                font-weight: bold;
            }

            .stat-label {
                font-size: 0.8rem;
                opacity: 0.9;
            }

            .task-controls {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 10px;
            }

            .task-controls label {
                font-weight: 600;
                color: #495057;
                margin-right: 0.5rem;
            }

            .task-controls select {
                padding: 0.5rem;
                border: 1px solid #ced4da;
                border-radius: 5px;
                background: white;
            }

            .add-form {
                background: white;
                padding: 1.5rem;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                margin-bottom: 2rem;
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .form-row:last-child {
                grid-template-columns: 1fr auto 1fr;
                margin-bottom: 0;
            }

            .add-form input, .add-form select {
                padding: 0.75rem;
                border: 2px solid #e9ecef;
                border-radius: 5px;
                font-size: 1rem;
                transition: border-color 0.2s;
            }

            .add-form input:focus, .add-form select:focus {
                outline: none;
                border-color: #667eea;
            }

            .btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s;
                text-decoration: none;
                display: inline-block;
                text-align: center;
            }

            .btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .btn-warning {
                background: #ffc107;
                color: #212529;
            }

            .btn-info {
                background: #17a2b8;
                color: white;
            }

            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .tasks-container {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .task-item {
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                transition: all 0.2s;
                border-left: 4px solid #28a745;
            }

            .task-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .task-item.completed {
                opacity: 0.7;
                border-left-color: #6c757d;
            }

            .task-item.priority-high {
                border-left-color: #dc3545;
            }

            .task-item.priority-medium {
                border-left-color: #ffc107;
            }

            .task-item.priority-low {
                border-left-color: #28a745;
            }

            .task-content {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .task-main {
                display: flex;
                align-items: flex-start;
                flex: 1;
                gap: 1rem;
            }

            .task-checkbox {
                position: relative;
                margin-top: 0.25rem;
            }

            .task-checkbox input[type="checkbox"] {
                display: none;
            }

            .checkbox-label {
                display: block;
                width: 20px;
                height: 20px;
                border: 2px solid #ced4da;
                border-radius: 4px;
                cursor: pointer;
                position: relative;
                transition: all 0.2s;
            }

            .task-checkbox input[type="checkbox"]:checked + .checkbox-label {
                background: #28a745;
                border-color: #28a745;
            }

            .task-checkbox input[type="checkbox"]:checked + .checkbox-label::after {
                content: '✓';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-weight: bold;
                font-size: 12px;
            }

            .task-details {
                flex: 1;
            }

            .task-title {
                margin: 0 0 0.5rem 0;
                color: #2c3e50;
                cursor: pointer;
            }

            .task-item.completed .task-title {
                text-decoration: line-through;
                color: #6c757d;
            }

            .task-description {
                margin: 0 0 0.75rem 0;
                color: #6c757d;
                font-size: 0.9rem;
                line-height: 1.4;
            }

            .task-meta {
                display: flex;
                gap: 0.75rem;
                flex-wrap: wrap;
                align-items: center;
            }

            .task-priority, .task-category, .task-date {
                font-size: 0.75rem;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-weight: 600;
            }

            .task-priority.priority-high {
                background: #fee;
                color: #dc3545;
            }

            .task-priority.priority-medium {
                background: #fff8e1;
                color: #f57c00;
            }

            .task-priority.priority-low {
                background: #e8f5e8;
                color: #28a745;
            }

            .task-category {
                background: #e3f2fd;
                color: #1976d2;
            }

            .task-date {
                background: #f5f5f5;
                color: #666;
            }

            .task-actions {
                display: flex;
                gap: 0.5rem;
            }

            .btn-icon {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: background-color 0.2s;
                font-size: 1rem;
            }

            .btn-icon:hover {
                background: rgba(0, 0, 0, 0.1);
            }

            .btn-delete:hover {
                background: rgba(220, 53, 69, 0.1);
            }

            .empty-state {
                text-align: center;
                padding: 3rem 1rem;
                color: #6c757d;
            }

            .empty-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            .empty-state h3 {
                margin-bottom: 0.5rem;
                color: #495057;
            }

            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 5px;
                color: white;
                font-weight: 600;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }

            .notification.success {
                background: #28a745;
            }

            .notification.error {
                background: #dc3545;
            }

            .notification.warning {
                background: #ffc107;
                color: #212529;
            }

            .notification.info {
                background: #17a2b8;
            }

            .notification button {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0;
                margin: 0;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 768px) {
                .task-manager {
                    padding: 1rem;
                }

                .form-row {
                    grid-template-columns: 1fr;
                }

                .form-row:last-child {
                    grid-template-columns: 1fr;
                }

                .task-controls {
                    grid-template-columns: 1fr;
                }

                .task-content {
                    flex-direction: column;
                    gap: 1rem;
                }

                .task-actions {
                    align-self: flex-end;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Get statistics
    getStats() {
        const tasks = Array.from(this.tasks.values());
        const completed = tasks.filter(t => t.completed);
        const pending = tasks.filter(t => !t.completed);
        const highPriority = tasks.filter(t => t.priority === 'high');
        
        return {
            total: tasks.length,
            completed: completed.length,
            pending: pending.length,
            highPriority: highPriority.length,
            completionRate: tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0
        };
    }
}

// Create global instance
window.taskManager = new TaskManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskManager;
}