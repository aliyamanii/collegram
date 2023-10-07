import React from "react";
import { FollowingStatesNotif } from "../../types/types";
import { Link } from "react-router-dom";
import { relativeTime } from "../../utils/relativeTime";
import personIcon from "../../assets/photos/person.svg";

interface NotificationProps {
  notification: FollowingStatesNotif;
}

const MyFollowNotif: React.FC<NotificationProps> = ({ notification }) => {
  const timeDifference = relativeTime(notification.createdAt);

  let content: JSX.Element | null = null;

  const {
    user: { firstName, lastName, username, profileUrl },
    targetUser: {},
  } = notification;

  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  switch (notification.type) {
    case "FOLLOW":
      content = (
        <div className="flex gap-4 font-secondary">
          <Link to={`/app/people/user/${notification.user.id}`}>
            <img
              src={profileUrl || personIcon}
              className="w-[64px] h-[64px] rounded-full object-cover hover:scale-95 transition-all duration-200"
            />
          </Link>
          <div className="flex flex-col justify-center items-start">
            <div className="flex gap-1">
              <p>{displayName}</p>
              <p>{notification.targetUser.firstName}</p>{" "}
              {notification.targetUser.lastName} رو دنبال کرد.
            </div>

            <p className="text-sm text-navy" dir="ltr">
              {timeDifference}
            </p>
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return <div className="notification">{content}</div>;
};

export default MyFollowNotif;
