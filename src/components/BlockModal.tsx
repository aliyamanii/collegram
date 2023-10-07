import { FC, useState } from "react";
import block from "../assets/photos/block-dark.svg";
import MainButton from "./MainButton";
import { useModal } from "../customhook/useModal";
import { UserInfo, UserSummery } from "../types/types";
import {
  RelationUserSummery,
  useBlockUser,
  useTargetUserInfo,
} from "../api/user";
import { infoToast } from "../utils/customToast";
import personIcon from "../assets/photos/person.svg";

interface BlockModalProps {
  user: UserInfo | RelationUserSummery;
  userId: string;
}

const BlockModal: FC<BlockModalProps> = ({ user, userId }) => {
  const { isOpen, onClose } = useModal();
  const { mutateAsync: blockMutatation } = useBlockUser(userId);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { firstName, lastName, followers, profileUrl, username } = user;
  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  async function doBlock() {
    setIsSubmitting(true);
    await blockMutatation()
      .then(() => {
        infoToast(`${displayName} رو زدی بلاک کردی`);
      })
      .catch();
    setIsSubmitting(false);
    onClose();
  }

  return (
    <div className="w-fit h-fit max-w-[616px] p-12 align-middle transform bg-bone rounded-[24px] shadow-xl transition-all font-secondary">
      <div id="header" className=" flex flex-col items-center">
        <img src={block} className="w-6 h-6"></img>
        <h3 className="flex justify-center text-xl font-semibold text-[20px] leading-[26px] text-navy font-secondary">
          بلاک
        </h3>
      </div>

      <div className=" flex flex-col gap-6">
        <div className="flex justify-between items-center gap-[100px]">
          <img
            src={profileUrl || personIcon}
            alt={`${displayName}'s Profile`}
            className="w-[80px] h-[80px] p-1 rounded-full object-cover "
          />
          <div>
            <div className="text-[16px] font-semibold text-center leading-[26px] text-navy">
              {displayName}
            </div>
            <div className="flex text-navy">
              <div>دنبال کننده</div>
              {followers}
            </div>
          </div>
        </div>
        <div className="w-72 flex flex-col text-right text-navy">
          <div className="font-bold">
            مطمئنی می‌خوای {firstName || displayName} رو بلاک کنی؟
          </div>
          اگر بلاکش کنی دیگه نمی‌تونه بهت پیام بده و پست‌هات رو ببینه. قابلیت
          لایک کردن و کامنت گذاشتن زیر پست‌های تو هم براش مسدود میشه.
        </div>
        <div className="flex">
          <MainButton onClick={doBlock} isSubmitting={isSubmitting}>
            آره، حتما
          </MainButton>
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
