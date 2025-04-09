
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
  } from '@mui/material';
  import { Formik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import Header from "../../components/Header";
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
  
  const UpdateCameraInfo = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const userName = Cookies.get('username');
    const location = useLocation();
    const { rowData } = location.state;
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    id: rowData.id,
    password: rowData.password || "",
    username: rowData.username || "",
    externalip: rowData.ip || "",
    port: rowData.port || "",
    channel: rowData.channel || "",
    position: rowData.position || "",
    floorno: rowData.floorno || "",
    location: rowData.location || "",

  });

  useEffect(() => {
    if (rowData && rowData.position !== undefined) {
      setFormData({
        id: rowData.id,
        password: rowData.password || "",
        username: rowData.username || "",
        externalip: rowData.ip || "",
        port: rowData.port || "",
        channel: rowData.channel || "",
        position: rowData.position || "",
        floorno: rowData.floorno || "",
        location: rowData.location || "",
      });
    }
  }, [rowData]);
  
    const handleFormSubmit = async (values) => {
      try {
        // Convert the data to a JSON object
        const jsonData = {
          id: rowData.id,
          username: values.username,
          password: values.password,
          ip: values.externalip,
          port: values.port,
          channel: values.channel,
          position: values.position,
          floorno: values.floorno,
          location: values.location,
          clientname: userName, // You can set this value or get it from somewhere 
        };
        const response = await axios.put(`https://ybillingapi.bsite.net/api/CamerasInfo/${jsonData.id}`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
        },
        });
    
        // Check the response message and show an alert
        if (response.data === "Data Updated") {
          notification.success({
            message: "Success!",
            description: "Data Updated successfully!",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              width: "220px",
            },
          });
          navigate("/team", { replace: true });
          //alert('Data Updated successfully!');
        } else {
          notification.error({
            message: "Error!",
            description: "Failed to add data. Please try again.",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              width: "220px",
            },
          });
        }
      } catch (error) {
        notification.error({
          message: "Error!",
          description: "Something went wrong.",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
            width: "220px",
          },
        });
      }
    };

    if (!rowData) {
        return (
          <div>
            <p>Loading...</p>
        
          </div>
        );
      }
  
    return (
      <Box m="20px">
        <Header title="Update Details" subtitle="Update Details of Camera" />
    
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={formData}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="External IP"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.externalip}
                  name="externalip"
                  error={!!touched.externalip && !!errors.externalip}
                  helperText={touched.externalip && errors.externalip}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Port"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.port}
                  name="port"
                  error={!!touched.port && !!errors.port}
                  helperText={touched.port && errors.port}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Channel or Stream"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.channel}
                  name="channel"
                  error={!!touched.channel && !!errors.channel}
                  helperText={touched.channel && errors.channel}
                  sx={{ gridColumn: "span 2" }}
                />
                
                <FormControl fullWidth variant="filled" sx={{ gridColumn: 'span 2' }}>
                  <InputLabel id="position-label">At Entrance/Exit</InputLabel>
                  <Select
                    labelId="position-label"
                    id="position"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={(values.position || "").toLowerCase()}  // Convert to lowercase
                    name="position"
                    error={!!touched.position && !!errors.position}
                    label="At Entrance/Exit"
                    >
                    <MenuItem value="entrance">Entrance</MenuItem>
                    <MenuItem value="exit">Exit</MenuItem>
                  </Select>
                  {touched.position && errors.position && (
                    <div style={{ color: 'red' }}>{errors.position}</div>
                  )}
                </FormControl>
               
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Floor No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.floorno}
                  name="floorno"
                  error={!!touched.floorno && !!errors.floorno}
                  helperText={touched.floorno && errors.floorno}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Complete Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={!!touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                 
                  type="text"
                  label="Your RTSP URL"
                  value={`rtsp://${values.username}:${values.password}@${values.externalip}:${values.port}/${values.channel}`}
                  InputProps={{
                    readOnly: true,
                    style: {
                      fontSize: '18px',
                      fontWeight: 'bold',
                    },
                  }} // Make it readonly
                  sx={{ gridColumn: 'span 6' }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" sx={{ fontWeight: 'bold' }}>
                  Update Information
                </Button>
                
              </Box>
              <br></br>
             
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
    externalip: yup.string().required("required"),
    port: yup.string().required("required"),

    channel: yup.string().required("required"),
    position: yup.string().required("required"),
    floorno: yup.string().required("required"),
    location: yup.string().required("required"),
  });
  
  export default UpdateCameraInfo;
  