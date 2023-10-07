import React from "react";
import { PostCommentNofit } from "../../types/types";
import { Link } from "react-router-dom";
import { relativeTime } from "../../utils/relativeTime";

interface IPostCommentNotif {
  notification: PostCommentNofit;
}

const PostCommentNotif: React.FC<IPostCommentNotif> = ({ notification }) => {
  const timeDifference = relativeTime(notification.createdAt);

  const {
    user: { firstName, lastName, username, profileUrl },
  } = notification;

  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  console.log(notification);

  return (
    <div className="flex gap-4 font-secondary">
      <Link
        to={`/app/people/user/${notification.user.id}/post/${notification.comment.post.id}`}
      >
        <img
          src={notification.comment.post.images[0].url}
          alt="Post"
          className="w-[64px] h-[64px] rounded-3xl object-cover hover:scale-95 transition-all duration-200"
        />
      </Link>
      <div className="flex flex-col justify-center ">
        <div className="flex items-center gap-1">
          <p>{displayName}</p>
          <p>برای این عکس کامنت داده:</p>
          <p className="text-xs">{notification.comment.commentText}</p>
        </div>
        <p className="text-sm text-navy">{timeDifference}</p>
      </div>
    </div>
  );
};

export default PostCommentNotif;
