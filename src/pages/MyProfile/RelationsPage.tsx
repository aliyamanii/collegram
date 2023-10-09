import React from "react";
import RelationNavLinks from "../../components/RelationsLists/RelationNavLinks";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";

function RelationsPage() {
  return (
    <div className="w-[85%] h-full flex flex-col  gap-9">
      <RelationNavLinks />
      <div className="w-full  h-full overflow-scroll no-scrollbar ">
        <Outlet />
      </div>
    </div>
  );
}

export default RelationsPage;
