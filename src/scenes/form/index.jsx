
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

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userName = Cookies.get('username');
  const role = Cookies.get('role');
  const isEmployee = role === "Employee";

  const handleFormSubmit = async (values) => {
    try {
      // Convert the data to a JSON object
      const jsonData = {
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
      // Send data as JSON object
      const response = await axios.post('https://ybillingapi.bsite.net/api/CamerasInfo', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check the response message and show an alert
      if (response.data === "Data Added") {
        alert('Data added successfully!');
      } else {
        alert('Failed to add data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        console.error('Response Data:', error.response.data);
       
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Add Details" subtitle="Add New Details of Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
                  value={values.position}
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
           
              {!isEmployee && (
                  <Button type="submit" color="secondary" variant="contained">
                  Add New Camera
              </Button>
              )}
              
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
const initialValues = {
  username: "",
  password: "",
  externalip: "",
  port: "",
  channel: "",
  position: "",
  floorno: "",
  location: "",
};

export default Form;
