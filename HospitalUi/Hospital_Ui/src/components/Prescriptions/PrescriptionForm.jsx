import React, { useEffect, useState } from "react";
import {
  Paper, Typography, Grid, FormControl, InputLabel, Select, MenuItem,
  Container
} from "@mui/material";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { getPatients } from "../../api/patientsApi";
import { getDoctors } from "../../api/doctorsApi";
import { addPrescription, updatePrescription } from "../../api/prescriptionsApi";

const initialState = {
  patientId: "",
  doctorId: "",
  medication: "",
  dosage: "",
  datePrescribed: "",
};

const PrescriptionForm = ({ selectedPrescription, onSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (selectedPrescription) {
      const formattedDate = selectedPrescription.datePrescribed?.slice(0, 10);
      let patientId = "";
      let doctorId = "";
      if (patients.length > 0 && selectedPrescription.patientName) {
        const foundPatient = patients.find(
          (p) => `${p.firstName} ${p.lastName}` === selectedPrescription.patientName
        );
        if (foundPatient) patientId = foundPatient.patientId;
      }
      if (doctors.length > 0 && selectedPrescription.doctorName) {
        const foundDoctor = doctors.find(
          (d) => `${d.firstName} ${d.lastName}` === selectedPrescription.doctorName
        );
        if (foundDoctor) doctorId = foundDoctor.doctorId;
      }
      setFormData({
        ...selectedPrescription,
        patientId,
        doctorId,
        datePrescribed: formattedDate,
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedPrescription, patients, doctors]);

  useEffect(() => {
    getPatients().then((res) => setPatients(res.data));
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPrescription) {
        await updatePrescription(selectedPrescription.prescriptionId, formData);
      } else {
        await addPrescription(formData);
      }

      let loc = window.location.href
      if(loc == 'http://localhost:5173/prescriptions/add'){
        setFormData(initialState);
      }else{
        setFormData(initialState);
         onSuccess();
      }
     
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };
  

  let loc = window.location.href
  let sty = null;
  if (loc == 'http://localhost:5173/prescriptions/add') {

     sty = { marginBottom: "200px", marginTop: "110px" }
  }

   let loca = window.location.href
    if (loca == 'http://localhost:5173/prescriptions') {
      if(selectedPrescription == null){
        sty= { display: 'none'}
      }}

  
  return (
    <Container sx={sty}>
    <Paper sx={{ padding: 2, marginBottom: 3, marginTop: "50px" }}>
      <Typography variant="h6">
        {selectedPrescription ? "Edit Prescription" : "Add Prescription"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={6} sx={{width : "210px"}}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Patient</InputLabel>
              <Select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
                label="Patient"
              >
                {patients.map((p) => (
                  <MenuItem key={p.patientId} value={p.patientId}>
                    {p.firstName} {p.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} sx={{width : "230px"}}>
            <FormControl fullWidth margin="normal">
              <InputLabel >Doctor</InputLabel>
              <Select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                label="Doctor"
              >
                {doctors.map((d) => (
                  <MenuItem key={d.doctorId} value={d.doctorId}>
                    Dr. {d.firstName} {d.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              label="Medication"
              name="medication"
              value={formData.medication}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              label="Dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput
              label="Date Prescribed"
              name="datePrescribed"
              type="date"
              value={formData.datePrescribed}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit">
              {selectedPrescription ? "Update" : "Add"} Prescription
            </Button>
          </Grid>

        </Grid>
      </form>
    </Paper>
    </Container>
  );
};

export default PrescriptionForm;

