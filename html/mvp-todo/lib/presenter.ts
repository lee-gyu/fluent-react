import { TodoModel } from "./model";
import { TodoView } from "./view";

export class TodoPresenter {
    constructor(
        private model: TodoModel,
        private view: TodoView,
    ) {
        this.view.bindAddTodo(this.handleAddTodo.bind(this));
        this.view.bindToggleTodo(this.handleToggleTodo.bind(this));
        this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this));
        this.updateView();
    }

    private handleAddTodo(text: string): void {
        this.model.addTodo(text);
        this.updateView();
    }

    private handleToggleTodo(id: number): void {
        this.model.toggleTodo(id);
        this.updateView();
    }

    private handleDeleteTodo(id: number): void {
        this.model.deleteTodo(id);
        this.updateView();
    }

    private updateView(): void {
        this.view.displayTodos(this.model.getTodos());
    }
}
