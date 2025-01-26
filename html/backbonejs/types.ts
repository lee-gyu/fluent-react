interface ITodo {
    title: string;
    completed: boolean;
}

interface ITodoModel extends Backbone.Model<ITodo> {
    toggle(): void;
}

interface ITodoCollection extends Backbone.Collection<ITodoModel> {
    completed(): ITodoModel[];
    remaining(): ITodoModel[];
}
