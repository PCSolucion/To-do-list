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