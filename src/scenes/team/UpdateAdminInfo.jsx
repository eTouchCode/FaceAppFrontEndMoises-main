import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const UpdateAdminInfo = () => {

  const location = useLocation();
  const { rowData } = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: rowData.user_id,
    email: rowData.email || "",
    username: rowData.username || "",
    role: rowData.role || "",
  });

  useEffect(() => {
    setFormData({
      user_id: rowData.user_id,
      email: rowData.email || "",
      username: rowData.username || "",
      role: rowData.role || "",
    });
  }, [rowData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username, role } = formData;

    if (email === "" || username === "" || role === "") {
      return;
    }

    try {
      const response = await axios.put(
        "https://ybillingapi.bsite.net/api/User/updateadmininfo",
        formData
      );

      if (response && (response.status === 200 || response.status === 204)) {
        notification.success({
          message: "Information Updated!",
          description: "Record has been updated successfully", // Replace UserName with the actual user name
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            width: "220px",
          },
        });
       
        navigate("/adminsdetails", { replace: true });
        
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("Something went wrong. Please check if Email and Username is correct.");
      } else {
        console.error("Error occurred during update:", error);
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
            Update Role
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
              InputProps={{
                readOnly: true}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              value={formData.username}
              onChange={handleInputChange}
              InputProps={{
                readOnly: true}}
            />

            <FormControl margin="normal" required fullWidth>
              <InputLabel>User Role</InputLabel>
              <Select
                label="User Role"
                name="role"
                value={formData.role || ""}
                onChange={handleInputChange}
              >
                
                <MenuItem key="SuperAdmin" value="SuperAdmin">
                    SuperAdmin
                </MenuItem>
                <MenuItem key="Admin" value="Admin">
                    Admin
                </MenuItem>
                   
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default UpdateAdminInfo;
