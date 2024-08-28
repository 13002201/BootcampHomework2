import './style.css'

interface Task{
  id: number;
  name: string;
  completed: boolean
}

let todoList: Task[] = [];

const todoForm = document.querySelector<HTMLFormElement>('#todo-form');
const todoInput = document.querySelector<HTMLInputElement>('#new-task');
const todoUlist =  document.querySelector<HTMLUListElement>('#todo-list');

function renderTasks(){
  if(todoUlist){
    todoUlist.innerHTML = ``;

    todoList.forEach((task:Task) => {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.dataset.id = task.id.toString();
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', ()=> toggleTaskCompleted(task.id));
      li.appendChild(checkbox);

      const span = document.createElement('span');
      span.textContent = task.name;
      if(task.completed){
        span.style.textDecoration = 'line-trough';
      }
      li.appendChild(span)

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(task.id));
      li.appendChild(deleteButton);

      todoUlist.appendChild(li);
    })
  }
}

function addTodoItem(text: string){
  const newTask:Task = {
    id: Date.now(),
    name: text,
    completed: false
  }
  todoList.push(newTask);
  renderTasks()
}

function deleteTask(id: number){
  todoList = todoList.filter(task => task.id !== id);
  renderTasks();
}

function toggleTaskCompleted(id:number) {
  const task = todoList.find(taks => taks.id === id);
  if(!!task){
    task.completed = !task.completed;
    renderTasks()
  }
}

if(todoForm){
  todoForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    if(todoInput && todoInput.value.trim()){
      addTodoItem(todoInput.value.trim());
      todoInput.value = '';
    }
  })
}

renderTasks();