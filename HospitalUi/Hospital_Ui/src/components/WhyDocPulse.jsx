import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import HealingIconImg from '../img/7.png';
import CloudQueueIconImg from '../img/3.png';
import AttachMoneyIconImg from '../img/4.png';
import SecurityIconImg from '../img/security.png';
import MedicalServicesIconImg from '../img/10.png';
import Diversity3IconImg from '../img/8.png';

// Custom hexagon-like styling
const HexPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ccf0ff",
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: "24px 24px 0 0",
  minHeight: "320px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  '&:hover': {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  },
}));

const features = [
  {
    icon: HealingIconImg,
    title: "Complete Healthcare Solution",
    description: "Fully integrated modular software architecture with seamless data flow between departments for effortless patient data management.",
  },
  {
    icon: CloudQueueIconImg,
    title: "Stable Cloud Solution",
    description: "Proven >99.99% uptime for more than a decade in service. Mobile apps for doctors and patients.",
  },
  {
    icon: AttachMoneyIconImg,
    title: "Affordable",
    description: "Transparent, and modular pricing for scalability with a low upfront investment.",
  },
  {
    icon: SecurityIconImg,
    title: "Secure & Reliable",
    description: "Robust security protocols and data privacy policy safeguards customer data, ensuring confidentiality without any data commercialization.",
  },
  {
    icon: MedicalServicesIconImg,
    title: "Patient-Centric Design",
    description: "24/7 appointment booking, instant notifications, feedback tools, and telemedicine platforms for higher patient engagement.",
  },
  {
    icon: Diversity3IconImg,
    title: "Established Trust",
    description: "Trusted by renowned clinics, hospitals, and multi-chain facilities across India and overseas.",
  },
];

const WhyDocPulse = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#f5faff", marginTop: "80px" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Why DocPulse?
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4, px: { xs: 0, sm: 4, md: 8 } }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <HexPaper elevation={3} sx={{ width: 320, minHeight: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', mx: 'auto' }}>
              <Box mb={2} sx={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={feature.icon} alt={feature.title} style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1">
                {feature.description}
              </Typography>
            </HexPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyDocPulse;
