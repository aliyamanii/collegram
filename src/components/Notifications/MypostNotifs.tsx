import React from "react";

interface PostNotification {
  id: string;
  user: {
    username: string;
  };
  targetUserId: string;
  type: "POST_LIKE" | "POST_COMMENT";
  post: {
    images: {
      id: string;
      path: string;
    }[];
  };
}

interface PostNotificationProps {
  notification: PostNotification;
}

const PostNotificationComponent: React.FC<PostNotificationProps> = ({
  notification,
}) => {
  return (
    <div className="post-notification">
      <p>
        User {notification.user.username}{" "}
        {notification.type === "POST_LIKE" ? "liked" : "commented on"} your
        post.
      </p>
      <div className="post-image">
        <img src={notification.post.images[0].path} alt="Post" />
      </div>
    </div>
  );
};

export default PostNotificationComponent;
