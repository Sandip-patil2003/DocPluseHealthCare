import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import DoctorInfo from "./DoctorInfo";
import DeactivatedDoctorsList from "./DeactivatedDoctorsList";
import Loader from "../common/Loader";
import { getDoctors, deleteDoctor } from "../../api/doctorsApi";

const DoctorsList = ({ onEdit }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDeactivated, setShowDeactivated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const timer = setTimeout(() => setError("") , 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

 

  const loadDoctors = async () => {
    try {
      const res = await getDoctors();
      // Filter only active doctors
      const activeDoctors = res.data.filter((r) => r.active === true);
      setDoctors(activeDoctors);
    } catch (err) {
      console.error("Error loading doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    setError("");
    if (window.confirm("Delete this doctor?")) {
      try {
        await deleteDoctor(id);
        loadDoctors();
      } catch (err) {
        if (err?.response?.status === 500) {
          setError("Please remove this doctor's appointments and prescriptions first.");
        } else {
          setError("Error deleting doctor. Please try again.");
        }
      }
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Paper elevation={4} sx={{
        p: 4,
        mb: 4,
        mt: 6,
        borderRadius: 4,
        boxShadow: "0 4px 24px rgba(33,150,243,0.10)",
        background: "#fff"
      }}>
        <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          Doctors List
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
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Specialty</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor, idx) => (
              <TableRow
                key={doctor.doctorId}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#f5fafd' : '#e3f2fd',
                  '&:hover': { backgroundColor: '#bbdefb' }
                }}
              >
                <TableCell>{idx+1}</TableCell>
                <TableCell>{doctor.firstName}</TableCell>
                <TableCell>{doctor.lastName}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(doctor)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => {
                    setSelectedDoctor(doctor);
                    setInfoOpen(true);
                  }}>
                    <InfoIcon color="info" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(doctor.doctorId)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DoctorInfo open={infoOpen} onClose={() => setInfoOpen(false)} doctor={selectedDoctor} />
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/doctors/deactivated')}
          >
            Deactivated Doctors
          </Button>
        </Box>
      </Paper>
  {/* DeactivatedDoctorsList is now shown on a separate route */}
    </>
  );
};

export default DoctorsList;
