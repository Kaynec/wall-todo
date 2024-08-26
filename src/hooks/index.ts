import { useState } from "react";
import { TodoType } from "../types";
import { useEffect } from "react";

export function useTodos(): [
  TodoType[],
  React.Dispatch<React.SetStateAction<TodoType[]>>
] {
  const [todos, setTodos] = useState<TodoType[]>([]);

  window.onload = () => {
    try {
      const todosString = localStorage.getItem("todos");
      if (!todosString) return;
      setTodos(JSON.parse(todosString));
    } catch (error) {
      console.warn(error);
    }
  };
  window.onbeforeunload = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return [todos, setTodos];
}

export function useModal(): [boolean, toggleModal: () => void] {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
    if (!modal) {
      return;
    }
  }

  return [modal, toggleModal];
}

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler]);
}
