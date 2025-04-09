import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the js-cookie library

import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from "@mui/icons-material/Home";

const PAGES = [];

const HeaderMUI = () => {
  const userEmail=Cookies.get("email")
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("username");
    navigate('/');
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ background: "#00264d" }} style={{width:'100%'}}>
        <Toolbar>
          <Button
            variant="link"
            color="default"
            startIcon={<HomeIcon sx={{ color: "white" }} />}
            
          >
           Yousuf System 
          </Button>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem", paddingLeft: "10%" }}>
              
              </Typography>
            </>
          ) : (
            <>
              <Tabs
                sx={{ margin: "auto" }}
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="secondary"
              >
                {PAGES.map((page, index) => (
                  <Tab label={page} to={page} component={Link} />
                ))}
              </Tabs>
              {userEmail && (
                <Button
                  variant="link"
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        {PAGES.map((page, index) => (
          <Route key={index} exact path={`/${page}`}>
          </Route>
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default HeaderMUI;
