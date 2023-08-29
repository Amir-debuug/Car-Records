import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E55735"
    },
    secondary: {
      main: "#808080"
    }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

export default theme;
