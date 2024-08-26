import { TodoType } from "../types";

// no need the handle any edge cases since we don't care about anything smaller than day differences
export function generateTodoClass(todo: TodoType) {
  const date = new Date();
  const deadline = new Date(todo.deadline);
  if (
    date.getFullYear() === deadline.getFullYear() &&
    date.getMonth() === deadline.getMonth() &&
    date.getDay() === deadline.getDay()
  ) {
    return "todo active";
  }
  return "todo";
}
