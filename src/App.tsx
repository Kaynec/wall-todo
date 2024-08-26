// This Package Is The Main Root of My Project

import { useState } from "react";
import { ModalType, ModalTypeEnum, TodoType } from "./types";
import Modal from "./components/Modal";
import Todos from "./components/Todos";
import Opeartion from "./components/Operation";
import { useModal, useTodos } from "./hooks";

function App() {
  const [todos, setTodos] = useTodos();

  const [todo, setTodo] = useState<TodoType>(todos[0]);

  const [type, setType] = useState<ModalType>(ModalTypeEnum.DEFAULT);
  const [modal, toggleModal] = useModal();

  function setModalType(type: ModalType = ModalTypeEnum.DEFAULT) {
    if (type === ModalTypeEnum.ADD) {
      // new todo means reset the todo state
      setTodo({
        deadline: "",
        id: "",
        name: "",
        time: "",
      });
    }
    toggleModal();
    setType(type);
  }

  return (
    <>
      <main className="content__wrapper">
        <Modal modal={modal} toggleModal={setModalType}>
          <Opeartion
            setTodos={setTodos}
            toggleModal={setModalType}
            type={type}
            todo={todo}
          />
        </Modal>

        <div className="add__todo">
          <div className="add__todo__content">
            <button
              className="btn"
              style={{
                width: "100%",
              }}
              onClick={() => setModalType(ModalTypeEnum.ADD)}
            >
              Add Todo
            </button>
          </div>
        </div>

        <Todos todos={todos} toggleModal={setModalType} setTodo={setTodo} />
      </main>
    </>
  );
}

export default App;
