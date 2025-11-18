// Appointments page
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import AppointmentForm from "../components/Appointments/AppointmentForm";
import AppointmentsList from "../components/Appointments/AppointmentsList";

const AppointmentsPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const showForm = location.pathname !== "/appointments" || selectedAppointment !== null;

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setSelectedAppointment(null);
    setRefresh((r) => !r);
  };

  return (
    <Container>
      {showForm && (
        <AppointmentForm selectedAppointment={selectedAppointment} onSuccess={handleSuccess} />
      )}
      <AppointmentsList key={refresh} onEdit={handleEdit} />
    </Container>
  );
};

export default AppointmentsPage;
