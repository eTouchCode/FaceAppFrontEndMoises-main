import { useEffect, useState, useCallback  } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { notification } from "antd";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const ClientName = Cookies.get("username");
  const Role = Cookies.get("role");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://ybillingapi.bsite.net/api/CamerasInfo/username",
        {
          clientname: ClientName,
          role: Role,
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
      localStorage.setItem('DataLoaded', 'true');
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [ClientName, Role, setData, setDataLoaded]);

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      if (selectedRows.length > 0) {
       
        const selectedIds = selectedRows.map((id) => id);
       
        const response = await axios.delete(
          "https://ybillingapi.bsite.net/api/CamerasInfo/DeleteInfoByIds",
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
  
          // Refresh data after delete
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
  
  const handleCellDoubleClick = (params) => {
    navigate("/updatecamerainfo", { state: { rowData: params.row } });
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchData();
    }
  }, []);

  const columns = [
    { field: "gridid", headerName: "ID", width: 40 },
    {
      field: "username",
      headerName: "User Name",
      width: 80,
      cellClassName: "name-column--cell",
    },
    {
      field: "password",
      headerName: "Password",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ip",
      headerName: "External IP",
      flex: 1,
    },
    {
      field: "port",
      headerName: "Port",
      width: 40,
    },
    {
      field: "position",
      headerName: "Position",
      width: 80,
    },
    {
      field: "floorno",
      headerName: "Floor No",
      width: 40,
    },
    {
      field: "location",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "clientname",
      headerName: "Client User Name",
      flex: 1,
      renderCell: ({ row: { clientname } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              clientname === "SuperAdmin"
                ? colors.greenAccent[600]
                : clientname === "Admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {clientname === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {clientname === "Client" && <SecurityOutlinedIcon />}
            {clientname === "Employee" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {clientname}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Cameras Info" subtitle="Managing the Camera Details" />
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
          checkboxSelection
          rows={data}
          columns={columns}
          onCellDoubleClick={handleCellDoubleClick}
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </Box>
  );
};

export default Team;
