document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks'))||[]; // get access of the local storage and get the tasks and if there is nothing in the local storage return a empty array

    tasks.forEach(task => {
        renderTask(task)
    });
    addTaskButton.addEventListener("click", () => {
      const taskTest = todoInput.value.trim();
      if (taskTest === "") return;

      const newTask = {
        id: Date.now(),
        text: taskTest,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks();
      renderTask(newTask)
      todoInput.value = ""; // clear input
      console.log(tasks);
    });

    function renderTask(task) {
    //   console.log(task.text);
    const li = document.createElement('li')
    li.setAttribute('data-id',task.id)
    if(task.completed) li.classList.add("completed")
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>`

// When a click happens, the browser automatically creates an object containing information about that event and passes it to the callback function.
    li.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks()
    })

    li.querySelector('button').addEventListener('click',(e)=>{
      e.stopPropagation(); //“Stop this event from moving (bubbling) to parent elements.”
      tasks = tasks.filter((t) => t.id !== task.id); // if i used === then the task i clicked will remain and others will get removed
      //Keep every task whose id is NOT equal to clicked task id
      //   t is each individual element of the array during iteration.
      li.remove();
      saveTasks();
    })
    
    todoList.appendChild(li)
    }

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})