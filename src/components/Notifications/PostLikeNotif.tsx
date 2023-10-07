import React from "react";
import { PostsLikeNotif } from "../../types/types";
import { Link } from "react-router-dom";
import { relativeTime } from "../../utils/relativeTime";
import personIcon from "../../assets/photos/person.svg";

interface IPostLikeNotif {
  notification: PostsLikeNotif;
}

const PostLikeNotif: React.FC<IPostLikeNotif> = ({ notification }) => {
  const timeDifference = relativeTime(notification.createdAt);

  const {
    user: { firstName, lastName, username, profileUrl },
  } = notification;

  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  return (
    <div className="flex gap-4 font-secondary ">
      <Link
        to={`/app/people/user/${notification.user.id}/post/${notification.post.id}`}
      >
        <img
          src={notification.post.images[0].url || personIcon}
          alt="Post"
          className="w-[64px] h-[64px] rounded-3xl object-cover hover:scale-95 transition-all duration-200 "
        />
      </Link>
      <div className="flex flex-col justify-center items-start">
        <div className="flex">
          <p>{displayName}</p>
          <p>این عکس رو لایک کرده.</p>
        </div>
        <p className="text-sm text-navy" dir="ltr">
          {timeDifference}
        </p>
      </div>
    </div>
  );
};

export default PostLikeNotif;
