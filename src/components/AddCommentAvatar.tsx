import React from "react";
import personIcon from "../assets/photos/person.svg";
import { useMyUserInfoQuery } from "../api/user";

function AddCommentAvatar() {
  const { isLoading, isError, data: user } = useMyUserInfoQuery();
  if (isLoading) {
    return (
      <div>
        <img
          src={personIcon}
          className="w-10 h-10 rounded-2xl object-cover p-1 border"
          alt=""
        />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <img
          src={personIcon}
          className="w-10 h-10 rounded-2xl object-cover p-1 border"
          alt=""
        />
      </div>
    );
  }

  return (
    <div>
      <img
        src={user.profileUrl}
        className="w-10 h-10 rounded-2xl object-cover  border"
        alt=""
      />
    </div>
  );
}

export default AddCommentAvatar;
