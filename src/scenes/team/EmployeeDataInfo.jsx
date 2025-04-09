import React, { useEffect, useState, useCallback } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import AdminEdit from "./AdminEdit";
import Cookies from "js-cookie";
import {  useNavigate  } from "react-router-dom";
import { notification } from "antd";

const EmployeeDataInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Role = Cookies.get("role");
  const ClientName = Cookies.get("username");
  
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [dataGridKey, setDataGridKey] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = useCallback(async () => {
    try {
      let response;
        if (Role === "SuperAdmin" || Role === "Admin") {
            response = await axios.get("https://ybillingapi.bsite.net/api/EmployeeData");
          } 
          
          
          else 
          {
                 response = await axios.post(
                    "https://ybillingapi.bsite.net/api/EmployeeData/getallemployeesbyclient",
                    {
                      clientname: ClientName,
                      
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                }
            );
          }

      const formattedData = response.data.map((item, index) => ({
        ...item,
        gridid: index + 1,
      }));
      setData(formattedData);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [ClientName, Role, setData, setDataLoaded]);

  const handleCellClick = (params) => {
    if (Role !== "SuperAdmin" && Role !== "Admin" && Role !== "Employee") {
    const clickTime = new Date().getTime();
    const doubleClickThreshold = 300;

    if (clickTime - lastClickTime < doubleClickThreshold) {
        handleCellDoubleClick(params.row.employeename);
    }

    setLastClickTime(clickTime);
  }
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchData();
    }
  }, [dataLoaded, fetchData]);

  const handleCellDoubleClick = (employeeName) => {
    if (Role !== "SuperAdmin" && Role !== "Admin" && Role !== "Employee") {
    navigate(`/reports`, { state: { employeeName: employeeName, clientName: ClientName } });
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleDeleteClick = async () => {
    
    try {
      setLoading(true);
      if (selectedRows.length > 0) {
        const selectedRowsData1 = data.filter((row) => selectedRows.includes(row.id));
        const dataToSend1 = selectedRowsData1.map(({ employeename }) => ({ employeename, clientname: ClientName }));  
        const selectedIds = selectedRows.map((user_id) => user_id);
        const response = await axios.delete(
          "https://ybillingapi.bsite.net/api/EmployeeData/DeleteUserByIds",
          {
            data: selectedIds,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response1 = await axios.post(
          "https://bem-te-vi-ponto.rj.r.appspot.com/delete",
          dataToSend1, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
  
        if (response && response.status === 200 && response1 && response1.status === 200) {
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
      //setLoading(false);
    }
    finally {
      setLoading(false); // Set loading to false after the request is complete (success or failure)
    }
  };

  

  const columns = [
    { field: "gridid", headerName: "ID", width: 40 },
    {
      field: "employeename",
      headerName: "Employee Name",
      flex: 1,
    },
    {
      field: "noofimages",
      headerName: "No Of Images",
      type: "string",
      flex: 1,
    },
    {
        field: "dateentered",
        headerName: "Date Entered",
        type: "string",
        flex: 1,
      },
   
  ];

  return (
    <Box m="20px">
      <Header title="Employee Data For Training" subtitle="Managing the Employee Data on the cloud" />
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
            fontSize: "14px", // Adjust the font size for rows
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
        getRowId={(row) => row.id}
      />

      {editFormOpen && (
        <AdminEdit
          rowData={selectedRowData}
          onClose={() => {
            setEditFormOpen(false);
            setSelectedRowData(null);
            setDataGridKey((prevKey) => prevKey + 1);
          }}
          setDataGridKey={setDataGridKey} // Pass the function as a prop
        />
      )}
      </Box>
    </Box>
  );
};

export default EmployeeDataInfo;
