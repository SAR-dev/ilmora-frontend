import { Navigate, Outlet, useLocation } from "react-router";
import { usePocket } from "../contexts/PocketContext";

export const RequireStudentAuth = () => {
  const { user, userData } = usePocket();
  const location = useLocation();

  if (!user && !userData.isTeacher) {
    return (
      <Navigate to={{ pathname: "/" }} state={{ location }} replace />
    );
  }

  return <Outlet />;
};
