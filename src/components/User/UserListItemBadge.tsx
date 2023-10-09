import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RelationUserSummery } from "../../api/user";
import personIcon from "../assets/photos/person.svg";
import ellipsis from "../assets/photos/ellipsis.svg";
import DropDown from "./UserDropDown";

function UserListItemBadge({ user }: { user: RelationUserSummery }) {
  const { id, username, firstName, lastName, profileUrl } = user;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  return (
    <div
      className="flex min-h-[64px] w-64  justify-between gap-7 items-center rounded-3xl font-secondary pb-2 relative "
      dir="rtl"
    >
      <Link to={`/app/people/user/${id}`}>
        <img
          src={profileUrl || personIcon}
          alt={`${displayName}'s Profile`}
          className="w-[64px] h-[64px] rounded-full object-cover"
        />
      </Link>
      <div>
        <Link
          to={`/app/people/user/${id}`}
          className="text-[16px] font-semibold text-center flex flex-col items-start gap-1 text-navy"
        >
          <h3 className="text-base font-montserrat">{username}</h3>
          <h3 className="text-xs">{displayName}</h3>
        </Link>
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
          userId={id}
        />
      )}
    </div>
  );
}

export default UserListItemBadge;
