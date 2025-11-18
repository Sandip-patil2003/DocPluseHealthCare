import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Typography, IconButton,
  Container
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../common/Loader";
import { getAppointments, deleteAppointment } from "../../api/appointmentsApi";

const AppointmentsList = ({ onEdit }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const res = await getAppointments();
      
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    } 8
  };

  const handleDelete = async (id) => { 
    if (window.confirm("Delete this appointment?")) {
      await deleteAppointment(id);
      loadAppointments();
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);
  

  if (loading) return <Loader />;

  return (
    <Container>
      <Paper elevation={4} sx={{
        p: 4,
        mb: 4,
        mt: 6,
        borderRadius: 4,
        boxShadow: "0 4px 24px rgba(33,150,243,0.10)",
        background: "#fff"
      }}>
        <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          Appointments List
        </Typography>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)" }}>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Sr.no</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Doctor Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((a, idx) => (
              <TableRow
                key={a.appointmentId}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#f5fafd' : '#e3f2fd',
                  '&:hover': { backgroundColor: '#bbdefb' }
                }}
              >
                <TableCell>{idx+1}</TableCell>
                <TableCell>{a.patientName}</TableCell>
                <TableCell>{a.doctorName}</TableCell>
                <TableCell>{new Date(a.appointmentDate).toLocaleString()}</TableCell>
                <TableCell>{a.reason}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(a)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(a.appointmentId)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );           
};

export default AppointmentsList;
