import { TodoModel } from "./model";
import { TodoView } from "./view";

export class TodoController {
    constructor(
        private model: TodoModel,
        private view: TodoView,
    ) {
        this.view.bindAddTodo(this.handleAddTodo.bind(this));
        this.view.bindToggleTodo(this.handleToggleTodo.bind(this));
        this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this));
        this.onTodoListChanged();
    }

    private handleAddTodo(text: string): void {
        this.model.addTodo(text);
        this.onTodoListChanged();
    }

    private handleToggleTodo(id: number): void {
        this.model.toggleTodo(id);
        this.onTodoListChanged();
    }

    private handleDeleteTodo(id: number): void {
        this.model.deleteTodo(id);
        this.onTodoListChanged();
    }

    private onTodoListChanged(): void {
        this.view.render(this.model.getTodos());
    }
}
