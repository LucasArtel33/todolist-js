import "./style.css";

const ul = document.querySelector("ul");

const form = document.querySelector("form");
const input = document.querySelector("form > input");

form.addEventListener("submit", () => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const todos = [
  {
    text: "Je suis une todo",
    done: false,
    editMode: false,
  },
];

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return editTodoElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const editTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Sauvegarder";
  buttonSave.addEventListener("click", (e) => {
    editTodo(index, input.value);
  });
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Annuler";
  buttonCancel.addEventListener("click", (e) => {
    switchEditMode(index);
  });
  li.append(input, buttonSave, buttonCancel);
  return li;
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  const buttonEdit = document.createElement("button");
  buttonDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.innerHTML = "Editer";
  buttonEdit.addEventListener("click", (e) => {
    e.stopPropagation();
    switchEditMode(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;
  li.addEventListener("click", (e) => {
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);
  return li;
};

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const switchEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  todos[index].text = input;
  switchEditMode(index);
};

displayTodo();
