import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainButton from "../components/MainButton";
import useStyles from "../mui/useStyles";
import { authparam } from "../typescript/types";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/authServices";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<authparam>({
    email: "",
    password: ""
  });
  const [remeberMe, setRemeberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please enter Email and Password");
      return;
    }

    const response: any = await authServices.userlogin(loginData);

    if (response?.data?.error === false) {
      await localStorage.setItem("accesstoken", response?.data?.accessToken);
      if (remeberMe) localStorage.setItem("refreshtoken", response?.data?.refreshToken);
      navigate("/", { replace: true });
    }
    if (response?.response?.data?.error === true) {
      toast.error(response?.response?.data?.message);
    }
  };

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.authContainer}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            color={loginData.email ? "success" : "error"}
            margin="normal"
            size="small"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputValue}
          />
          <TextField
            color={loginData.password ? "success" : "error"}
            margin="normal"
            size="small"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputValue}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRemeberMe(e.target.checked)
                }
              />
            }
            label="Remember me"
          />
          <Box className={classes.modalbtn}>
            <MainButton
              text="Sign In"
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={handleSubmit}
            />
          </Box>
          <Box>
            <Link to="/signup" className={classes.link}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
