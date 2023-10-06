import React from "react";
import NotificationNavLinks from "../../components/Notifications/NotificationNavLinks";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";

function NotificationPage() {
  return (
    <div className="w-[85%] h-full flex flex-col gap-11 ">
      <NotificationNavLinks />
      <div className="w-full  h-full overflow-scroll no-scrollbar bg-green-200">
        <Outlet />
      </div>
    </div>
  );
}

export default NotificationPage;
