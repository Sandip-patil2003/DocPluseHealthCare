// src/components/Patients/PatientForm.js
import React, { useState, useEffect } from "react";
import { Paper, Typography, Grid, Container } from "@mui/material";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import {
  addPatient,
  updatePatient,
} from "../../api/patientsApi";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  active: true,
};
 
const PatientForm = ({ selectedPatient, onSuccess }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (selectedPatient) {
      setFormData(selectedPatient);
    } else {
      setFormData(initialState);
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedPatient) {
        await updatePatient(selectedPatient.patientId, formData);
      } else {
        await addPatient(formData);
      }

      setFormData(initialState);
      let loc = window.location.href
      if (loc == 'http://localhost:5173/patients/add') {
        setFormData(initialState);
      } else {
        onSuccess();
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };


   let loc = window.location.href
  let sty = null;
  if (loc == 'http://localhost:5173/patients/add') {

     sty = { marginBottom: "140px", marginTop: "90px" }
  }

    let loca = window.location.href
    if (loca == 'http://localhost:5173/patients') {
      if(selectedPatient == null){
        sty= { display: 'none'}
      }}

  return (
    <Container sx={sty}>
      <Paper sx={{ padding: 2, marginBottom: 3, marginTop: "50px" }}>
        <Typography variant="h6">
          {selectedPatient ? "Edit Patient" : "Add Patient"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput type="date" label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit">
                {selectedPatient ? "Update" : "Add"} Patient
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PatientForm;
