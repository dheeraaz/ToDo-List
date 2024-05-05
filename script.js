"use strict";

// start: adding todo lists

const searchContainer = document.querySelector(".search_container");
const searchBox = document.getElementById("search_box");
const addBtn = document.getElementById("add_btn");
const todoLists = document.querySelector(".todo_lists");
const errorBox = document.getElementById("error_box");

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

    } else {
        e.target.classList.remove("fa-solid", "fa-square-check");
        e.target.classList.add("fa-regular", "fa-square");

        e.target.nextSibling.style.textDecoration = "none";
    }

}

todoLists.addEventListener("click", (e) => {

    if (e.target.classList.contains("first")) {
        toggleTodo(e);
        saveItems(); //saves todo item to localStorage;

    }

    if (e.target.classList.contains("last")) {
        e.target.parentNode.remove();
        saveItems(); //saves todo item to localStorage;
    }

    if (e.target.classList.contains("second")) {
        searchBox.value = e.target.previousSibling.textContent;
        e.target.parentNode.remove();
        searchBox.focus();
        saveItems(); //saves todo item to localStorage;


    }

})
// end: todo item completed 

// start: local storage related
function saveItems() {
    localStorage.setItem("data", todoLists.innerHTML);
}


function showItems() {
    todoLists.innerHTML = localStorage.getItem("data");
}

showItems();

// end: local storage related

