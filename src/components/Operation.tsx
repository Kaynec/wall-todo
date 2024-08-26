import { ModalType, TodoType, ModalTypeEnum } from "../types";

export default function Opeartion({
  type,
  todo: previousTodo,
  toggleModal,
  setTodos,
}: {
  type: ModalType;
  todo: TodoType;
  toggleModal: (type: ModalType) => void;
  setTodos: (todos: (oldTodos: TodoType[]) => TodoType[]) => void;
}) {
  function validateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as unknown as Record<string, HTMLInputElement>;
    const name = target.name.value;
    const deadline = target.deadline.value;
    if (!name || !deadline) {
      return;
    }

    const todo = {
      name,
      deadline: new Date(deadline).toString(),
      time: new Date().toString(),
    } as TodoType;

    // Generate id Or Use Old id
    if (type === ModalTypeEnum.EDIT) {
      todo.id = previousTodo.id;
    } else {
      todo.id = new Date().toString + (Math.random() * 10000000).toString();
    }

    if (type === ModalTypeEnum.ADD) {
      setTodos((todos: TodoType[]) => [...todos, todo]);
    }

    setTodos((todos: TodoType[]) => {
      const oldTodos = [...todos];
      const indx = todos.findIndex((el) => el.id === previousTodo.id);
      console.log(indx);
      if (indx > -1) {
        oldTodos[indx] = todo;
      }
      return oldTodos;
    });
    toggleModal(ModalTypeEnum.DEFAULT);
  }

  function deleteTodo(id: string) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    toggleModal(ModalTypeEnum.DEFAULT);
  }

  if (type === ModalTypeEnum.DELETE) {
    return (
      <div>
        <p> Are You Sure You Want To Delete This Todo?</p>
        <div className="equal__btns">
          <button className="btn" onClick={() => deleteTodo(previousTodo.id)}>
            Yes
          </button>
          <button
            onClick={() => toggleModal(ModalTypeEnum.DEFAULT)}
            className="btn"
          >
            no
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <form onSubmit={validateTodo} className="add__todo">
        <div>
          <label htmlFor="name">name : </label>
          <input
            defaultValue={previousTodo.name}
            required
            type="text"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="deadline">deadline : </label>
          <input
            required
            defaultValue={
              previousTodo.deadline
                ? new Date(previousTodo.deadline).toISOString().split("T")[0]
                : ""
            }
            type="date"
            id="deadline"
            min={new Date().toString()}
          />
        </div>
        <div className="equal__btns">
          <button className="btn">
            {type === ModalTypeEnum.ADD ? "Add" : "Edit"}
          </button>
          <button
            className="btn"
            onClick={() =>
              toggleModal(
                type === ModalTypeEnum.ADD
                  ? ModalTypeEnum.ADD
                  : ModalTypeEnum.EDIT
              )
            }
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
