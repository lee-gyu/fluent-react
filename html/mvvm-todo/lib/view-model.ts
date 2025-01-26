import { TodoItem, TodoItems } from "./model";

export class TodoViewModel {
    private todos: TodoItems = [];
    private listeners: (() => void)[] = [];

    addTodo(text: string): void {
        const todo: TodoItem = {
            id: Date.now(),
            text,
            completed: false,
        };
        this.todos.push(todo);
        this.notify();
    }

    toggleTodo(id: number): void {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.notify();
        }
    }

    deleteTodo(id: number): void {
        this.todos = this.todos.filter((t) => t.id !== id);
        this.notify();
    }

    getTodos(): TodoItems {
        return [...this.todos];
    }

    subscribe(listener: () => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notify(): void {
        this.listeners.forEach((listener) => listener());
    }
}
