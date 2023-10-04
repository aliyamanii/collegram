import arrowDown from "../assets/photos/arrow-down-yellow.svg";
import penIcon from "../assets/photos/pen.svg";
import { Link, useLocation } from "react-router-dom";
import personIcon from "../assets/photos/person.svg";
import { useMyUserInfoQuery } from "../api/user";
import { UserMeInfo } from "../types/types";
import EditProfileModal from "./EditProfileModal";
import Modal from "./Modal";
import { FC, useState } from "react";

const MiniProfile: FC = () => {
  const { data: user, isLoading, isError } = useMyUserInfoQuery();

  const location = useLocation();
  let [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-[256px] h-[403px] p-[15px] flex flex-col justify-center items-center bg-vanilla border border-gray-300 font-primary">
        در حال گرفتن اطلاعات کاربر
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-[256px] h-[403px] p-[15px] flex flex-col justify-center items-center bg-vanilla border border-gray-300 font-primary">
        خطا در بازیابی اطلاعات کاربر
      </div>
    );
  }

  const {
    username,
    firstName,
    lastName,
    bio,
    profileUrl,
    followers,
    followings,
  } = user;

  const displayName = `${firstName || ""} ${lastName || ""}`;
  const isProfileRoute = location.pathname === "/app/profile";

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      className="w-[256px] h-fit p-3 flex flex-col items-center bg-vanilla border border-gray-300 font-primary  gap-5"
      dir="rtl"
    >
      <div>
        {profileUrl ? (
          <img
            src={profileUrl}
            alt={`${username}'s Profile`}
            className="w-32 h-32 p-1 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 p-1 rounded-full flex justify-center items-center bg-bone">
            <img src={personIcon} alt="" className="w-16 h-16" />
          </div>
        )}
      </div>
      <div className=" flex flex-col justify-center gap-3 ">
        <div className="w-full flex items-center justify-center">
          <p
            className="text-[14px] text-amber font-montserrat font-normal text-center leading-[17.07px]"
            dir="ltr"
          >
            @{username}
          </p>

          <img
            src={arrowDown}
            alt="Back Icon"
            className="w-[12px] h-[12px] mx-[5px] bg-[#]"
          />
        </div>
        <div className="text-[20px] font-semibold text-center leading-[26px] text-[#587052]">
          {displayName}
        </div>
        <div
          id="follow-info"
          className="flex justify-between items-center w-[201px] h-[21px] text-[14px] font-normal text-navy"
        >
          <Link to="" id="following-button" className="flex gap-1">
            <p>{followings}</p>
            <div>دنبال شونده</div>
          </Link>
          <div className="w-[1px] h-[10px] bg-navy"></div>
          <Link to="" id="followers-button" className="flex gap-1">
            <p>{followers}</p>
            <div>دنبال کننده</div>
          </Link>
        </div>
        <div className="w-[201px] text-[14px] leading-[18.2px] text-center text-cloud">
          {bio}
        </div>
      </div>
      <div>
        {isProfileRoute && (
          <div className="flex justify-center items-center  hover:cursor-pointer">
            <img
              src={penIcon}
              alt="Edit Profile"
              onClick={openModal}
              className="w-5"
            />
            <Modal isOpen={isOpen} onClose={closeModal}>
              <EditProfileModal user={user} />
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniProfile;
