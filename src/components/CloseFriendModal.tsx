import { FC } from "react";

import sparkle from "../assets/photos/sparkle-dark.svg";

import MainButton from "./MainButton";
import { useModal } from "../customhook/useModal";
import { UserInfo, UserMeInfo } from "../types/types";
import { Link } from "react-router-dom";

interface BlockModalProps {
  user: UserInfo;
}

const CloseFriendModal: FC<BlockModalProps> = ({ user }) => {
  const { isOpen, onClose } = useModal();

  const { firstName, lastName, profileUrl, followers } = user;
  const displayName = `${firstName} ${lastName}`;
  return (
    <div className="w-fit h-fit max-w-[616px] p-12 align-middle transform bg-[#F3F0EE] rounded-[24px] shadow-xl transition-all font-primary">
      <div id="header" className="flex justify-center gap-3">
        <h3 className="flex justify-center text-xl font-semibold text-[20px] leading-[26px] text-[#17494D] font-primary">
          دوست نزدیک
        </h3>
        <img src={sparkle} className="w-6 h-6"></img>
      </div>

      <div className=" flex flex-col gap-8">
        <div className="flex justify-between items-center gap-[100px]">
          <img
            src={profileUrl}
            alt={`${displayName}'s Profile`}
            className="w-[80px] h-[80px] p-1 rounded-full object-cover "
          />
          <div>
            <div className="text-[16px] font-semibold text-center leading-[26px] text-[#17494D]">
              {displayName}
            </div>
            <div className="flex text-[#17494D]">
              <div>دنبال کننده</div>
              {followers}
            </div>
          </div>
        </div>
        <div className="w-72 flex flex-col gap-3 text-right text-[#17494D]">
          <div className="font-bold">
            مطمئنی می‌خوای {firstName} رو به دوستان نزدیکت اضافه کنی؟
          </div>
          در این صورت اون می‌تونه محتواهایی که برای دوستان نزدیکت به اشتراک
          گذاشتی رو ببینه
        </div>
        <div className="flex">
          <MainButton>آره، حتما</MainButton>
          <button
            type="button"
            className="px-4 py-2 mr-2 text-sm font-normal text-black hover:font-semibold focus:outline-none"
            onClick={onClose}
          >
            نه پشیمونم
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseFriendModal;
