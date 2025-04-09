import React, {useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Register from "./scenes/superadmin/Signup";
import UpdatePassword from "./scenes/superadmin/UpdatePassword";
import AddCustomer from "./scenes/form/AddCustomer";
import Cookies from "js-cookie"; 
import Login from "./scenes/superadmin/Login";
import AttendanceReports from "./scenes/team/AttendanceReports";
import Clients from "./scenes/team/Clients";
import Admins from "./scenes/team/Admins";
import "./RouterHome.css"
import UpdateAdminInfo from "./scenes/team/UpdateAdminInfo";
import UpdateCameraInfo from "./scenes/team/UpdateCameraInfo";
import Employees from "./scenes/team/Employees";
import UnderMaintenance from "./scenes/team/UnderMaintenance";
import EmployeeDataInfo from "./scenes/team/EmployeeDataInfo";
import EmployeeAttendanceReports from "./scenes/team/EmployeeAttendance";
import PredictName from "./scenes/form/predictname";

function RouterHome() {
  
  const userEmail = Cookies.get("email");
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail==="undefined") {
      navigate("/login")
    }
  }, [userEmail, navigate]);

  if (userEmail) {
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <div className="content1">
            <Routes>
              <Route
                  path="/"
                  element={<Navigate to="/landing" replace />}
                />
               <Route path="/landing" element={<Dashboard />} /> 
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<Form />} />
              <Route path="/register" element={<Register />} /> 
              <Route path="/updatepassword" element={<UpdatePassword />} /> 
              <Route path="/adddata" element={<AddCustomer />} />
              <Route path="/predictname" element={<PredictName />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reports" element={<AttendanceReports />} />
              <Route path="/clientsdetails" element={<Clients />} />
              <Route path="/adminsdetails" element={<Admins />} />
              <Route path="/employeedetails" element={<Employees />} />
              <Route path="/updateadmininfo" element={<UpdateAdminInfo />} />
              <Route path="/updatecamerainfo" element={<UpdateCameraInfo />} />
              <Route path="/employeedata" element={<EmployeeDataInfo />} />
              <Route path="/allattendance" element={<EmployeeAttendanceReports />} />
              <Route path="/about" element={<UnderMaintenance />} />
              <Route path="/contactus" element={<UnderMaintenance />} />
              <Route path="/faq" element={<FAQ />} />
              <Route
                    path="*"
                    element={<Navigate to="/form" replace />}
                  />
            </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
else {
  return <Login />;
}
}

export default RouterHome;