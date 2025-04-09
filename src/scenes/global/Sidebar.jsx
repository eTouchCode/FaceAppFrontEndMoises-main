import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Cookies from 'js-cookie';

const Item = ({ title, to, icon, selected, setSelected }) => {

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: '#FFFFFF',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  

  const role = Cookies.get('role');
  const shouldRenderItem = role === "SuperAdmin" || role === "Admin";
  const isEmployee = role === "Employee";
  const isClient = role === "Client";
  
  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `#12234c !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#FFA500 !important",
        },
        "& .pro-menu-item.active": {
          color: "#FFFF00 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon sx={{ color: "#FFFFFF" }} /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.blueAccent[100],
            }}
          >
            
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="profile-user"
                  width="50px"
                  height="50px"
                  src={`../../assets/logo.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                <Typography variant="h3" color='#FFFFFF'>
                  Face App
                </Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  sx={{
                    "& svg": {
                      fontSize: "25px",
                      color: "#FFFFFF", // Set the default color to white
                    },
                    "&:hover": {
                      "& svg": {
                        color: "#FFFFFF", // Maintain white color on hover
                      },
                    },
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h4"
              color='#FFA500'
              sx={{ m: "15px 0 5px 20px" }}
            >
              Add
            </Typography>
            {(!isEmployee ) && (
              <Item
                title="Camera Info"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="Data & Training"
              to="/adddata"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Test Model"
              to="/predictname"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Typography
              variant="h4"
              color='#FFA500'
              sx={{ m: "15px 0 5px 20px" , }}
            >
              View
            </Typography>
            {(!isEmployee ) && (
              <Item
                title="View Cameras"
                to="/team"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            
            <Item
              title="Attendance Reports"
              to="/allattendance"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
        {shouldRenderItem &&
          <Item
            title="View Clients"
            to="/clientsdetails"
            icon={<MapOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        }
              {role === "SuperAdmin" && (
              <Item
                title="View Admins"
                to="/adminsdetails"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(isClient ) && (
              <Item
                title="Employee Accounts"
                to="/employeedetails"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(!isEmployee ) && (
              <Item
                title="Employee Data"
                to="/employeedata"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          {role !== "Employee" && (
          <>
            <Typography
              variant="h4"
              color='#FFA500'
              sx={{ m: "15px 0 5px 20px" }}
            >
              Admin
            </Typography>
            <Item
              title="Register"
              to="/register"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected} 
            />
            <Item
              title="Update Password"
              to="/updatepassword"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </>
          )}

            <Typography
              variant="h4"
              color='#FFA500'
              sx={{ m: "15px 0 5px 20px" , }}
            >
              Future Links
            </Typography>
            <Item
              title="About Us"
              to="/about"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contact Us"
              to="/contactus"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
