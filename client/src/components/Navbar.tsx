import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import useStyles from "../mui/useStyles";
import { ThemeContextType } from "../typescript/types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CreateAuthContext } from "../contextApi/useAuthContext";

const Navbar: React.FC = () => {
  const { setSearch } = useContext(CreateAuthContext) as ThemeContextType;
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    navigate("/login");
  };

  return (
    <AppBar elevation={1} position="sticky">
      <Toolbar
        variant="dense"
        className={classes.toolbar}
        sx={{ minWidth: { xs: "100vw", sm: "70vw" } }}>
        <Box className={classes.navContainer}>
          <Typography variant="h5" fontWeight="700">
            Car Records
          </Typography>
          <input
            type="text"
            placeholder="Search"
            className={classes.navSearch}
            onChange={(e): void => setSearch(e.target.value)}
          />
          <div className={classes.logoutBtn} onClick={handleLogout}>
            Log Out
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
