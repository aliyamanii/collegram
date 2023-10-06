import React from "react";
import { FollowingStatesNotif } from "../../types/types";
import { Link } from "react-router-dom";

interface NotificationProps {
  notification: FollowingStatesNotif;
}

const FollowNotif: React.FC<NotificationProps> = ({ notification }) => {
  let content: JSX.Element | null = null;

  const {
    user: { firstName, lastName, username, profileUrl },
  } = notification;

  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  switch (notification.type) {
    case "REQUEST":
      content = (
        <div className="flex gap-4 font-secondary">
          <div className="flex gap-1">
            <p>{displayName}</p> <p>درخواست دوستی داده.</p>
          </div>
          <img
            src={profileUrl}
            className="w-[64px] h-[64px] rounded-full object-cover"
          ></img>
        </div>
      );
      break;
    case "FOLLOW_ACCEPT":
      content = (
        <div className="flex gap-4 font-secondary">
          <div className="flex gap-1">
            <p>{displayName}</p> <p>درخواست دوستی ات رو قبول کرد</p>
          </div>
          <Link to={`/app/people/user/${notification.user.id}`}>
            <img
              src={profileUrl}
              className="w-[64px] h-[64px] rounded-full object-cover"
            ></img>
          </Link>
        </div>
      );
      break;
    case "FOLLOW":
      content = (
        <div className="flex gap-4 font-secondary">
          <Link to={`/app/people/user/${notification.user.id}`}>
            <img
              src={profileUrl}
              className="w-[64px] h-[64px] rounded-full object-cover"
            />
          </Link>
          <div className="flex gap-1">
            <p>{displayName}</p> <p>دنبالت کرد. </p>
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return <div className="notification">{content}</div>;
};

export default FollowNotif;
