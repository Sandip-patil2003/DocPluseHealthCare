import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
} from "@mui/material";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import { addAppointment, updateAppointment } from "../../api/appointmentsApi";
import { getPatients, addPatient } from "../../api/patientsApi";
import { getDoctors } from "../../api/doctorsApi";

const initialAppointment = {
  patientId: "",
  doctorId: "",
  appointmentDate: "",
  reason: "",
};

const initialPatient = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
};

const AppointmentForm = ({ selectedAppointment, onSuccess }) => {
  const [formData, setFormData] = useState(initialAppointment);
  const [newPatient, setNewPatient] = useState(initialPatient);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (selectedAppointment) {
      const formattedDate = selectedAppointment.appointmentDate?.slice(0, 16);
      let patientId = "";
      let doctorId = "";
      if (patients.length > 0 && selectedAppointment.patientName) {
        const foundPatient = patients.find(
          (p) => `${p.firstName} ${p.lastName}` === selectedAppointment.patientName
        );
        if (foundPatient) patientId = foundPatient.patientId;
      }
      if (doctors.length > 0 && selectedAppointment.doctorName) {
        const foundDoctor = doctors.find(
          (d) => `${d.firstName} ${d.lastName}` === selectedAppointment.doctorName
        );
        if (foundDoctor) doctorId = foundDoctor.doctorId;
      }
      setFormData({
        ...selectedAppointment,
        patientId,
        doctorId,
        appointmentDate: formattedDate,
      });
    } else {
      setFormData(initialAppointment);
      setNewPatient(initialPatient);
    }
  }, [selectedAppointment, patients, doctors]);

  useEffect(() => {
    getPatients().then((res) => setPatients(res.data));
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let patientId = formData.patientId;

      // If creating new, first add patient
      if (!selectedAppointment) {
        const res = await addPatient(newPatient);
        patientId = res.data.patientId;
      }

      const appointmentData = {
        ...formData,
        patientId,
      };


      if (selectedAppointment) {
        await updateAppointment(selectedAppointment.appointmentId, appointmentData);
      } else {
        await addAppointment(appointmentData);
      }
      setFormData(initialAppointment);
      let loc = window.location.href
      if (loc == 'http://localhost:5173/appointments/book') {
        setFormData(initialAppointment);
        
      } else {
        onSuccess();
      }
    } catch (err) {
      console.error("Error submitting appointment:", err);
    }
  };
 
 let styl ={   }
    let loca = window.location.href
    if (loca == 'http://localhost:5173/appointments') {
      if(selectedAppointment == null){
        styl = { display: 'none'}
      }}


    return (
      <Container sx={styl}>
        <Paper sx={{ padding: 2, marginBottom: 3, marginTop: "50px" }}>
          <Typography variant="h6" gutterBottom>
            {selectedAppointment ? "Edit Appointment" : "Add Appointment"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Patient Section */}
              <Grid item xs={12} md={6} >
                {selectedAppointment ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Patient</InputLabel>
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
                ) : (
                  <>
                    <TextInput
                      label="First Name"
                      name="firstName"
                      value={newPatient.firstName}
                      onChange={handlePatientInputChange}
                      required
                    />
                    <TextInput
                      label="Last Name"
                      name="lastName"
                      value={newPatient.lastName}
                      onChange={handlePatientInputChange}
                      required
                    />
                    <TextInput
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={newPatient.dateOfBirth}
                      onChange={handlePatientInputChange}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                    <TextInput
                      label="Gender"
                      name="gender"
                      value={newPatient.gender}
                      onChange={handlePatientInputChange}
                      required
                    />
                    <TextInput
                      label="Phone"
                      name="phone"
                      value={newPatient.phone}
                      onChange={handlePatientInputChange}
                      required
                    />
                  </>
                )}
              </Grid>

              {/* Doctor Selection */}
              <Grid item xs={12} md={6} sx={{width : "230px"}}>
                <FormControl fullWidth margin="normal">
                  <InputLabel style={{ width: "50px" }}>Doctor</InputLabel>
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

              {/* Appointment Date */}
              <Grid item xs={12} md={6}>
                <TextInput
                  label="Date"
                  name="appointmentDate"
                  type="datetime-local"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              {/* Reason */}
              <Grid item xs={12}>
                <TextInput
                  label="Reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Button type="submit">
                  {selectedAppointment ? "Update" : "Add"} Appointment
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  };

  export default AppointmentForm;
