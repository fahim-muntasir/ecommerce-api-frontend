import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function PrivateRoute() {
  const { accessToken, user } = useContext(AuthContext);

  return accessToken && user ? <Outlet /> : <Navigate to="/account" />;
}
