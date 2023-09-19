import { createContext, useContext } from "react";

interface IUseModalReturn {
  isOpen: Boolean;
  onClose: () => void;
}

export const ModalContext = createContext<IUseModalReturn | null>(null);

export const useModal = () => {
  const currentModalValues = useContext(ModalContext);

  if (!currentModalValues) {
    throw new Error(
      "useModal should be Called inside Modal componetns children"
    );
  }
  return currentModalValues;
};
