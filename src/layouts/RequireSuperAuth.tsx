import { Navigate, Outlet, useLocation } from "react-router";
import { usePocket } from "../contexts/PocketContext";

export const RequireSuperAuth = () => {
  const { user, userData } = usePocket();
  const location = useLocation();

  if (!user && !userData.isSuperUser) {
    return (
      <Navigate to={{ pathname: "/" }} state={{ location }} replace />
    );
  }

  return <Outlet />;
};
