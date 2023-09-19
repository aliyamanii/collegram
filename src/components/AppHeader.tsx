import React, { useState } from "react";
import logo from "../assets/photos/logo.svg";
import search from "../assets/photos/search.svg";
import InputContainer from "./InputContainer";
import AddPostModal from "./AddPostModal";
import MainButton from "./MainButton";
import Modal from "./Modal";
import SampleModal from "./SampleModal";
import EditProfileModal from "./EditProfileModal";

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
      className="w-[1000px] flex justify-between items-center font-primary"
    >
      <div id="left" className="w-[225px] flex justify-between">
        <div id="logo">
          <img
            src={logo}
            alt="Logo"
            className="w-[68px] h-[40px] cursor-pointer"
          />
        </div>
        <div className="button">
          <MainButton onClick={openModal}>افزودن پست</MainButton>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <AddPostModal />
          </Modal>
          {/* {isOpen && (
            <AddPostModal
              isOpen={isOpen}
              closeModal={closeModal}
              onSubmit={() => {
                closeModal();
              }}
              onCancel={closeModal}
            />
          )} */}
        </div>
      </div>
      <div id="right" className="w-[360px]">
        <InputContainer
          placeholder="جستجو"
          icon={search}
          type="text"
          width="360px"
        />
      </div>
    </div>
  );
};

export default AppHeader;
