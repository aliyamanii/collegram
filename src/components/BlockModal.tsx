import { FC } from "react";

import block from "../assets/photos/block-dark.svg";

import MainButton from "./MainButton";
import { useModal } from "../customhook/useModal";
import { User } from "../types/types";
import { Link } from "react-router-dom";

interface BlockModalProps {
  user: User;
}

const BlockModal: FC<BlockModalProps> = ({ user }) => {
  const { isOpen, onClose } = useModal();

  const { firstname, lastname, profileUrl, followers } = user;
  const displayName = `${firstname} ${lastname}`;
  return (
    <div className="w-fit h-fit max-w-[616px] p-12 align-middle transform bg-[#F3F0EE] rounded-[24px] shadow-xl transition-all font-primary">
      <div id="header" className=" flex flex-col items-center">
        <img src={block} className="w-6 h-6"></img>
        <h3 className="flex justify-center text-xl font-semibold text-[20px] leading-[26px] text-[#17494D] font-primary">
          بلاک
        </h3>
      </div>

      <div className=" flex flex-col gap-6">
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
        <div className="w-72 flex flex-col text-right text-[#17494D]">
          <div className="font-bold">
            مطمئنی می‌خوای {firstname} رو بلاک کنی؟
          </div>
          اگر بلاکش کنی دیگه نمی‌تونه بهت پیام بده و پست‌هات رو ببینه. قابلیت
          لایک کردن و کامنت گذاشتن زیر پست‌های تو هم براش مسدود میشه.
        </div>
        <div className="flex">
          <MainButton>آره، حتما</MainButton>
          <button
            type="button"
            className="px-4 py-2 mr-2 text-sm font-normal text-black hover:font-semibold focus:outline-none"
            onClick={onClose}
          >
            پشیمون شدم
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;
