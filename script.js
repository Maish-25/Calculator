let tasks = [];
let currentMonth = new Date().getMonth();

function renderCalendar(month) {
    const calendar = document.querySelector('.calendar');
    calendar.innerHTML = '';

    const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        if (new Date(new Date().getFullYear(), month, i).getDay() === 0 || new Date(new Date().getFullYear(), month, i).getDay() === 6) {
            dayElement.classList.add('weekend');
        }
        dayElement.textContent = i;
        dayElement.addEventListener('click', () => {
            const taskName = prompt('Enter task name:');
            const duration = parseInt(prompt('Enter task duration in hours:'));

            const task = {
                day: i,
                name: taskName,
                duration: duration
            };
            tasks.push(task);
            renderTasks();
            updateSummary();
        });
        calendar.appendChild(dayElement);
    }

    document.getElementById('current-month').textContent = new Date(new Date().getFullYear(), month, 1).toLocaleString('default', { month: 'long' });
}

function renderTasks() {
    const calendar = document.querySelector('.calendar');
    const taskElements = document.querySelectorAll('.task');
    taskElements.forEach(element => element.remove());

    tasks.forEach(task => {
        const dayElement = calendar.children[task.day - 1];
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.textContent = `${task.name} (${task.duration} hours)`;
        dayElement.appendChild(taskElement);
    });
}

function updateSummary() {
    const allocatedHours = tasks.reduce((total, task) => total + task.duration, 0);
    const remainingHours = 672 - allocatedHours;
    document.getElementById('allocated-hours').textContent = allocatedHours;
    document.getElementById('remaining-hours').textContent = remainingHours;
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    renderCalendar(currentMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    renderCalendar(currentMonth);
});

renderCalendar(currentMonth);

