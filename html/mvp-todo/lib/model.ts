interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

export class TodoModel {
    private todos: TodoItem[] = [];
    private currentId = 1;

    addTodo(text: string): void {
        this.todos.push({
            id: this.currentId++,
            text,
            completed: false,
        });
    }

    getTodos(): TodoItem[] {
        return [...this.todos];
    }

    toggleTodo(id: number): void {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    deleteTodo(id: number): void {
        this.todos = this.todos.filter((t) => t.id !== id);
    }
}
