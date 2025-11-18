import React from "react";
import { Box, Typography, Link, Grid, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";

const Footer = () => (
  <Box sx={{ bgcolor: "primary.dark", color: "#fff", mt: "auto" }}>
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>DocPulse Hospital</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Compassionate care, modern facilities, and trusted specialists — 24/7.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <IconButton color="inherit" size="small" href="#" aria-label="facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" size="small" href="#" aria-label="instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" size="small" href="#" aria-label="x">
              <XIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Quick Links</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Link href="/" color="inherit" underline="hover">Home</Link>
            <Link href="/services" color="inherit" underline="hover">Services</Link>
            <Link href="/doctors" color="inherit" underline="hover">Doctors</Link>
            <Link href="/appointments" color="inherit" underline="hover">Appointments</Link>
            <Link href="/contact" color="inherit" underline="hover">Contact</Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Patient Services</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Link href="/appointments/book" color="inherit" underline="hover">Book Appointment</Link>
            <Link href="/patients" color="inherit" underline="hover">Patient Portal</Link>
            <Link href="/prescriptions" color="inherit" underline="hover">Prescriptions</Link>
            <Link href="/doctors/deactivated" color="inherit" underline="hover">Our Departments</Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Contact</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <PlaceIcon fontSize="small" />
            <Typography variant="body2">123 Health Ave, Care City</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <LocalPhoneIcon fontSize="small" />
            <Typography variant="body2">+1 (555) 123-4567</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon fontSize="small" />
            <Typography variant="body2">support@docpulse.com</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>
        &copy; {new Date().getFullYear()} DocPulse Hospital. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="#" color="inherit" underline="hover" variant="caption">Privacy Policy</Link>
        <Link href="#" color="inherit" underline="hover" variant="caption">Terms of Service</Link>
      </Box>
    </Box>
  </Box>
);

export default Footer;
