import { PropsWithChildren } from "react";
import { ModalType, TodoType } from "../types";
import Todo from "./Todo";

export default function Todos({
  todos,
  toggleModal,
  setTodo,
}: PropsWithChildren & {
  todos: TodoType[];
  setTodo: (newTodos: TodoType) => void;
  toggleModal: (type?: ModalType) => void;
}) {
  return (
    <section className="todo__container">
      {todos.map((todo) => {
        return (
          <Todo
            setTodo={setTodo}
            key={todo.id}
            toggleModal={toggleModal}
            todo={todo}
          />
        );
      })}
    </section>
  );
}
