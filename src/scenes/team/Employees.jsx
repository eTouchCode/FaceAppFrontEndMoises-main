import { useEffect, useState, useCallback } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from 'axios';
import Cookies from "js-cookie";
import {  useNavigate  } from "react-router-dom";
import { notification } from "antd";
import { useLocation } from "react-router-dom";

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const { clientname } = location.state || {};
  const username = Cookies.get("username");
  const clientnameToUse = clientname || username; 
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [dataGridKey, setDataGridKey] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCellClick = (params) => {
    const clickTime = new Date().getTime();
    const doubleClickThreshold = 300;

    if (clickTime - lastClickTime < doubleClickThreshold) {
      handleCellDoubleClick(params.row.clientname);
    }

    setLastClickTime(clickTime);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://ybillingapi.bsite.net/api/User/getallemployeesbyclient",
        {
          clientname: clientnameToUse,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const formattedData = response.data.map((item, index) => ({
        ...item,
        gridid: index + 1,
      }));
      setData(formattedData);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [clientnameToUse]);

  useEffect(() => {
    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded, fetchData]);

  const handleCellDoubleClick = (clientname) => {
    navigate(`/employeedetails`, { state: { clientname } });
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleDeleteClick = async () => {
    
    try {
      setLoading(true);
      if (selectedRows.length > 0) {
       
        const selectedIds = selectedRows.map((user_id) => user_id);
        const response = await axios.delete(
          "https://ybillingapi.bsite.net/api/User/DeleteUserByIds",
          {
            data: selectedIds,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response && response.status === 200) {
          notification.success({
            message: "Success!",
            description: "Data Deleted Successfully",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              width: "220px",
            },
          });
          fetchData();
        }
        else{
          notification.error({
            message: "Error!",
            description: "Something went wrong",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              width: "220px",
            },
          });
        }
      }
      //setLoading(false);
    } catch (error) {
      notification.error({
        message: "Error!",
        description: "Something went wrong",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
          width: "220px",
        },
      });
    }
    finally {
      setLoading(false);
    }
  };


  const columns = [
    { field: "gridid", headerName: "ID", width: 40 },
    {
      field: "username",
      headerName: "Emp Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      flex: 1,
    },
    {
        field: "clientname",
        headerName: "ClientName",
        type: "string",
        flex: 1,
      },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "SuperAdmin"
                ? colors.greenAccent[600]
                : role === "Admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Employees Details" subtitle="Managing the Employee Members" />
      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteClick}
        disabled={selectedRows.length === 0 || loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Deleting Selected..." : "Delete Selected"}
       
      </Button>
      
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
            fontSize: "14px",
          },
        }}
      >
        <DataGrid
        key={dataGridKey}
        checkboxSelection
        rows={data}
        columns={columns}
        onCellClick={handleCellClick}
        onSelectionModelChange={handleSelectionModelChange}
        getRowId={(row) => row.user_id}
      />
      </Box>
    </Box>
  );
};

export default Employees;
