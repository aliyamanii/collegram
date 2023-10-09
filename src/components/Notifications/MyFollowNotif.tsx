import React from "react";
import { FollowingStatesNotif } from "../../types/types";
import { Link } from "react-router-dom";
import { relativeTime } from "../../utils/relativeTime";
import NotificationActionButtons from "./NotificationActionButtons";
import personIcon from "../../assets/photos/person.svg";

interface NotificationProps {
  notification: FollowingStatesNotif;
}

const MyFollowNotif: React.FC<NotificationProps> = ({ notification }) => {
  const timeDifference = relativeTime(notification.createdAt);

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
          <Link to={`/app/people/user/${notification.user.id}`}>
            <img
              src={profileUrl || personIcon}
              className="w-[64px] h-[64px] rounded-full object-cover hover:scale-95 transition-all duration-200"
            />
          </Link>
          <div className="flex flex-col justify-center ">
            <div className="flex gap-1">
              <p>{displayName}</p> <p>درخواست دوستی داده.</p>
            </div>
            <p className="text-sm text-navy">{timeDifference}</p>
            <NotificationActionButtons
              userId={notification.user.id}
              initialCurrentMode={"RESPONSEREQUEST"}
            />
          </div>
        </div>
      );
      break;
    case "FOLLOW_ACCEPT":
      content = (
        <div className="flex gap-4 font-secondary">
          <Link to={`/app/people/user/${notification.user.id}`}>
            <img
              src={profileUrl || personIcon}
              className="w-[64px] h-[64px] rounded-full object-cover hover:scale-95 transition-all duration-200"
            ></img>
          </Link>
          <div className="flex flex-col justify-center ">
            <div className="flex gap-1">
              <p>{displayName}</p> <p>درخواست دوستی ات رو قبول کرد</p>
            </div>
            <p className="text-sm text-navy">{timeDifference}</p>
            {(notification.pageStatus === "FOLLOWED" ||
              notification.pageStatus === "PRIVATE" ||
              notification.user.pageStatus === "PUBLIC") && (
              <NotificationActionButtons
                userId={notification.user.id}
                initialCurrentMode={notification.pageStatus}
              />
            )}
          </div>
        </div>
      );
      break;
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
              <p>{displayName}</p> <p>دنبالت کرد. </p>
            </div>
            <p className="text-sm text-navy" dir="ltr">
              {timeDifference}
              {(notification.user.pageStatus === "FOLLOWED" ||
                notification.user.pageStatus === "PRIVATE" ||
                notification.user.pageStatus === "PUBLIC") && (
                <NotificationActionButtons
                  userId={notification.user.id}
                  initialCurrentMode={notification.user.pageStatus}
                />
              )}
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
