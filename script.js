// Theme Management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if(!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
loadTheme(); // Load theme on all pages


// Dashboard / To-Do Logic
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const logoutBtn = document.getElementById('logoutBtn');

// Check authentication for dashboard
function checkAuth() {
    if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            window.location.href = 'login.html';
        }
    }
}

// Load tasks specific to the logged-in user
function loadTasks() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    taskList.innerHTML = '';
    tasks.forEach((task, index) => renderTask(task, index));
}

function saveTasks(tasks) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
    }
}

function getTasks() {
    const currentUser = localStorage.getItem('currentUser');
    return JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
}

function renderTask(task, index) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleTaskStatus(${index})"><i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i></button>
            <button class="delete-btn" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
        </div>
    `;
    taskList.appendChild(li);
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const tasks = getTasks();
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        taskInput.value = '';
        loadTasks();
    }
}

window.toggleTaskStatus = function(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

window.deleteTask = function(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

if (addTaskBtn) {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// Initialization for Dashboard
if (document.getElementById('taskList')) {
    checkAuth();
    loadTasks();
}
