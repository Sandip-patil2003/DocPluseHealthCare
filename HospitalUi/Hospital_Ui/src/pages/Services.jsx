import React from "react";
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeroImage from '../img/Back.png'; // Ensure you have an appropriate image in assets

const HeroSection = styled(Box)({
  background: "linear-gradient(90deg, #b2f0ff 0%, #e0f7fa 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "48px 32px 24px 32px",
  minHeight: 220,
  borderRadius: "0 0 32px 32px",
  marginBottom: 32,
  position: 'relative',
  overflow: 'hidden',
});

const HeroImg = styled('img')({
  width: 240,
  borderRadius: 24,
  position: 'absolute',
  right: 200,
  bottom: 0,
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'scale(1.08) ',
  },
});

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  transition: "box-shadow 0.3s, transform 0.3s",
  '&:hover': {
    boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
    transform: "translateY(-6px) scale(1.03)",
  },
}));

const BenefitsIcon = styled(Box)({
  color: '#7c4dff',
  fontSize: 40,
  marginBottom: 8,
  transition: 'transform 0.3s',
  '&:hover': {
 
  },
});

const AnimatedServicePaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  minHeight: 220,
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  transition: "box-shadow 0.3s, transform 0.3s",
  '&:hover': {
    boxShadow: "0 8px 32px rgba(124,77,255,0.18)",
    transform: "translateY(-8px) scale(1.04)",
    borderColor: '#7c4dff',
  },
}));

const AnimatedIconBox = styled(Box)({
  color: '#7c4dff',
  mb: 2,
  transition: 'transform 0.4s',
  display: 'inline-block',
  '&:hover': {
    transform: 'scale(1.2) rotate(-8deg)',
  },
});

const ServicesPage = () => (
  <>
    <HeroSection>
      <Box sx={{ pt: 4, pl: 2 }}>
        <Typography variant="h3" fontWeight="bold" color="#fff" sx={{ mb: 2, marginLeft: 19 }}>
          Services
        </Typography>
      </Box>
      <HeroImg src={HeroImage} alt="Services" />
    </HeroSection>

    <Box sx={{ px: { xs: 2, md: 8 }, py: 2 }}>
      <AnimatedPaper>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          eScribe - Medical Scribe
        </Typography>
        <Typography variant="body1">
          Medical scribes document physician and patient interactions during treatment. They transcribe a patient's information to the EHR, allowing physicians to save time and focus on the patient rather than the documentation. Use of scribes results in lower documentation burden, improved efficiency and better patient-physician interaction.
        </Typography>
      </AnimatedPaper>

      <AnimatedPaper sx={{ background: 'rgba(245,250,255,0.7)', boxShadow: 'none' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          What Is A Medical Scribe?
        </Typography>
        <Typography variant="body1">
          Medical scribes document physician and patient interactions during treatment. They transcribe a patient's information to the EHR, allowing physicians to save time and focus on the patient rather than the documentation. Use of scribes results in lower documentation burden, improved efficiency, and better patient-physician interaction.
        </Typography>
      </AnimatedPaper>

      <Box sx={{ mt: 6, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 4 }}>
          Benefits Of EScribe - Medical Scribe
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <AnimatedPaper sx={{ minHeight: 220 }}>
              <BenefitsIcon>
                <PersonIcon fontSize="inherit" />
              </BenefitsIcon>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Better Patient Interactions
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Adroit's eScribe - Medical Scribe person improves the physician-patient relationship because the physician is able to pay full attention to the patient and is not distracted by data entry.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: '#7c4dff' }} />
                  </ListItemIcon>
                  <ListItemText primary="As per a recent study, 57 percent patients said their physicians spent less time than usual on the computer during the visit when they were assisted by a remote live medical scribe." />
                </ListItem>
              </List>
            </AnimatedPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedPaper sx={{ minHeight: 220 }}>
              <BenefitsIcon>
                <CalendarMonthIcon fontSize="inherit" />
              </BenefitsIcon>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Higher Physician Productivity
              </Typography>
              <Typography variant="body1">
                Allows physicians to see more patients as they are not burned out by documentation.
              </Typography>
            </AnimatedPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Product Development Services Section */}
      <Box sx={{ mt: 10, mb: 6 }}>
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, background: '#fafbfc' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            Product Development Services
          </Typography>
          <Typography variant="body1" sx={{ color: '#444' }}>
            Adroit Infosystems is a leading healthcare software development company. We develop high quality, reliable and cost-effective healthcare software.
          </Typography>
        </Paper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <AnimatedServicePaper>
              <AnimatedIconBox>
                <svg width="32" height="32" fill="currentColor"><path d="M16 2a2 2 0 0 1 2 2v2h-4V4a2 2 0 0 1 2-2zm-6 6a2 2 0 0 1 2 2v2H6V10a2 2 0 0 1 2-2zm12 0a2 2 0 0 1 2 2v2h-4V10a2 2 0 0 1 2-2zM6 16a2 2 0 0 1 2 2v2H4v-2a2 2 0 0 1 2-2zm20 0a2 2 0 0 1 2 2v2h-4v-2a2 2 0 0 1 2-2zM16 30a2 2 0 0 1-2-2v-2h4v2a2 2 0 0 1-2 2zm-6-6a2 2 0 0 1-2-2v-2h4v2a2 2 0 0 1-2 2zm12 0a2 2 0 0 1-2-2v-2h4v2a2 2 0 0 1-2 2z"/></svg>
              </AnimatedIconBox>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Software Development & Services
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                We at Adroit understand the challenges associated with Software Product Development & Product Engineering. We adopt a Software Product Release Process that reduces cost of software product development considerably while keeps control on the product architecture, offering better ROI to start-ups, mid-size companies and ISVs.
              </Typography>
            </AnimatedServicePaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedServicePaper>
              <AnimatedIconBox>
                <svg width="32" height="32" fill="currentColor"><circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="16" cy="16" r="6" fill="currentColor"/></svg>
              </AnimatedIconBox>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Software Product Development Spans
              </Typography>
              <Typography variant="body2" component="div">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>Product Conceptualization</li>
                  <li>Product Migration & Software Porting</li>
                  <li>Independent Quality Assurance & Testing</li>
                  <li>Product Re-engineering</li>
                  <li>Full Product/Software Testing Cycle & quality assurance (QA)</li>
                  <li>Product Enhancements</li>
                  <li>Product Maintenance & Support</li>
                </ul>
              </Typography>
            </AnimatedServicePaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedServicePaper>
              <AnimatedIconBox>
                <svg width="32" height="32" fill="currentColor"><path d="M4 28V4h24v24H4zm2-2h20V6H6v20zm6-8h8v2h-8v-2zm0-4h8v2h-8v-2zm0-4h8v2h-8V10z"/></svg>
              </AnimatedIconBox>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Software Product Development & Services: Advantages
              </Typography>
              <Typography variant="body2" component="div">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>Transparent and Proven Software Product Development Methodology</li>
                  <li>Intellectual Property Protection</li>
                  <li>Highly Qualified People & Intellectually Work Environment</li>
                  <li>Dedicated Infrastructure</li>
                  <li>Faster time to market</li>
                </ul>
              </Typography>
            </AnimatedServicePaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedServicePaper>
              <AnimatedIconBox>
                <svg width="32" height="32" fill="currentColor"><rect x="6" y="6" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor"/></svg>
              </AnimatedIconBox>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                End-to-end services
              </Typography>
              <Typography variant="body2" component="div">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>Software Product Development</li>
                  <li>IT Services</li>
                  <li>Managed Services</li>
                  <li>Resource Augmentation</li>
                  <li>As a proactive Product Development & IT Services partner, we empower our global clients with optimal solutions through our focused Competency Centers.</li>
                </ul>
              </Typography>
            </AnimatedServicePaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </>
);

export default ServicesPage;
