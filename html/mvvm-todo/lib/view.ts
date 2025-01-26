import { TodoViewModel } from "./view-model";
import { TodoItem } from "./model";

export class TodoView {
    private input: HTMLInputElement;
    private list: HTMLUListElement;

    constructor(private viewModel: TodoViewModel) {
        this.input = document.querySelector("#todo-input")!;
        this.list = document.querySelector("#todo-list")!;
        this.bindEvents();
        this.render();
    }

    private bindEvents(): void {
        this.input.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && this.input.value.trim()) {
                this.viewModel.addTodo(this.input.value.trim());
                this.input.value = "";
            }
        });

        this.viewModel.subscribe(() => this.render());
    }

    private render(): void {
        this.list.innerHTML = "";
        this.viewModel.getTodos().forEach((todo) => {
            const li = this.createTodoElement(todo);
            this.list.appendChild(li);
        });
    }

    private createTodoElement(todo: TodoItem): HTMLLIElement {
        const li = document.createElement("li");
        li.className = todo.completed ? "completed" : "";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () =>
            this.viewModel.toggleTodo(todo.id),
        );

        const span = document.createElement("span");
        span.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () =>
            this.viewModel.deleteTodo(todo.id),
        );

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }
}
