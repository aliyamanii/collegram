import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import BlockModal from "./BlockModal";
import CloseFriendModal from "./CloseFriendModal";
import { UserInfo } from "../types/types";

interface DropDownProps {
  onClose: () => void;
  user: UserInfo;
}

const DropDown: React.FC<DropDownProps> = ({ onClose, user }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [modalType, setModalType] = useState<"block" | "closeFriend" | null>(
    null
  );

  function openModal(type: "block" | "closeFriend") {
    setModalType(type);
  }

  function closeModal() {
    setModalType(null);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleMenuItemClick(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute left-[210px] top-[280px] right-0 mt-2 w-56 bg-[#F1EBE3] border border-[#CDCDCD] rounded-s-3xl rounded-b-3xl shadow-lg text-right"
    >
      <ul>
        <li
          className="px-4 py-2 cursor-pointer hover:bg-[#f5e4ce] hover:rounded-tl-3xl transition-all duration-200"
          onClick={() => openModal("block")}
        >
          بلاک کردن کاربر
        </li>
        <li
          className="px-4 py-2 cursor-pointer hover:bg-[#f5e4ce] transition-all duration-200"
          onClick={() => openModal("closeFriend")}
        >
          افزودن به دوستان نزدیک
        </li>
        <li
          className="px-4 py-2 cursor-pointer hover:bg-[#f5e4ce] hover:rounded-b-3xl transition-all duration-200"
          onClick={() => handleMenuItemClick("item2")}
        >
          پیام به کاربر
        </li>
      </ul>
      {modalType === "block" && (
        <Modal isOpen={true} onClose={closeModal}>
          <BlockModal user={user} />
        </Modal>
      )}
      {modalType === "closeFriend" && (
        <Modal isOpen={true} onClose={closeModal}>
          <CloseFriendModal user={user} />
        </Modal>
      )}
    </div>
  );
};

export default DropDown;
