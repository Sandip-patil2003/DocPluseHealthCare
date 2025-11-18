import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Link as MuiLink } from "@mui/material";
import { NavLink } from "react-router-dom";
import WhyDocPulse from '../components/WhyDocPulse';
import OurSolutions from "../components/OurSolutions";
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText, Button, Divider, useTheme, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/apiHelper";
import ImageCarousel from "../components/ImageCarousel"; // adjust path
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MedicationIcon from '@mui/icons-material/Medication';

const DashboardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    appointments: [],
    prescriptions: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes, prescriptionsRes] = await Promise.all([
          api.get("/patients"),
          api.get("/doctors"),
          api.get("/appointments"),
          api.get("/prescriptions"),
        ]);

        setCounts({
          patients: patientsRes.data.length,
          doctors: doctorsRes.data.length,
          appointments: appointmentsRes.data.slice(0, 5),
          prescriptions: prescriptionsRes.data.slice(0, 5),
        });
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const cardStyle = {
    padding: 3,
    textAlign: "center",
    borderRadius: 3,
    boxShadow: 4,
    transition: "all 0.3s ease",
    background: "#f9f9f9",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: 6,
    },
  };

  const sectionTitle = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 1,
    color: theme.palette.primary.main,
  };



  return (
    <>
      <Box sx={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%)', py: 6, mb: 2 }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" color="primary" fontWeight={800} gutterBottom>
                Compassionate Care, Modern Facilities
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
                Manage patients, appointments, and prescriptions seamlessly. Empower your staff with
                real‑time data and an intuitive workflow.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={() => navigate("/appointments/book")}>Book Appointment</Button>
                <Button variant="outlined" onClick={() => navigate("/about")}>Learn More</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <ImageCarousel />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ pb: 6 }}>
        <Grid container spacing={2.5}>

          {/* Patients*/}
          <Grid item xs={12} md={3} >
            <Paper sx={cardStyle}>
              <PeopleIcon color="primary" fontSize="large" />
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h3" color="primary">{counts.patients}</Typography>
              <Button variant="contained" onClick={() => navigate("/patients")} sx={{ mt: 2 }}>
                View Patients
              </Button>
            </Paper>
          </Grid>

          {/* Doctors */}
          <Grid item xs={12} md={3}>
            <Paper sx={cardStyle}>
              <LocalHospitalIcon color="success" fontSize="large" />
              <Typography variant="h6">Total Doctors</Typography>
              <Typography variant="h3" color="success.main">{counts.doctors}</Typography>
              <Button variant="contained" color="success" onClick={() => navigate("/doctors")} sx={{ mt: 2 }}>
                View Doctors
              </Button>
            </Paper>
          </Grid>

          {/* Appointments */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ ...cardStyle, textAlign: "left" }}>
              <Box sx={sectionTitle}>
                <EventNoteIcon />
                <Typography variant="h6">Upcoming Appointments</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <List dense>
                {counts.appointments.length === 0 ? (
                  <Typography variant="body2">No upcoming appointments.</Typography>
                ) : (
                  counts.appointments.map((a) => (
                    <ListItem key={a.appointmentId}>
                      <ListItemText
                        primary={`📅 ${new Date(a.appointmentDate).toLocaleString()}`}
                        secondary={`🧑 Patient ID: ${a.patientId} | 👨‍⚕ Doctor ID: ${a.doctorId}`}
                      />
                    </ListItem>
                  ))
                )}
              </List>
              <Box textAlign="center" mt={1}>
                <Button variant="outlined" onClick={() => navigate("/appointments")}>
                  View All Appointments
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Prescriptions */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ ...cardStyle, textAlign: "center" }}>
              <Box sx={sectionTitle}>
                <MedicationIcon />
                <Typography variant="h6">Recent Prescriptions</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <List dense>
                {counts.prescriptions.length === 0 ? (
                  <Typography variant="body2">No recent prescriptions.</Typography>
                ) : (
                  counts.prescriptions.map((p) => (
                    <ListItem key={p.prescriptionId}>
                      <ListItemText
                        primary={`💊 ${p.medication} — ${p.dosage}`}
                        secondary={`🗓 ${new Date(p.datePrescribed).toLocaleDateString()} | Patient ID: ${p.patientId}`}
                      />
                    </ListItem>
                  ))
                )}
              </List>
              <Box textAlign="center" mt={1}>
                <Button variant="outlined" onClick={() => navigate("/prescriptions")}> 
                  View All Prescriptions
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ pb: 8 }}>
        <OurSolutions />
        <Box sx={{ mt: 4 }}>
          <WhyDocPulse />
        </Box>
      </Container>

    </>
  );
};

export default DashboardPage;
