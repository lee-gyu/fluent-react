import { TodoModel } from "./lib/model";
import { TodoView } from "./lib/view";
import { TodoController } from "./lib/controller";

const app = new TodoController(
    new TodoModel(),
    new TodoView(document.getElementById("root")!),
);
