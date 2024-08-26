import { ModalTypeEnum, type ModalType, type TodoType } from "../types";
import { generateTodoClass } from "../utils";

export default function Todo({
  todo,
  toggleModal,
  setTodo,
}: {
  todo: TodoType;
  toggleModal: (type?: ModalType) => void;
  setTodo: (todo: TodoType) => void;
}) {
  function handleClick(type: ModalTypeEnum) {
    setTodo(todo);
    toggleModal(type);
  }

  return (
    <div className={generateTodoClass(todo)}>
      <div className="todo__content">
        <div>Name : {todo.name}</div>
        <div>Deadline : {new Date(todo.deadline).toLocaleDateString()}</div>
        <div>Creation Date : {new Date(todo.time).toLocaleDateString()}</div>
        <div className="todo__btns">
          <button
            onClick={() => handleClick(ModalTypeEnum.EDIT)}
            className="btn"
          >
            Edit
          </button>
          <button
            onClick={() => handleClick(ModalTypeEnum.DELETE)}
            className="btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
