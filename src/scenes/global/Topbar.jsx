import { Box, useTheme, Button, Typography  } from "@mui/material";
import {  tokens } from "../../theme";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const userName = Cookies.get('username');

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('role');
    Cookies.remove('username');

    // Navigate to the root path
    navigate('/login');
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{
      backgroundColor: '#12234c', // Replace 'blue' with the desired color
    }}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems = "center"
        backgroundColor='transparent'
        borderRadius="0px"
      >
        <b>
        <Typography variant="body1" sx={{ mr: 2, color: '#FFFFFF' }}>
            Logged in as: {userName}
        </Typography>
        </b>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <Button
        onClick={handleLogout}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              color: "#FFFFFF", // White color on hover
            },
          }}
        >
          Logout
      </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
