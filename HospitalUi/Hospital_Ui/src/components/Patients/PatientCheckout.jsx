import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Paper,Typography,Box,Button,Grid,Divider,List,ListItem,ListItemText,CircularProgress,Avatar,Chip,} from "@mui/material";
import { deletePatient } from "../../api/patientsApi";
import { deletePrescription } from "../../api/prescriptionsApi";
import axios from "axios";

const PatientCheckout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patient = state?.patient;

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!patient?.patientId) return;

      try {
        const response = await axios.get(
          `https://localhost:7222/api/Prescriptions/patient/${patient.patientId}`
        );

        // Add random price to each prescription
        const dataWithPrices = response.data.map((item) => {
          const price = Math.floor(Math.random() * 500) + 100; // ₹100 - ₹600
          return { ...item, price };
        });

        setPrescriptions(dataWithPrices);

        // Calculate total bill
        const total = dataWithPrices.reduce((sum, p) => sum + p.price, 0);
        setTotalBill(total);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patient?.patientId]);

  const handleCheckout = async () => {
    try {
      // Delete all prescriptions for this patient
      await Promise.all(
        prescriptions.map((p) => deletePrescription(p.prescriptionId))
      );
      // Delete the patient
      await deletePatient(patient.patientId);
      navigate("/patients");
    } catch (err) {
      alert("Error checking out patient or prescriptions. Please try again.");
    }
  };

  if (!patient) {
    return <Typography variant="h6" color="error">No patient data found.</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e3f0ff 100%)',  }}>
      <Paper elevation={8} sx={{
        p: 5,
        borderRadius: 6,
        minWidth: 520,
        maxWidth: 600,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        position: 'relative',
        marginTop: "100px", 
        marginBottom:"100px"
      }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: '#1976d2', fontSize: 32, fontWeight: 700, boxShadow: 3 }}>
            {patient.firstName?.[0] || '?'}
          </Avatar>
          <Box>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 800, letterSpacing: 1 }}>
              {patient.firstName} {patient.lastName}
            </Typography>
            <Chip label={patient.gender} color="info" size="small" sx={{ mt: 1, fontWeight: 600 }} />
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">DOB:</Typography></Grid>
          <Grid item xs={6}><Typography>{patient.dateOfBirth}</Typography></Grid>
          <Grid item xs={6}><Typography variant="subtitle2" color="text.secondary">Phone:</Typography></Grid>
          <Grid item xs={6}><Typography>{patient.phone}</Typography></Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1565c0', letterSpacing: 0.5 }}>
          Prescriptions
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={60}>
            <CircularProgress size={28} thickness={5} sx={{ color: '#1976d2' }} />
          </Box>
        ) : prescriptions.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            No prescriptions found for this patient.
          </Typography>
        ) : (
          <List dense sx={{
            bgcolor: 'rgba(255,255,255,0.7)',
            borderRadius: 3,
            boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.08)',
            mb: 2,
            px: 1,
            maxHeight: 220,
            overflowY: 'auto',
          }}>
            {prescriptions.map((p) => (
              <ListItem key={p.prescriptionId} sx={{
                borderBottom: '1px solid #e3e3e3',
                py: 1.2,
                '&:last-child': { borderBottom: 'none' },
              }}>
                <Avatar sx={{ bgcolor: '#90caf9', color: '#0d47a1', width: 40, height: 40, mr: 2, fontWeight: 700 }}>
                  {p.medication?.[0] || '?'}
                </Avatar>
                <ListItemText
                  primary={<>
                    <Typography variant="subtitle1" fontWeight={700} color="#1976d2">{p.medication}</Typography>
                    <Typography variant="body2" color="text.secondary">{p.dosage}</Typography>
                  </>}
                  secondary={<>
                    <Typography variant="caption" color="text.secondary">Doctor: {p.doctorName}</Typography>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <Typography variant="caption" color="text.secondary">Date: {p.datePrescribed}</Typography>
                  </>}
                />
                <Chip label={`₹${p.price}`} color="success" sx={{ fontWeight: 700, fontSize: 16, ml: 2 }} />
              </ListItem>
            ))}
          </List>
        )}

        <Divider sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}>
            Total Bill
          </Typography>
          <Chip label={`₹${totalBill}`} color="primary" sx={{ fontWeight: 700, fontSize: 18, px: 2, height: 32 }} />
        </Box>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{
            mt: 2,
            py: 1.7,
            fontWeight: 800,
            fontSize: 20,
            borderRadius: 3,
            boxShadow: '0 4px 16px 0 rgba(25, 118, 210, 0.12)',
            letterSpacing: 1,
            transition: 'all 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              color: '#0d47a1',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            },
          }}
          onClick={handleCheckout}
          disabled={loading}
        >
          Check Out
        </Button>
      </Paper>
    </Box>
  );
};

export default PatientCheckout;
