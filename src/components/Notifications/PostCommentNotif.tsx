import React from "react";
import { PostCommentNofit } from "../../types/types";
import { Link } from "react-router-dom";

interface IPostCommentNotif {
  notification: PostCommentNofit;
}

const PostCommentNotif: React.FC<IPostCommentNotif> = ({ notification }) => {
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
      <div className="flex gap-1">
        <p>{notification.user.username}</p>
        <p>برای این عکس کامنت داده.</p>
      </div>
    </div>
  );
};

export default PostCommentNotif;
