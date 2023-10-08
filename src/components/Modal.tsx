import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../customhook/useModal";

function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: Boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsTransitioning(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsTransitioning(true);
    }
  }, [isOpen]);

  if (!isOpen && !isTransitioning) return null;

  return ReactDOM.createPortal(
    <>
      <ModalContext.Provider value={{ isOpen, onClose }}>
        <div
          id="overlay"
          className="fixed inset-0 bg-black opacity-60 z-[999]"
          onClick={onClose}
        />
        <div
          id="modal-container"
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] ${
            isOpen
              ? "transition-opacity duration-300 ease-in-out opacity-100"
              : "transition-opacity duration-300 ease-in-out opacity-0"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          {children}
        </div>
      </ModalContext.Provider>
    </>,
    document.getElementById("modal")!
  );
}

export default Modal;
