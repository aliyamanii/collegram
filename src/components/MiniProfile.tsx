import React, { FC, useState } from "react";
import arrowDown from "../assets/photos/arrow-down-yellow.svg";
import penIcon from "../assets/photos/pen.svg";
import { Link, useLocation } from "react-router-dom";
import personIcon from "../assets/photos/person.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/user.ts";
import { User } from "../types/types.ts";
import EditProfileModal from "./EditProfileModal.tsx";

const MiniProfile: FC = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
    staleTime: 5 * 60 * 1000,
  });

  //   ["user"], fetchUserInfo
  if (isLoading) {
    return (
      <div className="w-[256px] h-[403px] p-[15px] flex flex-col justify-center items-center bg-[#F1EBE3] border border-[#cdcdcd] font-primary">
        در حال گرفتن اطلاعات کاربر
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-[256px] h-[403px] p-[15px] flex flex-col justify-center items-center bg-[#F1EBE3] border border-[#cdcdcd] font-primary">
        خطا در بازیابی اطلاعات کاربر
      </div>
    );
  }

  const {
    username,
    firstname,
    lastname,
    bio,
    profileUrl,
    followers,
    followings,
  } = user;

  const displayName = `${firstname || ""} ${lastname || ""}`;
  const location = useLocation();
  const isProfileRoute = location.pathname === "/app/profile";

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="w-[256px] h-[403px] p-[15px] flex flex-col items-center bg-[#F1EBE3] border border-[#cdcdcd] font-primary">
      <div className="w-[133.42] h-[133.42] p-1 rounded-full mb-[20px] object-cover ring-gray-300 dark:ring-gray-500">
        {profileUrl ? (
          <img
            src={profileUrl || personIcon}
            alt={`${username}'s Profile`}
            className="w-[133.42px] h-[133.42px] p-1 rounded-full object-cover"
          />
        ) : (
          <div className="w-[133.42px] h-[133.42px] p-1 rounded-full flex justify-center items-center bg-[#F3F0EE]">
            <img src={personIcon} alt="" className="w-16 h-16" />
          </div>
        )}
      </div>
      <div className=" flex flex-col gap-[15px]">
        <div className="w-full flex items-center justify-center  text-[14px] text-[#C19008] font-montserrat font-normal text-center leading-[17.07px]">
          @{username}
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
          className="flex justify-between items-center w-[201px] h-[21px] text-[14px] font-normal text-[#17494D]"
        >
          <Link to="" id="following-button" className="flex">
            <div>دنبال شونده</div>
            {followings}
          </Link>
          <div className="w-[1px] h-[10px] bg-[#17494D]"></div>
          <Link to="" id="followers-button" className="flex">
            <div>دنبال کننده</div>
            {followers}
          </Link>
        </div>
        <div className="w-[201px] text-[14px] leading-[18.2px] text-center text-[#A5A5A5]">
          {bio}
        </div>
      </div>
      {isProfileRoute && (
        <div className="my-4 hover:cursor-pointer">
          <img
            src={penIcon}
            alt="Edit Profile"
            className="hover:animate-spin"
            onClick={openModal}
          />
          {isOpen && (
            <EditProfileModal
              isOpen={isOpen}
              closeModal={closeModal}
              onSubmit={() => {
                closeModal();
              }}
              onCancel={closeModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MiniProfile;
