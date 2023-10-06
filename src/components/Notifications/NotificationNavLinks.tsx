import React from "react";
import { NavLink } from "react-router-dom";

export const items = [
  {
    title: "اعلانات من",
    destinationUrl: "my-notifs",
  },
  {
    title: "اعلانات دوستان من",
    destinationUrl: "other-notifs",
  },
];

function NotificationNavLinks() {
  return (
    <div className="flex text-center font-secondary " dir="rtl">
      {items.map((item, index) => (
        <NavLink
          to={item.destinationUrl}
          className={` w-[25%] flex justify-center font-secondary text-lg  leading-4`}
          style={({ isActive, isPending }) => {
            return {
              color: isActive ? "#191919" : "#A5A5A5",
              fontWeight: isActive ? "bold" : "normal",
              borderLeft: index !== items.length - 1 ? "2px solid black" : "",
            };
          }}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}

export default NotificationNavLinks;
