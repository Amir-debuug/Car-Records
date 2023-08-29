import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CreateAuthContext } from "../contextApi/useAuthContext";
import { ThemeContextType } from "../typescript/types";

const RequireAuth = () => {
  const { isLoggedIn } = useContext(CreateAuthContext) as ThemeContextType;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
