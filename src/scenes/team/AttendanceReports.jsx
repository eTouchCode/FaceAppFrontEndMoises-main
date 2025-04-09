import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from 'axios';
import { useLocation } from "react-router-dom";

const AttendanceReports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const location = useLocation();
  const { employeeName, clientName } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.post(
            "https://ybillingapi.bsite.net/api/EmployeeAttendance/getallemployeesbyemployeeNclient",
            {
              clientname: clientName,
              employeename: employeeName
              
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // Adding auto-incremented ID to the data
          const formattedData = response.data.map((item, index) => ({ ...item, id: index + 1 }));
          setData(formattedData);
         
          setDataLoaded(true);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded]);

  const handleCellDoubleClick = (params) => {
    setSelectedRow(params.row);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "employeename",
      headerName:"Employee Name",
   
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "clientname",
      headerName: "ClientName",
      type: "string",
     
      flex: 1,
    },
    {
      field: "date",
      headerName: "Model Trained On",
      flex: 1,
    },
    {
      field: "entrancetime",
      headerName: "Entrance Time",
      flex: 1,
    },
    {
      field: "exittime",
      headerName: "Exit Time",
      flex: 1,
    },
    {
      field: "totalduration",
      headerName: "Total Duration",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Employee Data ==> Attendance Reports" subtitle="Managing the Attendance Reports" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontSize: "12px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-row": {
            fontSize: "14px", // Adjust the font size for rows
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          onCellDoubleClick={handleCellDoubleClick}
        />
      </Box>
    </Box>
  );
};

export default AttendanceReports;
