import { TodoModel } from "./lib/model";
import { TodoViewImpl } from "./lib/view";
import { TodoPresenter } from "./lib/presenter";

document.addEventListener("DOMContentLoaded", () => {
    const model = new TodoModel();
    const view = new TodoViewImpl();
    const presenter = new TodoPresenter(model, view);
});
