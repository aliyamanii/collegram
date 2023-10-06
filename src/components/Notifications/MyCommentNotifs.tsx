import React from "react";

interface CommentLikeNotification {
  id: string;
  user: {
    username: string;
  };
  targetUserId: string;
  type: "COMMENT_LIKE";
  post: {
    images: {
      id: string;
      path: string;
    }[];
    text: string;
  };
}

interface CommentLikeNotificationProps {
  notification: CommentLikeNotification;
}

const CommentLikeNotificationComponent: React.FC<
  CommentLikeNotificationProps
> = ({ notification }) => {
  return (
    <div className="comment-like-notification">
      <p>User {notification.user.username} liked your comment:</p>
      <div className="post-image">
        <img src={notification.post.images[0].path} alt="Post" />
      </div>
      <p className="comment-text">{notification.post.text}</p>
    </div>
  );
};

export default CommentLikeNotificationComponent;
