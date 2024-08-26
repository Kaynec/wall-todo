import { PropsWithChildren, useRef } from "react";
import { useOnClickOutside } from "../hooks";

export default function Modal({
  children,
  modal,
  toggleModal,
}: PropsWithChildren & {
  modal: boolean;
  toggleModal: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    toggleModal();
  };

  useOnClickOutside(modalRef, handleClickOutside);

  return (
    <>
      {modal && (
        <div className="modal">
          <div ref={modalRef} className="modal__content">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
