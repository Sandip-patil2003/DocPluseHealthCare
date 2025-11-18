
import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Grid, IconButton, Avatar, Box, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const DoctorInfo = ({ open, onClose, doctor }) => {
  if (!doctor) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{
      sx: {
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(33,150,243,0.18)',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        p: 0
      }
    }}>
      <DialogTitle sx={{
        background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
        color: '#fff',
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 1,
        pb: 3,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        position: 'relative'
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: '#fff', color: '#1976d2', width: 48, height: 48 }}>
            <LocalHospitalIcon fontSize="large" />
          </Avatar>
          Doctor Details
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 12, top: 12, color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{
        background: 'rgba(255,255,255,0.95)',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        p: 4
      }}>
        <Box textAlign="center" mb={3}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 72, height: 72, mx: 'auto', mb: 1, fontSize: 36, fontWeight: 700 }}>
            {doctor.firstName?.[0]}{doctor.lastName?.[0]}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
            Dr. {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            {doctor.specialty}
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">First Name</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{doctor.firstName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Last Name</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{doctor.lastName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Specialty</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{doctor.specialty}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{doctor.phone}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorInfo;
