"use strict";

// start: adding todo lists

const searchContainer = document.querySelector(".search_container");
const searchBox = document.getElementById("search_box");
const addBtn = document.getElementById("add_btn");
const todoLists = document.querySelector(".todo_lists");
const errorBox = document.getElementById("error_box");
const taskCount = document.getElementById("task_count");

let countItem = 0;
taskCount.innerText = countItem;


function updateCount(){
    taskCount.innerText = countItem;
}

function showErrorMessage() {
    errorBox.style.display = "block";

    setTimeout(() => {
        errorBox.style.display = "none";
    }, 2000);
}

function addTodoItem() {
    let todoInput = searchBox.value;

    if (todoInput.trim() === "") {
        showErrorMessage();
    } else {
        const todoItem = `<i class="fa-regular fa-square first"></i>` +
            `<p>${todoInput}</p>` + `<i class="fa-solid fa-pen-to-square second"></i>` +
            `<i class="fa-solid fa-xmark last"></i>`;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.innerHTML = todoItem;

        todoLists.appendChild(itemDiv);
        searchBox.value = "";
        
        ++countItem;
        updateCount();

        saveItems(); //saves todo item to localStorage;

    }
}

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTodoItem();
    }
})
addBtn.addEventListener("click", () => {
    addTodoItem();
})

// End: adding todo lists


// start: todo item completed 

function toggleTodo(e) {

    if (e.target.classList.contains("fa-square")) {
        e.target.classList.remove("fa-regular", "fa-square");
        e.target.classList.add("fa-solid", "fa-square-check");

        e.target.nextSibling.style.textDecoration = "line-through";
        e.target.nextSibling.style.textDecorationColor = "white";

        --countItem;
        updateCount();


    } else {
        e.target.classList.remove("fa-solid", "fa-square-check");
        e.target.classList.add("fa-regular", "fa-square");

        e.target.nextSibling.style.textDecoration = "none";

        ++countItem;
        updateCount();
    }

}

todoLists.addEventListener("click", (e) => {
    let striked_P;

    if (e.target.classList.contains("first")) {
        toggleTodo(e);
        saveItems(); //saves todo item to localStorage;
    }

    if (e.target.classList.contains("last")) {
        
        striked_P = e.target.previousElementSibling.previousElementSibling;
        
        //text strike through xaina vaney matrai count update garni, text striketrhough huda aafai count ghati sakeko hunxa
        if(striked_P.style.textDecorationColor!=="white"){ 
              --countItem;
               updateCount();
        }
        
        e.target.parentNode.remove();
        
        saveItems(); //saves todo item to localStorage;
    }

    if (e.target.classList.contains("second")) {
        searchBox.value = e.target.previousElementSibling.textContent;

        striked_P = e.target.previousElementSibling;
        if(striked_P.style.textDecorationColor!=="white"){
            --countItem;
            updateCount();
        }

        e.target.parentNode.remove();
        searchBox.focus();

        saveItems(); //saves todo item to localStorage;
    }

})
// end: todo item completed 

// start: local storage related
function saveItems() {
    localStorage.setItem("data", todoLists.innerHTML);
    localStorage.setItem("count", countItem);
}


function showItems() {
    todoLists.innerHTML = localStorage.getItem("data");

    countItem = localStorage.getItem("count");
    if(countItem!==null){
        updateCount();
    }

}

showItems();

// end: local storage related

