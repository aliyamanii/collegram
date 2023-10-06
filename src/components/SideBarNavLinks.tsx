import { NavLink } from "react-router-dom";
import overViewIcon from "../assets/photos/overview.svg";
import peopleIcon from "../assets/photos/people.svg";
import insightIcon from "../assets/photos/insights-audience.svg";
import { INavLink } from "../types/types";

export const items: INavLink[] = [
  { title: "خانه", destinationUrl: "/app/home", icon: overViewIcon },
  { title: "کالج گرامی ها", destinationUrl: "/app/people", icon: peopleIcon },
  {
    title: "کالج گرام من",
    destinationUrl: "/app/profile",
    icon: insightIcon,
  },
];

function SideBarNavLinks({ list }: { list: INavLink[] }) {
  return (
    <div
      className="inline-flex w-[240px] gap-4 flex-col items-end text-right font-secondary"
      dir="rtl"
    >
      {list.map((item) => (
        <NavLink
          to={item.destinationUrl}
          className="flex w-full  justify-start items-start gap-4 self-stretch text-amber "
          style={({ isActive, isPending }) => {
            return { color: isActive ? "#17494D" : "#C19008" };
          }}
        >
          <img src={item.icon} />
          <h3 className="h-6 text-xs flex flex-col justify-center">
            {item.title}
          </h3>
        </NavLink>
      ))}
    </div>
  );
}

export default SideBarNavLinks;
