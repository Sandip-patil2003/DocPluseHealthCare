// src/components/Patients/PatientsList.js
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../common/Loader";
import { getPatients, deletePatient } from "../../api/patientsApi";

const PatientsList = ({ onEdit }) =>{
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPatients = async () => {
    try {
      const res = await getPatients();
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => setError(""), 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  // const handleDelete = async (id) => {
  //   setError("");
  //   if (window.confirm("Are you sure you want to delete this patient?")) {
  //     try {
  //       await deletePatient(id);
  //       loadPatients();
  //     } catch (err) {
  //       if (err?.response?.status === 500) {
  //         // setError("Please remove this patient's appointments and prescriptions first.");
  //       } else {
  //         setError("Error deleting patient. Please try again.");
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    loadPatients();
  }, []);

  if (loading) return <Loader />;



  return (
    <Paper elevation={4} sx={{
      p: 4,
      mb: 4,
      mt: 6,
      borderRadius: 4,
      boxShadow: "0 4px 24px rgba(33,150,243,0.10)",
      background: "#fff"
    }}>
      <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Patients List
      </Typography>
      {error && (
        <Paper elevation={0} sx={{
          mb: 2,
          p: 2,
          background: 'linear-gradient(90deg, #ffebee 0%, #ffcdd2 100%)',
          border: '1px solid #f44336',
          borderRadius: 2,
          textAlign: 'center',
        }}>
          <Typography sx={{ color: '#b71c1c', fontWeight: 600, fontSize: 16 }}>
            {error}
          </Typography>
        </Paper>
      )}
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow sx={{ background: "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)" }}>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Sr.no</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>DOB</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient, idx) => (
            <TableRow
              key={patient.patientId}
              sx={{
                backgroundColor: idx % 2 === 0 ? '#f5fafd' : '#e3f2fd',
                '&:hover': { backgroundColor: '#bbdefb' }
              }}
            >
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{patient.firstName}</TableCell>
              <TableCell>{patient.lastName}</TableCell>
              <TableCell>{patient.dateOfBirth}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(patient)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  const bill = 1000; // Example static bill, replace with real calculation if needed
                  navigate(`/patients/checkout/${patient.patientId}`, { state: { patient, bill } });
                }}>
                  <CheckoutIcon color="success" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PatientsList;
