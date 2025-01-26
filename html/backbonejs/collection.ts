import { ITodoCollection } from "./types";
import TodoModel from "./model";

class TodoCollection
    extends Backbone.Collection<TodoModel>
    implements ITodoCollection
{
    model = TodoModel;
    localStorage = new Backbone.LocalStorage("todos-typescript");

    completed(): TodoModel[] {
        return this.filter((todo) => todo.get("completed"));
    }

    remaining(): TodoModel[] {
        return this.filter((todo) => !todo.get("completed"));
    }
}

export default TodoCollection;
