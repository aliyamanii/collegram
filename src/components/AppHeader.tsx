import React, { useState } from "react";
import logo from "../assets/photos/logo.svg";
import InputContainer from "./InputContainer";
import AddPostModal from "./AddPostModal";
import MainButton from "./MainButton";
import Modal from "./Modal";
import logOutIcon from "../assets/photos/logoutIcon.png";
import { logOut } from "../utils/logOut";
import SearchBar from "./SearchBar";

const AppHeader: React.FC = ({}) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      id="header"
      className="w-full flex justify-between items-center font-secondary "
    >
      <SearchBar />

      <div className="min-w-[225px] flex gap-5 justify-between">
        <div className="button flex  gap-5 items-center">
          <button onClick={logOut}>
            <img
              src={logOutIcon}
              className="w-7 scale-x-[-1] hover:scale-x-[-1] hover:scale-110"
              alt=""
            />
          </button>
          <MainButton onClick={openModal}>افزودن پست</MainButton>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <AddPostModal />
          </Modal>
        </div>
        <div id="logo">
          <img
            src={logo}
            alt="Logo"
            className="w-[68px] h-[40px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
