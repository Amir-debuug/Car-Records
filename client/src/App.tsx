import { BrowserRouter, Routes, Route } from "react-router-dom";
import PresistentLogin from "./protectedRoutes/PresistentLogin";
import RequireAuth from "./protectedRoutes/RequireAuth";
import { Home, Login, Signup } from "./utilis/loadables";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<PresistentLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
