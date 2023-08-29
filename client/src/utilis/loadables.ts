import { lazy } from "react";

const Home = lazy(() => import("../screens/Home"));
const Login = lazy(() => import("../screens/Login"));
const Signup = lazy(() => import("../screens/Signup"));

export { Home, Login, Signup };
