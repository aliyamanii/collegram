import React from "react";
import { PostsLikeNotif } from "../../types/types";
import { Link } from "react-router-dom";

interface IPostLikeNotif {
  notification: PostsLikeNotif;
}

const PostLikeNotif: React.FC<IPostLikeNotif> = ({ notification }) => {
  return (
    <div className="flex gap-4 font-primary">
      <div className="flex gap-1">
        <p>{notification.user.username}</p>
        <p>این عکس رو لایک کرده.</p>
      </div>
      <div className="post-image">
        <Link
          to={`/app/people/user/${notification.user.id}/post/${notification.post.postId}`}
        >
          <img
            src={notification.post.images[0].url}
            alt="Post"
            className="w-[64px] h-[64px] rounded-3xl object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default PostLikeNotif;
