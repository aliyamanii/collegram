import React from "react";

interface Notification {
  id: string;
  user: {
    username: string;
    profileUrl: string;
  };
  targetUserId: string;
  type: "REQUEST" | "FOLLOW_ACCEPT" | "FOLLOW";
}

interface NotificationProps {
  notification: Notification;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  notification,
}) => {
  let content: JSX.Element | null = null;

  switch (notification.type) {
    case "REQUEST":
      content = (
        <div>
          <p>User {notification.user.username} sent you a follow request.</p>
          <a href={notification.user.profileUrl}>View Profile</a>
        </div>
      );
      break;
    case "FOLLOW_ACCEPT":
      content = (
        <div>
          <p>User {notification.user.username} accepted your follow request.</p>
          <a href={notification.user.profileUrl}>View Profile</a>
        </div>
      );
      break;
    case "FOLLOW":
      content = (
        <div>
          <p>User {notification.user.username} started following you.</p>
          <a href={notification.user.profileUrl}>View Profile</a>
        </div>
      );
      break;
    default:
      break;
  }

  return <div className="notification">{content}</div>;
};

export default NotificationComponent;
