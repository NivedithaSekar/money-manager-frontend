import * as React from "react";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import backendInstance from "../instances/serverInstance";

import "../index.css";
import { useNavigate } from "react-router-dom";

//User Validation Schema defined
const userValidationSchema = yup.object({
  //id:yup.number().required("Provide unique ID"),
  userName: yup.string().required("Provide User Name"),
  emailId: yup.string().email().required("Please provide your email address"),
  password: yup
    .string()
    .min(8, "Password value should be atleast 8 char")
    .required("Please provide the password"),
  confirmPassword: yup
    .string()
    .min(8, "Password value should be atleast 8 char")
    .required("Please provide the password to confirm")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const navigate = useNavigate();
   //Password Visibility State Handlers
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Sign-up form setup via formik
  const formik = useFormik({
    initialValues: {
      userName: "",
      emailId: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (newUser) => {
      delete newUser.confirmPassword;
      console.log(newUser);
      registerNewUser(newUser);
    },
  });

  //New User Registration/Sign-up function
  const registerNewUser = (newUser) => {
    console.log(newUser);
    backendInstance.post("/auth/register", newUser).then((res) => {
      console.log(res);
      formik.resetForm();
      alert(res.data.msg);
      navigate("/login");
    });
  };

  return (
    <Container component="main" className="main-content" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 60, height: 60 }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h1">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          className="form-styling"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-text-input-userName"
                className="input-field"
                label="User Name"
                type="text"
                size="small"
                fullWidth
                value={formik.values.userName}
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && formik.errors.userName}
                helperText={
                  formik.touched.userName && formik.errors.userName
                    ? formik.errors.userName
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-text-input-emailId"
                label="Email address"
                type="text"
                size="small"
                fullWidth
                value={formik.values.emailId}
                name="emailId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailId && formik.errors.emailId}
                helperText={
                  formik.touched.emailId && formik.errors.emailId
                    ? formik.errors.emailId
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-text-input-password"
                label="Password"
                type={showPassword ? "text" : "password"}
                size="small"
                fullWidth
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-text-input-confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                size="small"
                fullWidth
                value={formik.values.confirmPassword}
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : ""
                }
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowConfirmPassword((prev) => !prev);
                        }}
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: "75%" }}
              >
                Signup
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item sx={{ mt: 2 }}>
              <Link href="/login" variant="h5">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
