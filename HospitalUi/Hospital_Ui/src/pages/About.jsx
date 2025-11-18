import React from "react";
import { Box, Container, Grid, Typography, Paper, Avatar } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InsightsIcon from "@mui/icons-material/Insights";

const StatCard = ({ value, label }) => (
  <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: 3 }}>
    <Typography variant="h4" color="primary" fontWeight={700}>{value}</Typography>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
  </Paper>
);

const About = () => {
  return (
    <>
      <Box sx={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%)', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h3" fontWeight={800} color="primary" gutterBottom>
                About DocPulse Hospital
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We are committed to delivering world‑class healthcare with compassion and innovation.
                Our multi‑disciplinary team of specialists provides comprehensive care, supported by
                cutting‑edge technology and a patient‑first approach.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
                  <LocalHospitalIcon />
                </Avatar>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64 }}>
                  <VolunteerActivismIcon />
                </Avatar>
                <Avatar sx={{ bgcolor: 'primary.dark', width: 64, height: 64 }}>
                  <InsightsIcon />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}><StatCard value="250+" label="Specialist Doctors" /></Grid>
          <Grid item xs={12} md={4}><StatCard value="50k+" label="Patients Served" /></Grid>
          <Grid item xs={12} md={4}><StatCard value="98%" label="Patient Satisfaction" /></Grid>
        </Grid>
      </Container>

      <Container sx={{ pb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Our Mission</Typography>
              <Typography variant="body2" color="text.secondary">
                To provide accessible, high‑quality care that improves outcomes and enhances lives,
                while fostering trust, research, and continuous improvement.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Our Values</Typography>
              <Typography variant="body2" color="text.secondary">
                Compassion, excellence, integrity, and collaboration guide every interaction with our
                patients and community.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default About;


