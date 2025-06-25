document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.querySelector('.add-task-btn');

    // Función para obtener el siguiente número de tarea
    const getNextTaskNumber = () => {
        const tasks = todoList.querySelectorAll('.task-item');
        return (tasks.length + 1).toString().padStart(2, '0');
    };

    // Función para actualizar todos los números de tarea
    const updateTaskNumbers = () => {
        const tasks = todoList.querySelectorAll('.task-item');
        tasks.forEach((task, index) => {
            const number = (index + 1).toString().padStart(2, '0');
            task.querySelector('.task-number').textContent = number;
        });
    };

    // Función para marcar tarea como completada
    const toggleComplete = (li) => {
        li.classList.toggle('completed');
        saveState();
    };

    // Función para eliminar tarea
    const deleteTask = (li) => {
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            updateTaskNumbers();
            saveState();
        }, 300);
    };

    // Función para crear una nueva tarea
    const createTaskElement = (taskText, taskNumber) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.innerHTML = `
            <span class="task-number">${taskNumber}</span>
            <span class="task">${taskText}</span>
            <div class="actions">
                <button class="complete-btn" aria-label="Marcar como completada">
                    <i class="fas fa-check"></i>
                </button>
                <button class="delete-btn" aria-label="Eliminar tarea">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        return li;
    };

    // Función para añadir nueva tarea
    const addNewTask = () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const taskNumber = getNextTaskNumber();
            const li = createTaskElement(taskText, taskNumber);
            todoList.appendChild(li);
            newTaskInput.value = '';
            saveState();
            
            // Añadir efecto de aparición
            li.style.opacity = '0';
            li.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
                li.style.transition = 'all 0.3s ease';
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
            });
        }
    };

    // Event listeners para los botones existentes
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        const li = target.closest('li');

        if (!li) return;

        if (target.closest('.complete-btn')) {
            toggleComplete(li);
        } else if (target.closest('.delete-btn')) {
            deleteTask(li);
        }
    });

    // Event listeners para añadir tareas
    addTaskBtn.addEventListener('click', addNewTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });

    // Guardar estado en localStorage
    const saveState = () => {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            tasks.push({
                number: li.querySelector('.task-number').textContent,
                text: li.querySelector('.task').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Cargar estado desde localStorage
    const loadState = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            todoList.innerHTML = '';
            tasks.forEach((task, index) => {
                const number = (index + 1).toString().padStart(2, '0');
                const li = createTaskElement(task.text, number);
                if (task.completed) {
                    li.classList.add('completed');
                }
                todoList.appendChild(li);
            });
        }
    };

    // Agregar estilos CSS para la animación de eliminación
    const style = document.createElement('style');
    style.textContent = `
        #todo-list li {
            opacity: 1;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        #todo-list li.fade-out {
            opacity: 0;
            transform: translateX(-100%);
        }
    `;
    document.head.appendChild(style);

    // Cargar estado inicial
    loadState();
});

// Selección de elementos para los dos juegos
const btnGoT = document.getElementById('btn-got');
const btnGTA = document.getElementById('btn-gta');
const containerGoT = document.getElementById('container-got');
const containerGTA = document.getElementById('container-gta');
const titleGoT = document.getElementById('title-got');
const titleGTA = document.getElementById('title-gta');
const todoListGoT = document.getElementById('todo-list-got');
const todoListGTA = document.getElementById('todo-list-gta');
const newTaskInputGoT = document.getElementById('new-task-got');
const newTaskInputGTA = document.getElementById('new-task-gta');
const addTaskBtns = document.querySelectorAll('.add-task-btn');

// Función para alternar entre listas
function showList(list) {
    if (list === 'got') {
        containerGoT.style.display = '';
        containerGTA.style.display = 'none';
        titleGoT.style.display = '';
        titleGTA.style.display = 'none';
        btnGoT.classList.add('active');
        btnGTA.classList.remove('active');
    } else {
        containerGoT.style.display = 'none';
        containerGTA.style.display = '';
        titleGoT.style.display = 'none';
        titleGTA.style.display = '';
        btnGoT.classList.remove('active');
        btnGTA.classList.add('active');
    }
}

btnGoT.addEventListener('click', () => showList('got'));
btnGTA.addEventListener('click', () => showList('gta'));

// Funciones reutilizables para ambas listas
function getNextTaskNumber(listElement) {
    const tasks = listElement.querySelectorAll('.task-item');
    return (tasks.length + 1).toString().padStart(2, '0');
}

function updateTaskNumbers(listElement) {
    const tasks = listElement.querySelectorAll('.task-item');
    tasks.forEach((task, index) => {
        const number = (index + 1).toString().padStart(2, '0');
        task.querySelector('.task-number').textContent = number;
    });
}

function toggleComplete(li, saveFn) {
    li.classList.toggle('completed');
    saveFn();
}

function deleteTask(li, listElement, saveFn) {
    li.classList.add('fade-out');
    setTimeout(() => {
        li.remove();
        updateTaskNumbers(listElement);
        saveFn();
    }, 300);
}

function createTaskElement(taskText, taskNumber) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span class="task-number">${taskNumber}</span>
        <span class="task">${taskText}</span>
        <div class="actions">
            <button class="complete-btn" aria-label="Marcar como completada">
                <i class="fas fa-check"></i>
            </button>
            <button class="delete-btn" aria-label="Eliminar tarea">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    return li;
}

function addNewTask(listElement, inputElement, saveFn) {
    const taskText = inputElement.value.trim();
    if (taskText) {
        const taskNumber = getNextTaskNumber(listElement);
        const li = createTaskElement(taskText, taskNumber);
        listElement.appendChild(li);
        inputElement.value = '';
        saveFn();
        // Efecto de aparición
        li.style.opacity = '0';
        li.style.transform = 'translateY(10px)';
        requestAnimationFrame(() => {
            li.style.transition = 'all 0.3s ease';
            li.style.opacity = '1';
            li.style.transform = 'translateY(0)';
        });
    }
}

// Guardar y cargar estado para cada lista
function saveStateGoT() {
    const tasks = [];
    todoListGoT.querySelectorAll('li').forEach(li => {
        tasks.push({
            number: li.querySelector('.task-number').textContent,
            text: li.querySelector('.task').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks_got', JSON.stringify(tasks));
}

function saveStateGTA() {
    const tasks = [];
    todoListGTA.querySelectorAll('li').forEach(li => {
        tasks.push({
            number: li.querySelector('.task-number').textContent,
            text: li.querySelector('.task').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks_gta', JSON.stringify(tasks));
}

function loadStateGoT() {
    const tasks = JSON.parse(localStorage.getItem('tasks_got'));
    if (tasks) {
        todoListGoT.innerHTML = '';
        tasks.forEach((task, index) => {
            const number = (index + 1).toString().padStart(2, '0');
            const li = createTaskElement(task.text, number);
            if (task.completed) {
                li.classList.add('completed');
            }
            todoListGoT.appendChild(li);
        });
    }
}

function loadStateGTA() {
    const tasks = JSON.parse(localStorage.getItem('tasks_gta'));
    if (tasks) {
        todoListGTA.innerHTML = '';
        tasks.forEach((task, index) => {
            const number = (index + 1).toString().padStart(2, '0');
            const li = createTaskElement(task.text, number);
            if (task.completed) {
                li.classList.add('completed');
            }
            todoListGTA.appendChild(li);
        });
    }
}

// Listeners para GoT
if (todoListGoT) {
    todoListGoT.addEventListener('click', (e) => {
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;
        if (target.closest('.complete-btn')) {
            toggleComplete(li, saveStateGoT);
        } else if (target.closest('.delete-btn')) {
            deleteTask(li, todoListGoT, saveStateGoT);
        }
    });
}
if (newTaskInputGoT) {
    newTaskInputGoT.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNewTask(todoListGoT, newTaskInputGoT, saveStateGoT);
        }
    });
    newTaskInputGoT.nextElementSibling.addEventListener('click', () => {
        addNewTask(todoListGoT, newTaskInputGoT, saveStateGoT);
    });
}

// Listeners para GTA
if (todoListGTA) {
    todoListGTA.addEventListener('click', (e) => {
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;
        if (target.closest('.complete-btn')) {
            toggleComplete(li, saveStateGTA);
        } else if (target.closest('.delete-btn')) {
            deleteTask(li, todoListGTA, saveStateGTA);
        }
    });
}
if (newTaskInputGTA) {
    newTaskInputGTA.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNewTask(todoListGTA, newTaskInputGTA, saveStateGTA);
        }
    });
    newTaskInputGTA.nextElementSibling.addEventListener('click', () => {
        addNewTask(todoListGTA, newTaskInputGTA, saveStateGTA);
    });
}

// Animación de eliminación (igual que antes)
const style = document.createElement('style');
style.textContent = `
    #todo-list-got li, #todo-list-gta li {
        opacity: 1;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    #todo-list-got li.fade-out, #todo-list-gta li.fade-out {
        opacity: 0;
        transform: translateX(-100%);
    }
`;
document.head.appendChild(style);

// Cargar estado inicial
loadStateGoT();
loadStateGTA();
// Mostrar por defecto la lista GoT
showList('got'); 