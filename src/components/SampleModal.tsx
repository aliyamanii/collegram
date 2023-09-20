import React from "react";
import { useModal } from "../customhook/useModal";
import Modal from "./Modal";

function SampleModal() {
  const { isOpen, onClose } = useModal();
  return (
    <div className="bg-red-600">
      <div>sample Modal</div>
      <button onClick={onClose}>close modal</button>
      <br />
      <button onClick={onClose}>submit</button>
    </div>
  );
}

export default SampleModal;
