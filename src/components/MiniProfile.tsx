import React, { FC } from "react";
import arrowDown from "../assets/photos/arrow-down-yellow.svg";
import { Link } from "react-router-dom";

interface MiniProfileProps {
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  profilePicture: string;
}

const MiniProfile: FC<MiniProfileProps> = ({
  username,
  displayName,
  bio,
  followers,
  following,
  profilePicture,
}) => {
  return (
    <div className="w-[256px] h-[403px] p-[15px] flex flex-col items-center bg-[#F1EBE3] border border-[#cdcdcd]">
      <div className="w-[133.42]] h-[133.42] p-1 rounded-full mb-[20px] object-cover ring-gray-300 dark:ring-gray-500">
        <img
          src={profilePicture}
          alt={`${displayName}'s Profile`}
          className="w-[133.42px] h-[133.42px] p-1 rounded-full object-cover"
        />
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
            {following}
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
    </div>
  );
};

export default MiniProfile;
