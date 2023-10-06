import React from "react";
import { PostCommentNofit } from "../../types/types";
import { Link } from "react-router-dom";

interface IPostCommentNotif {
  notification: PostCommentNofit;
}

const PostCommentNotif: React.FC<IPostCommentNotif> = ({ notification }) => {
  return (
    <div className="flex gap-4 font-secondary">
      <div className="flex gap-1">
        <p>{notification.user.username}</p>
        <p>برای این عکس کامنت داده.</p>
      </div>
      <div className="post-image">
        <Link
          to={`/app/people/user/${notification.user.id}/post/${notification.comment.post.id}`}
        >
          <img
            src={notification.comment.post.image.url}
            alt="Post"
            className="w-[64px] h-[64px] rounded-3xl object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default PostCommentNotif;
