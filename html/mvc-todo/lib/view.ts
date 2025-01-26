import { Todo } from "./model";

export class TodoView {
    constructor(private root: HTMLElement) {}

    render(todos: Todo[]): void {
        this.root.innerHTML = `
            <div class="todo-app">
                <input type="text" id="todoInput" placeholder="Add new todo">
                <button id="addTodo">Add</button>
                <ul id="todoList">
                    ${todos
                        .map(
                            (todo) => `
                        <li class="${todo.completed ? "completed" : ""}" data-id="${todo.id}">
                            <span>${todo.text}</span>
                            <button class="toggle">Toggle</button>
                            <button class="delete">Delete</button>
                        </li>
                    `,
                        )
                        .join("")}
                </ul>
            </div>
        `;
    }

    bindAddTodo(handler: (text: string) => void): void {
        const input = this.root.querySelector("#todoInput") as HTMLInputElement;
        const button = this.root.querySelector("#addTodo") as HTMLButtonElement;

        button.addEventListener("click", () => {
            const text = input.value.trim();
            if (text) {
                handler(text);
                input.value = "";
            }
        });
    }

    bindToggleTodo(handler: (id: number) => void): void {
        this.root.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).className === "toggle") {
                const id = Number(
                    ((e.target as HTMLElement).parentElement as HTMLElement)
                        .dataset.id,
                );
                handler(id);
            }
        });
    }

    bindDeleteTodo(handler: (id: number) => void): void {
        this.root.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).className === "delete") {
                const id = Number(
                    ((e.target as HTMLElement).parentElement as HTMLElement)
                        .dataset.id,
                );
                handler(id);
            }
        });
    }
}
