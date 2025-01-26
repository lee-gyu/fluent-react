import { TodoViewModel } from "./lib/view-model";
import { TodoView } from "./lib/view";

const viewModel = new TodoViewModel();
const view = new TodoView(viewModel);
