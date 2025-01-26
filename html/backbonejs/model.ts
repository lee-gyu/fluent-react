import { ITodo, ITodoModel } from "./types";

class TodoModel extends Backbone.Model<ITodo> implements ITodoModel {
    defaults(): ITodo {
        return {
            title: "",
            completed: false,
        };
    }

    toggle(): void {
        this.save({ completed: !this.get("completed") });
    }
}

export default TodoModel;
