import TodoCollection from "./collection";
import TodoModel from "./model";

class TodoView extends Backbone.View<TodoModel> {
    template = _.template($("#item-template").html());
    events = {
        "click .toggle": "toggleComplete",
        "dblclick label": "edit",
        "click .destroy": "clear",
        "keypress .edit": "updateOnEnter",
        "blur .edit": "close",
    };

    initialize() {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "destroy", this.remove);
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass("completed", this.model.get("completed"));
        return this;
    }

    toggleComplete() {
        this.model.toggle();
    }

    edit() {
        this.$el.addClass("editing");
        this.$(".edit").focus();
    }

    close() {
        const value = this.$(".edit").val().trim();
        if (value) {
            this.model.save({ title: value });
        }
        this.$el.removeClass("editing");
    }

    updateOnEnter(e: JQuery.KeyPressEvent) {
        if (e.which === 13) this.close();
    }

    clear() {
        this.model.destroy();
    }
}

class AppView extends Backbone.View<TodoModel> {
    todos: TodoCollection;

    constructor(options?: Backbone.ViewOptions<TodoModel>) {
        super(options);
        this.todos = new TodoCollection();
    }

    events = {
        "keypress #new-todo": "createOnEnter",
        "click #clear-completed": "clearCompleted",
    };

    initialize() {
        this.listenTo(this.todos, "add", this.addOne);
        this.listenTo(this.todos, "reset", this.addAll);
        this.todos.fetch({ reset: true });
    }

    addOne(todo: TodoModel) {
        const view = new TodoView({ model: todo });
        $("#todo-list").append(view.render().el);
    }

    addAll() {
        $("#todo-list").html("");
        this.todos.each(this.addOne, this);
    }

    createOnEnter(e: JQuery.KeyPressEvent) {
        if (e.which !== 13 || !$("#new-todo").val().trim()) return;
        this.todos.create({ title: $("#new-todo").val().trim() });
        $("#new-todo").val("");
    }

    clearCompleted() {
        _.invoke(this.todos.completed(), "destroy");
    }
}

export { AppView, TodoView };
