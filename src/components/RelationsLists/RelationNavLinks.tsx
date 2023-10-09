import React from "react";
import { NavLink } from "react-router-dom";

export const items = [
  {
    title: "دنبال کننده ها",
    destinationUrl: "followers",
  },
  {
    title: "دنبال شونده ها",
    destinationUrl: "followings",
  },
  {
    title: "دوستان نزدیک",
    destinationUrl: "closefriends",
  },
  {
    title: "لیست سیاه",
    destinationUrl: "blacklist",
  },
];

function RelationNavLinks() {
  return (
    <div className="flex text-center font-secondary " dir="rtl">
      {items.map((item, index) => (
        <NavLink
          to={item.destinationUrl}
          className={`flex w-full justify-center items-center grow font-secondary text-lg  leading-4`}
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

export default RelationNavLinks;
