import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Typography, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../common/Loader";
import { getPrescriptions, deletePrescription } from "../../api/prescriptionsApi";

const PrescriptionsList = ({ onEdit }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPrescriptions = async () => {
    try {
      const res = await getPrescriptions();
      setPrescriptions(res.data);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this prescription?")) {
      await deletePrescription(id);
      loadPrescriptions();
    }
  };

  useEffect(() => {
    loadPrescriptions();
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
        Prescriptions List
      </Typography>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow sx={{ background: "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)" }}>
             <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Sr.no</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Patient Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Doctor Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Medication</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Dosage</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Date Prescribed</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptions.map((p, idx) => (
            <TableRow
              key={p.prescriptionId}
              sx={{
                backgroundColor: idx % 2 === 0 ? '#f5fafd' : '#e3f2fd',
                '&:hover': { backgroundColor: '#bbdefb' }
              }}
            >
              <TableCell>{idx+1}</TableCell>
              <TableCell>{p.patientName}</TableCell>
              <TableCell>{p.doctorName}</TableCell>
              <TableCell>{p.medication}</TableCell>
              <TableCell>{p.dosage}</TableCell>
              <TableCell>{new Date(p.datePrescribed).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(p)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(p.prescriptionId)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PrescriptionsList;
