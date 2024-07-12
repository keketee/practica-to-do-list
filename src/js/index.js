// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';



const form = document.getElementById('form');
const tasksContainer = document.getElementById('tasks');
const itemsLeft = document.getElementById('items-left');
const filters = document.getElementById('filters').querySelectorAll('.filter');
const deleteCompletedBtn = document.getElementById('delete-completed');


let itemsLeftCount = 0;


function updateItemsLeft() {
  itemsLeftCount = document.querySelectorAll('.task-container').length;
  itemsLeft.textContent = `${itemsLeftCount} items left`;
}


form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  
  const taskInput = document.getElementById('input-task');
  const taskText = taskInput.value.trim();

  
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = ''; 
  }
});


function addTask(taskText) {
  
  const taskContainer = document.createElement('div');
  taskContainer.className = 'task-container';

  const taskCheck = document.createElement('input');
  taskCheck.className = 'task-check';
  taskCheck.type = 'checkbox';
  taskCheck.id = Date.now().toString(); 

  const taskLabel = document.createElement('label');
  taskLabel.className = 'task-text';
  taskLabel.htmlFor = taskCheck.id;
  taskLabel.textContent = taskText;

  const taskDelete = document.createElement('img');
  taskDelete.className = 'task-delete';
  taskDelete.src = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='18'%20height='18'%3e%3cpath%20fill='%23494C6B'%20fill-rule='evenodd'%20d='M16.97%200l.708.707L9.546%208.84l8.132%208.132-.707.707-8.132-8.132-8.132%208.132L0%2016.97l8.132-8.132L0%20.707.707%200%208.84%208.132%2016.971%200z'/%3e%3c/svg%3e";

  
  taskContainer.appendChild(taskCheck);
  taskContainer.appendChild(taskLabel);
  taskContainer.appendChild(taskDelete);

  
  tasksContainer.appendChild(taskContainer);

 
  updateItemsLeft();

  
  taskDelete.addEventListener('click', function() {
    tasksContainer.removeChild(taskContainer);
    updateItemsLeft();
  });
}


filters.forEach(filter => {
  filter.addEventListener('click', function() {
    const filterValue = this.getAttribute('data-filter');
    filterTasks(filterValue);
  });
});


function filterTasks(filter) {
 
  const taskContainers = document.querySelectorAll('.task-container');

  
  taskContainers.forEach(taskContainer => {
    switch (filter) {
      case 'all':
        taskContainer.style.display = 'flex';
        break;
      case 'active':
        taskContainer.querySelector('.task-check').checked ? taskContainer.style.display = 'none' : taskContainer.style.display = 'flex';
        break;
      case 'completed':
        taskContainer.querySelector('.task-check').checked ? taskContainer.style.display = 'flex' : taskContainer.style.display = 'none';
        break;
    }
  });

  
  updateItemsLeft();
}


deleteCompletedBtn.addEventListener('click', function() {
  const completedTasks = document.querySelectorAll('.task-container .task-check:checked');
  completedTasks.forEach(taskCheck => {
    const taskContainer = taskCheck.parentNode;
    tasksContainer.removeChild(taskContainer);
  });

  
  updateItemsLeft();
});


updateItemsLeft();

