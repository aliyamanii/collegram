import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ lastPath: location.pathname }}
      />
    );
  }

  return <>children</>;
};

export default ProtectedRoute;
