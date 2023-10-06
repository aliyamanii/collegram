import React from "react";
import { CommentsLikesNotif } from "../../types/types";
import { Link } from "react-router-dom";

interface CommentLikeNotificationProps {
  notification: CommentsLikesNotif;
}

const CommentLikeNotif: React.FC<CommentLikeNotificationProps> = ({
  notification,
}) => {
  return (
    <div className="flex gap-4 font-primary">
      <div className="flex gap-1">
        <p>{notification.user.username}</p>
        <p>این کامنت رو لایک کرده:</p>
        <p>{notification.post.text}</p>
      </div>
      <div className="post-image">
        <Link
          to={`/app/people/user/${notification.user.id}/post/${notification.post.postId}`}
        >
          <img src={notification.post.images[0].url} alt="Post" />
        </Link>
      </div>
    </div>
  );
};

export default CommentLikeNotif;
