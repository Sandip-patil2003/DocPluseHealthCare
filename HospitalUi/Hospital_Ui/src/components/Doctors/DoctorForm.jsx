import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Container, Box, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { addDoctor, updateDoctor } from "../../api/doctorsApi";
import ContactPage from "../../pages/Contact";

const initialState = {
  firstName: "",
  lastName: "",
  specialty: "",
  phone: "",
  active: true,
};

const DoctorForm = ({ selectedDoctor, onSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  let [smg, setsmg]= useState("")

  useEffect(() => {
    if (selectedDoctor) {
      setFormData(selectedDoctor);
    } else {
      setFormData(initialState);
    }
  }, [selectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedDoctor) {
        await updateDoctor(selectedDoctor.doctorId, formData);
        console.log(selectedDoctor.doctorId, formData);
        setsmg("Doctor updated successfully");
      } else {
        console.log(formData);
        await addDoctor(formData);
        setsmg("Doctor added successfully");
      }
      setFormData(initialState);
      let loc = window.location.href
      if (loc == 'http://localhost:5173/doctors/add') {
        setFormData(initialState);
      } else {

        onSuccess();
      }
    } catch (err) {
      console.error("Error submitting doctor:", err);
    }
  };

  let loc = window.location.href
  let sty = null;
  if (loc == 'http://localhost:5173/doctors/add') {

    sty = { marginBottom: "110px", marginTop: "80px" }

  }


  let loca = window.location.href
  if (loca == 'http://localhost:5173/doctors') {
    if (selectedDoctor == null) {
      sty = { display: 'none' }
    }
  }


  return (
    <Container sx={sty}>
      <Paper
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 4px 24px rgba(33,150,243,0.08)",
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          marginTop: "50px"

        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, fontWeight: 700, color: "#1976d2" }}
        >
          {selectedDoctor ? "Edit Doctor" : "Add Doctor"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={{
                  background: "#fff",
                  borderRadius: 1,
                  boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                sx={{
                  background: "#fff",
                  borderRadius: 1,
                  boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: "230px" }}>
              <FormControl fullWidth margin="normal" sx={{
                  background: "#fff",
                  borderRadius: 1,
                  boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
                }}>
                <InputLabel  >Doctor</InputLabel>
                <Select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}

                  required
                >
                  <MenuItem key="" value="">Select Specialty</MenuItem>
                  {[
                    "Cardiology",
                    "Dermatology",
                    "Neurology",
                    "Pediatrics",
                    "Orthopedics",
                    "Gynecology",
                    "Oncology",
                    "Psychiatry",
                    "Radiology",
                    "General Surgery"
                  ].map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextInput
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{
                  background: "#fff",
                  borderRadius: 1,
                  boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
                }}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 600,
                fontSize: 18,
                borderRadius: 1,
                boxShadow: "0 2px 8px rgba(33,150,243,0.12)",
              }}
              
            >
              {selectedDoctor ? "Update Doctor" : "Add Doctor"}
            </Button>
            <h3>{smg}</h3>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default DoctorForm;
