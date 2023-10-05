import { useState } from "react";
import ellipsis from "../assets/photos/ellipsis.svg";
import DropDown from "./UserDropDown";
import personIcon from "../assets/photos/person.svg";
import { useTargetUserInfo } from "../api/user";
import { Link } from "react-router-dom";

function UserBadge({ userId }: { userId: string }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const { data: user, isLoading, isError } = useTargetUserInfo(userId);

  if (isLoading) {
    return (
      <div className="flex min-h-[64px] p-2 justify-between gap-7 items-center rounded-3xl hover:bg-vanilla transition-all duration-300">
        در حال گرفتن اطلاعات کاربر
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[64px] p-2 justify-between gap-7 items-center rounded-3xl hover:bg-vanilla transition-all duration-300">
        خطا در گرفتن اطلاعات کاربر
      </div>
    );
  }

  const { profileUrl, firstName, lastName, username, followers } = user;

  const displayName =
    firstName || lastName ? `${firstName} ${lastName}` : username;

  return (
    <div className="flex min-h-[64px]  justify-between gap-7 items-center rounded-3xl pb-2 relative">
      <Link to={`/app/people/user/${userId}`}>
        <img
          src={profileUrl || personIcon}
          alt={`${displayName}'s Profile`}
          className="w-[64px] h-[64px] rounded-full object-cover"
        />
      </Link>
      <div>
        <Link
          to={`/app/people/user/${userId}`}
          className="text-[16px] font-semibold text-center leading-[26px] text-navy"
        >
          {displayName}
        </Link>
        <div className="flex gap-2 text-navy">
          <div>دنبال کننده</div>
          <p>{followers}</p>
        </div>
      </div>
      <img
        src={ellipsis}
        alt={`options`}
        className="w-[18px] h-[18px] cursor-pointer"
        onClick={toggleDropDown}
      />
      {isDropDownOpen && (
        <DropDown
          user={user}
          onClose={() => setIsDropDownOpen(false)}
          userId={userId}
        />
      )}
    </div>
  );
}

export default UserBadge;
