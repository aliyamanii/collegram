import React from "react";
import { useBlackListQuery, useFollowersListQuery } from "../api/user";
import UserListItemBagde from "./UserListItemBagde";
import SpinnerIcon from "../assets/photos/spinner.svg";

function FollowersListShow() {
  const { data, isLoading, isError, fetchNextPage } = useFollowersListQuery();
  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img
          src={SpinnerIcon}
          className="absolute  animate-spin w-5 z-20"
          alt=""
        />
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-full flex justify-center items-center font-secondary text-xl">
        خطا در بارگذاری
      </div>
    );

  const items = data.pages.map((page) => page.items).flat(1);

  return (
    <div className="w-full h-fit max-h-full overflow-y-hidden no-scrollbar  inline-grid grid-cols-2  gap-x-3 gap-y-7 pb-32">
      {items.map((user) => {
        return <UserListItemBagde user={user} />;
      })}
    </div>
  );
}

export default FollowersListShow;
