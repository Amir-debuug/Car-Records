import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./mui/theme";
import { AuthContextProvider } from "./contextApi/useAuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </Suspense>
    </AuthContextProvider>
  </ThemeProvider>
);
