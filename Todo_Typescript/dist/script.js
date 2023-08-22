"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const todos = [];
const addButton = document.getElementById("add-button");
const newTodoInput = document.getElementById("new-todo"); // Use type assertion
const todoList = document.getElementById("todo-list");
addButton.addEventListener("click", () => {
    const newTodoText = newTodoInput.value.trim();
    createTodo(newTodoText);
});
displayTodos();
function createTodo(newTodoText) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://todo-typescript-ddgu.onrender.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTodoText, status: false }),
            });
            const createdTodo = yield response.json();
            newTodoInput.value = "";
            displayTodos();
        }
        catch (error) {
            console.error("Error creating todo:", error);
        }
    });
}
function displayTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://todo-typescript-ddgu.onrender.com/todos");
            const fetchedTodos = yield response.json();
            //todoList.innerHTML = "";
            fetchedTodos.forEach((todo, index) => {
                const todoItem = document.createElement("div");
                todoItem.setAttribute("class", "flex justify-around p-3 border-3 mt-2 align-middle rounded-lg bg-gray-900 border-1 transition duration-300 text-white");
                todoItem.innerHTML = `
            <input class="w-6 text-black" type="checkbox" id="checkbox-${index}" ${todo.status ? "checked" : ""}>
            <p class="text-gray-100 decoration-dashed font-semibold w-2/3 text-wrap text-lg text-justify font-serif  break-all  p-2 ${(todo === null || todo === void 0 ? void 0 : todo.status) ? 'line-through text-gray-200' : 'normal'}" for="checkbox-${index}">${todo.title}</p>
            <p class="tracking-wide text-center rounded-lg  flex justify-center align-middle cursor-pointer text-white font-semibold w-28 h-10 my-auto py-1 text-lg ${!(todo === null || todo === void 0 ? void 0 : todo.status) ? "bg-yellow-500 w-24 " : "bg-green-500 p-3"}">${todo.status ? 'Completed' : 'Pending'}</p>
            <button class="tracking-wide text-center  flex justify-center align-middle cursor-pointer  w-12 h-10 my-auto py-1 text-lg bg-cyan-500 px-3 font-semibold rounded-lg text-md text-white min-w-max" id="edit-button-${index}" class="edit-button">Edit</button>
            <button id="save-button-${index}" class="save-button" style="display: none;">Save</button>
            <button class="tracking-wide text-center  flex justify-center align-middle cursor-pointer  w-16 h-10 my-auto py-1 text-lg bg-red-500 px-3 font-semibold rounded-lg text-md text-white min-w-max" id="delete-button-${index}" class="delete-button">Delete</button>
          `;
                todoList.appendChild(todoItem);
                const checkbox = todoItem.querySelector(`#checkbox-${index}`);
                checkbox.addEventListener("change", () => __awaiter(this, void 0, void 0, function* () {
                    const updatedStatus = checkbox.checked;
                    yield updateTodoStatus(todo.id, updatedStatus);
                }));
                const editButton = todoItem.querySelector(`#edit-button-${index}`);
                editButton.addEventListener("click", () => {
                    editTodoTitle(todoItem, todo.title, todo.id); // Call function to enable editing
                });
                const deleteButton = todoItem.querySelector(`#delete-button-${index}`);
                deleteButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    yield deleteTodo(todo.id);
                    todoList.removeChild(todoItem); // Remove the deleted todo item from UI
                }));
            });
        }
        catch (error) {
            console.error("Error fetching todos:", error);
        }
    });
}
function deleteTodo(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch(`https://todo-typescript-ddgu.onrender.com/todos/${todoId}`, {
                method: "DELETE",
            });
            // Update UI or refresh todos list
            displayTodos();
        }
        catch (error) {
            console.error("Error deleting todo:", error);
        }
    });
}
function updateTodoStatus(todoId, newStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://todo-typescript-ddgu.onrender.com/todos/${todoId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                console.log("Todo status updated successfully");
            }
            else {
                console.error("Error updating todo status:", response.status);
            }
        }
        catch (error) {
            console.error("Error updating todo:", error);
        }
    });
}
// function editTodoTitle(todoItem: HTMLLIElement, currentTitle: string, todoId: Number) {
//     const label = todoItem.querySelector("label");
//     if (label) {
//         const editInput = document.createElement("input");
//         editInput.type = "text";
//         editInput.value = currentTitle;
//         label.style.display = "none";
//         todoItem.insertBefore(editInput, label);
//         editInput.addEventListener("keydown", async (event) => {
//             if (event.key === "Enter") {
//                 const updatedTitle = editInput.value.trim();
//                 if (updatedTitle !== "") {
//                     await updateTodoTitle(todoId, updatedTitle);
//                     label.textContent = updatedTitle;
//                     label.style.display = "inline";
//                     todoItem.removeChild(editInput);
//                 }
//             }
//         });
//     }
// }
// ... Your existing code ...
function editTodoTitle(todoItem, currentTitle, todoId) {
    const label = todoItem.querySelector("label");
    const editButton = todoItem.querySelector(".edit-button");
    const saveButton = todoItem.querySelector(".save-button");
    if (label && editButton && saveButton) {
        label.style.display = "none";
        editButton.style.display = "none"; // Hide the edit button
        saveButton.style.display = "inline"; // Show the save button
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = currentTitle;
        todoItem.insertBefore(editInput, label);
        saveButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const updatedTitle = editInput.value.trim();
            if (updatedTitle !== "") {
                yield updateTodoTitle(todoId, updatedTitle);
                label.textContent = updatedTitle;
                label.style.display = "inline";
                editButton.style.display = "inline"; // Show the edit button again
                saveButton.style.display = "none"; // Hide the save button
                todoItem.removeChild(editInput);
            }
        }));
    }
}
// ... Rest of your code ...
function updateTodoTitle(todoId, newTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://todo-typescript-ddgu.onrender.com/todos/${todoId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle }),
            });
            if (response.ok) {
                console.log("Todo title updated successfully");
            }
            else {
                console.error("Error updating todo title:", response.status);
            }
        }
        catch (error) {
            console.error("Error updating todo:", error);
        }
    });
}
