import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";

const defaultTheme = createTheme();

const Register = () => {
  const role = Cookies.get("role");
  const getclientname = Cookies.get("username");
  const shouldRenderItem = role === "SuperAdmin" || role === "Admin";

  const [formData, setFormData] = useState({
    user_id: 0,
    email: "",
    password: "",
    role: "",
    username: "",
    clientname: getclientname
  });

  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (email === "" || password === "") {
      // Handle validation errors
      return;
    }

    try {
      const response = await axios.post(
        "https://ybillingapi.bsite.net/api/User/signup",
        formData
      );
      if (response && response.status === 200) {
        window.alert("Register Successfully");
      }

      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("Email Id or User Name Already registered");
      } 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
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
              name="email"
              onChange={handleInputChange}
              autoFocus
              value={formData.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <FormControl margin="normal" required fullWidth>
              <InputLabel>User Role</InputLabel>
              <Select
                label="User Role"
                name="role"
                value={formData.role || ""}
                onChange={handleInputChange}
              >
                {shouldRenderItem ? (
                  [
                    <MenuItem key="SuperAdmin" value="SuperAdmin">
                      SuperAdmin
                    </MenuItem>,
                    <MenuItem key="Admin" value="Admin">
                      Admin
                    </MenuItem>,
                    <MenuItem key="Client" value="Client">Client
                    </MenuItem>,
                  ]
                ) : (
                  []
                )}
                
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Register;
