//Selectors
const todoInput= document.querySelector('.todo-input')
const todoButton= document.querySelector('.todo-button')
const todoList= document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to Local Storage
    saveLocalTodos(todoInput.value);
    //checked mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-sharp fa-solid fa-square-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to lists
    todoList.appendChild(todoDiv);
    //clear Todo input value
    todoInput.value="";
}
function deleteCheck(e){
    //to check if the console is working is working if you click any button 
    // console.log(e.target);
    const item = e.target;
    //Delete TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function(){//when transition is completed then it executes the function 
        todo.remove();
        }) 
    }
    //check mark
    if(item.classList[0] === "completed-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes;
     todos.forEach(function(todo){
      switch(e.target.value){
        case "all":
            todo.style.display= "flex";
            break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
                    case "incomplete":
                    if(!todo.classList.contains('completed')){
                     todo.style.display = "flex"; 
                    }else{
                        todo.style.display = "none";
                    }
                    break;         
        }
    })
}
//implementing local storage
function saveLocalTodos(todo){
    //first check ,"hey do i have already item saved in local storage"
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //checked mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-sharp fa-solid fa-square-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to lists
    todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf('potato'));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
        

    
  
