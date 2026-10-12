
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(
      location.pathname + location.search
    );

    return (
      <Navigate
        to={`/login?state=login&redirect=${redirect}`}
        replace
      />
    );
  }

  return <Outlet />;
}
