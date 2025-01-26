export interface TodoView {
    displayTodos(
        todos: { id: number; text: string; completed: boolean }[],
    ): void;
    bindAddTodo(handler: (text: string) => void): void;
    bindToggleTodo(handler: (id: number) => void): void;
    bindDeleteTodo(handler: (id: number) => void): void;
}

export class TodoViewImpl implements TodoView {
    private app: HTMLElement;
    private todoList: HTMLElement;
    private input: HTMLInputElement;

    constructor() {
        this.app = document.getElementById("app")!;
        this.todoList = document.createElement("ul");
        this.input = document.createElement("input");
        this.setupUI();
    }

    private setupUI(): void {
        const form = document.createElement("form");
        this.input.type = "text";
        this.input.placeholder = "Add new todo";

        form.appendChild(this.input);
        this.app.appendChild(form);
        this.app.appendChild(this.todoList);
    }

    displayTodos(
        todos: { id: number; text: string; completed: boolean }[],
    ): void {
        this.todoList.innerHTML = "";
        todos.forEach((todo) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${todo.id}">
                <span>${todo.text}</span>
                <button data-id="${todo.id}">Delete</button>
            `;
            this.todoList.appendChild(li);
        });
    }

    bindAddTodo(handler: (text: string) => void): void {
        this.input.parentElement?.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.input.value) {
                handler(this.input.value);
                this.input.value = "";
            }
        });
    }

    bindToggleTodo(handler: (id: number) => void): void {
        this.todoList.addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;
            if (target.type === "checkbox") {
                handler(Number(target.dataset.id));
            }
        });
    }

    bindDeleteTodo(handler: (id: number) => void): void {
        this.todoList.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "BUTTON") {
                handler(Number(target.dataset.id));
            }
        });
    }
}
