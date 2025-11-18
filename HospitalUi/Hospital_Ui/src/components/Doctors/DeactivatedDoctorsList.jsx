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
  Button,
  inputAdornmentClasses,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Loader from "../common/Loader";
import { getDoctors, updateDoctor } from "../../api/doctorsApi";

const DeactivatedDoctorsList = ({ onActivated }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDeactivatedDoctors = async () => {
    try {
      const res = await getDoctors();
      const deactivated = res.data.filter((r) => r.active === false);
      setDoctors(deactivated);
    } catch (err) {
      console.error("Error loading deactivated doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (doctor) => {
    try {
      const id = doctor.doctorId;
      const updated = {
        active: true,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        specialty: doctor.specialty,
        phone: doctor.phone,
        doctorId: id
      };
      console.log(updated);
      console.log(id);
      await updateDoctor(id, updated);
      setDoctors((prev) => prev.filter((d) => d.doctorId !== doctor.doctorId));
      if (onActivated) onActivated();
    } catch (err) {
        console.log(err);
      alert("Error activating doctor. Please try again.");
    }
  };

  useEffect(() => {
    loadDeactivatedDoctors();
  }, []);

  if (loading) return <Loader />;

  return (
    <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 4, background: "#fff", margin:"40px 25px" }}>
      <Typography variant="h6" color="secondary" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Deactivated Doctors
      </Typography>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow sx={{ background: "linear-gradient(90deg, #fce4ec 0%, #f8bbd0 100%)" }}>
            <TableCell sx={{ fontWeight: 700, color: '#ad1457' }}>Sr.no</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#ad1457' }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#ad1457' }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#ad1457' }}>Specialty</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#ad1457' }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#ad1457' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor, idx) => (
            <TableRow key={doctor.doctorId}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{doctor.firstName}</TableCell>
              <TableCell>{doctor.lastName}</TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleActivate(doctor)} title="Activate Doctor">
                  <CheckCircleIcon color="success" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DeactivatedDoctorsList;
