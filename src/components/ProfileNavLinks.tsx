import { NavLink } from "react-router-dom";
import { INavLink } from "../types/types.ts";
import pinIcon from "../assets/photos/pin.svg";
import bookmark from "../assets/photos/bookmarkFull.svg";
import chatIcon from "../assets/photos/chat.svg";
import bellIcon from "../assets/photos/bell.svg";
import listIcon from "../assets/photos/list.svg";
import clockIcon from "../assets/photos/clock.svg";

export const items: INavLink[] = [
  {
    title: "posts",
    destinationUrl: "/app/profile/posts",
    icon: pinIcon,
  },
  {
    title: "bookmarks",
    destinationUrl: "/app/profile/bookmarks",
    icon: bookmark,
  },
  {
    title: "chat",
    destinationUrl: "/app/profile/chat",
    icon: chatIcon,
  },
  {
    title: "notifications",
    destinationUrl: "/app/profile/notifications",
    icon: bellIcon,
  },
  {
    title: "list",
    destinationUrl: "/app/profile/list",
    icon: listIcon,
  },
  {
    title: "history",
    destinationUrl: "/app/profile/history",
    icon: clockIcon,
  },
];

function ProfileNavLinks({ list }: { list: INavLink[] }) {
  return (
    <div className="h-fit w-[104px] inline-flex py-[25px] gap-8 flex-col items-center bg-[#F1EBE3] border-2">
      {list.map((item) => (
        <NavLink
          to={item.destinationUrl}
          className="flex w-full h-6 justify-center items-center gap-4 self-stretch text-[#C19008]"
          style={({ isActive, isPending }) => {
            return { color: isActive ? "#17494D" : "#C19008" };
          }}
        >
          <img
            src={item.icon}
            title={item.title}
            className="hover:scale-150 transition-all duration-300"
          />
        </NavLink>
      ))}
    </div>
  );
}

export default ProfileNavLinks;
