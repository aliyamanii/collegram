import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageStatus, UserInfo, UserMeInfo } from "../types/types";
import MainButton from "./MainButton";
import pin from "../assets/photos/pin-dark.svg";
import block from "../assets/photos/block.svg";
import chat from "../assets/photos/chat.svg";
import sparkle from "../assets/photos/sparkle.svg";
import Modal from "./Modal";
import BlockModal from "./BlockModal";
import CloseFriendModal from "./CloseFriendModal";
import UserActionButton from "./UserActionButton";
import personIcon from "../assets/photos/person.svg";

interface MiniProfileProps {
  user: UserInfo;
  pageStatus: PageStatus;
}

const MiniProfile: FC<MiniProfileProps> = ({ user, pageStatus }) => {
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [closeFriendModalOpen, setCloseFriendModalOpen] = useState(false);
  const navigate = useNavigate();

  function closeBlockModal() {
    setBlockModalOpen(false);
  }

  function openBlockModal() {
    setBlockModalOpen(true);
  }

  function closeCloseFriendModal() {
    setCloseFriendModalOpen(false);
  }

  function openCloseFriendModal() {
    setCloseFriendModalOpen(true);
  }

  const { firstName, lastName, profileUrl, followers, followings } = user;
  const displayName = `${firstName} ${lastName}`;
  return (
    <div className="w-[256px] h-[403px] p-[15px] flex flex-col items-center bg-vanilla border border-[#cdcdcd] font-primary">
      <div className="w-[106px] h-[106px] p-1 rounded-full  object-cover ring-gray-300 dark:ring-gray-500 -translate-y-[50%]">
        <img
          src={profileUrl || personIcon}
          alt={`${displayName}'s Profile`}
          className="w-[106px] h-[106px] p-1 rounded-full object-cover "
        />
      </div>
      <div className=" flex flex-col justify-center items-center gap-[15px]">
        <div className="text-[16px] font-semibold text-center leading-[26px] text-[#C38F00]">
          {displayName}
        </div>
        <div
          id="follow-info"
          className="flex justify-between items-center w-[201px] h-[21px] text-[11px] font-normal text-navy"
        >
          <Link to="" id="following-button" className="flex">
            <div>دنبال شونده</div>
            {followings}
          </Link>
          <div className="w-[1px] h-[10px] bg-navy"></div>
          <Link to="" id="followers-button" className="flex">
            <div>دنبال کننده</div>
            {followers}
          </Link>
        </div>
        <div className="flex justify-center items-center w-[114px] h-[40px]">
          <UserActionButton user={user} pageStatus={pageStatus} />
        </div>
        <div>
          <img src={pin} />
        </div>
        <div className="w-[212px] h-[72px] flex items-center justify-center bg-bone gap-8 border border-solid border-[#CDCDCD]">
          <img
            src={block}
            className="hover:scale-150 transition-all duration-300 hover:cursor-pointer"
            title="block"
            onClick={openBlockModal}
          ></img>
          <Modal isOpen={blockModalOpen} onClose={closeBlockModal}>
            <BlockModal user={user} />
          </Modal>
          <img
            src={chat}
            className="hover:scale-150 transition-all duration-300 hover:cursor-pointer"
            title="chat"
          ></img>
          <img
            src={sparkle}
            className="hover:scale-150 transition-all duration-300 hover:cursor-pointer"
            title="close friends"
            onClick={openCloseFriendModal}
          ></img>
          <Modal isOpen={closeFriendModalOpen} onClose={closeCloseFriendModal}>
            <CloseFriendModal user={user} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
