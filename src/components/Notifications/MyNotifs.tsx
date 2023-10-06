import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyPostsQuery } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";
import Modal from "../Modal";
import AddPostModal from "../AddPostModal";
import { useMyNotificationQuery } from "../../api/notification";
import FollowNotif from "./FollowNotif";
import CommentLikeNotif from "./CommentLikeNotif";
import PostLikeNotif from "./PostLikeNotif";

const MyNotifsShow: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useMyNotificationQuery();

  if (isLoading) {
    return (
      <div className="w-full h-full overflow-y-scroll no-scrollbar flex justify-center items-center">
        <img src={SpinnerIcon} className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-full overflow-y-scroll no-scrollbar flex justify-center items-center font-primary text-xl font-bold">
        خطا در گرفتن اعلانات
      </div>
    );
  }

  const items = data.pages.map((page) => page.items).flat(1);

  console.log(items);

  return (
    <div
      className="w-full h-full flex flex-col gap-5 flex-wrap  overflow-y-scroll no-scrollbar pb-10  "
      dir="rtl"
    >
      {items.map((notif) => {
        if (
          notif.type === "FOLLOW" ||
          notif.type === "FOLLOW_ACCEPT" ||
          notif.type === "REQUEST"
        ) {
          return <FollowNotif notification={notif} />;
        }
        if (notif.type === "POST_LIKE") {
          return <PostLikeNotif notification={notif} />;
        }
        if (notif.type === "POST_COMMENT") {
          <div></div>;
        }
        if (notif.type === "COMMENT_LIKE") {
          return <CommentLikeNotif notification={notif} />;
        }
      })}
    </div>
  );
};

export default MyNotifsShow;
