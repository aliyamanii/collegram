import React from "react";
import { PostCommentNofit } from "../../types/types";
import { Link } from "react-router-dom";
import { relativeTime } from "../../utils/relativeTime";

interface IPostCommentNotif {
  notification: PostCommentNofit;
}

const MyPostCommentNotif: React.FC<IPostCommentNotif> = ({ notification }) => {
  const timeDifference = relativeTime(notification.createdAt);

  const {
    user: { firstName, lastName, username, profileUrl },
  } = notification;

  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  return (
    <div className="flex gap-4 font-secondary">
      <Link
        to={`/app/people/user/${notification.user.id}/post/${notification.comment.post.id}`}
      >
        <img
          src={notification.comment.post.image.url}
          alt="Post"
          className="w-[64px] h-[64px] rounded-3xl object-cover hover:scale-95 transition-all duration-200"
        />
      </Link>
      <div className="flex flex-col justify-center ">
        <div className="flex gap-1">
          <p>{displayName}</p>
          <p>برای این عکس کامنت داده.</p>
          <p className="text-sm text-navy">{timeDifference}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPostCommentNotif;
