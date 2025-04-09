import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { notification } from "antd";
import Cookies from "js-cookie";

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { Email, Password } = formData;
    if (Email === "") {
      notification.error({
        message: "Please enter Email",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          width: "270px",
        },
      });
      return;
    }
    if (Password === "") {
      notification.error({
        message: "Please enter Password",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          width: "270px",
        },
      });
      return;
    }
    
    try {   
      setLoading(true);
      const response = await axios.post(
          "https://ybillingapi.bsite.net/api/User/login",
        {
            email: formData.Email,
            password: formData.Password
          
        }
      );
      const email = formData.Email;
      const role = response.data.role;
      const username = response.data.username;
      const clientname = response.data.clientname;
   
      if (response && response.status === 200) {
        notification.success({
          message: "Welcome!",
          description: ` ${email}!`, // Replace UserName with the actual user name
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            width: "220px",
          },
        });
        Cookies.set("email", email);
        Cookies.set("username",username)
        Cookies.set("role",role)
        Cookies.set("clientname",clientname)        
        navigate("/form", { replace: true });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        notification.error({
          message: "Email or Password or UserType is incorrect",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            width: "290px",
          },
        });
      } else {
        notification.warning({
          message: "Something went wrong",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            width: "220px",
          },
        });
      }
    }
    finally {
      setLoading(false); // Set loading to false after the request is complete (success or failure)
    }
  }    

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Usertype: "",
    User_Id: "0",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <div style={{ marginLeft: "-180px" }}>
      <NavBar />
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main" }}
              style={{ marginTop: "60px" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="Email"
                onChange={handleInputChange}
                autoFocus
                value={formData.Email}
                InputProps={{
                  maxLength: 24,
                }}
                helperText={
                  formData.Email.length > 24
                    ? `Maximum character limit reached (${formData.Email.length} / 24)`
                    : `${formData.Email.length} / 24 characters`
                }
                error={formData.Email.length > 24} // Set error state based on length
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="password"
                type="password"
                value={formData.Password}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
export default Login;
