let ele=document.querySelector(".form .input");
let add=document.querySelector(".form .add")
let div=document.querySelector(".tasks");
let tasks;
let tasksCopy;
ele.onblur = function() {
 if(ele.value.trim()!== ''){
  let tasks = (localStorage.getItem("tasks") || "").split(",");
  tasks.push(ele.value);
  localStorage.setItem("tasks", tasks.join(","));
 }
}
if(localStorage.getItem("tasks")){
  div.style.display="block";
   tasks=localStorage.getItem("tasks").split(",");
   tasksCopy=tasks.slice(1);
  tasksCopy.forEach((ele)=>{
     div.insertAdjacentHTML("beforeend",`<div class="task">
        <h3>${ele}</h3>
      <div>
           <button class="delete">Delete</button>
             <button class="update">update</button>
      </div>
        </div>`);
})
}
add.onclick=function(){
  let val=ele.value.trim();
  if(val!==''){
    div.style.display="block";
    div.insertAdjacentHTML("beforeend",`<div class="task">
      <h3>${val}</h3>
     <div>
           <button class="delete">Delete</button>
             <button class="update">update</button>
      </div>
      </div>`);
  }
  ele.value='';
}

  div.addEventListener("click",function(e){
   if(e.target.classList.contains("delete")){
    let parent=e.target.parentElement.parentElement;
   let text=parent.querySelector("h3").textContent;
   tasks=localStorage.getItem("tasks").split(",");
   let tasksCopy=tasks.filter((ele)=>{
    return ele!=text;
   })
   localStorage.setItem("tasks", tasksCopy.join(","));
   parent.remove();
   } 
   else if(e.target.classList.contains("update")){
   let parent=e.target.parentElement.parentElement;
   let text=parent.querySelector("h3").textContent;
   let newTask = prompt("Update task:",text);
    tasks = (localStorage.getItem("tasks") || "").split(",").filter(task => task.trim() !== '');
   let tasksCopy = tasks.map(task => task === text ? newTask.trim() : task);
   localStorage.setItem("tasks", tasksCopy.join(","));
   parent.querySelector("h3").textContent=newTask;
   }
    if(div.children.length === 0)
    div.style.display="none"
  })



