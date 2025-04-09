import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from '@mui/icons-material/People';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import MonthlyComparisonChart from "../bar/MonthlyComparisonChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="112"
            subtitle={<span style={{ color: colors.greenAccent[500] }}>People Interested</span>}
           
            progress="0.70"
            increase="+44%"
            icon={
              <EmailIcon
                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
              title="5,746"
              subtitle={<span style={{ color: colors.greenAccent[500] }}>Sales Obtained</span>}
              progress="0.60"
              increase="+33%"
              
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
                />
              }
            />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="15"
            subtitle={<span style={{ color: colors.greenAccent[500] }}>New Clients</span>}
           
            progress="0.90"
            increase="+90%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle={<span style={{ color: colors.greenAccent[500] }}>New Employees</span>}
            
            progress="0.80"
            increase="+43%"
            icon={
              <PeopleIcon
                sx={{ color: colors.blueAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Monthly Attendance1
              </Typography>
        
            </Box>
          </Box>
          <Box height="150px" m="-20px 0 0 0">
            <MonthlyComparisonChart isDashboard={true} />
          </Box>
        </Box>
      
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Monthly Attendance
          </Typography>
          <Box height="250px" mt="-20px">
            <LineChart  isDashboard={true} />
          </Box>
        </Box>
       
      </Box>
    </Box>
  );
};

export default Dashboard;
