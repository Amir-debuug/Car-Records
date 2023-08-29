import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainButton from "../components/MainButton";
import useStyles from "../mui/useStyles";
import { Link } from "react-router-dom";
import { authparam } from "../typescript/types";
import authServices from "../services/authServices";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [signupData, setSignupData] = useState<authparam>({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    if (!signupData.username || !signupData.email || !signupData.password) {
      toast.error("Please enter Username, Email or Password");
      return;
    }

    const response: any = await authServices.registerUser(signupData);
    if (response?.data?.error === false) {
      setSignupData({ username: "", email: "", password: "" });
      toast.success("User Created! Please Login");
    }
    if (response?.response?.data?.error === true) {
      setSignupData({ username: "", email: "", password: "" });
      toast.error(response?.response?.data?.message);
    }
  };

  const handleFormInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.authContainer}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            color={signupData.username ? "success" : "error"}
            margin="normal"
            size="small"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="username"
            autoFocus
            value={signupData.username}
            onChange={handleFormInput}
          />
          <TextField
            color={signupData.email ? "success" : "error"}
            margin="normal"
            size="small"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={signupData.email}
            onChange={handleFormInput}
          />
          <TextField
            color={signupData.password ? "success" : "error"}
            margin="normal"
            size="small"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            value={signupData.password}
            onChange={handleFormInput}
          />
          <Box className={classes.modalbtn} sx={{ marginTop: "20px" }}>
            <MainButton
              text="Sign In"
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={handleSubmit}
            />
          </Box>
          <Box>
            <Link to="/login" className={classes.link}>
              {"Already have an account? Log In"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
