// src/pages/PatientsPage.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PatientForm from "../components/Patients/PatientForm";
import PatientsList from "../components/Patients/PatientsList";
import { Container } from "@mui/material";

const PatientsPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const showForm = location.pathname !== "/patients" || selectedPatient !== null;

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setSelectedPatient(null);
    setRefresh((r) => !r);
  };

  return (
    <Container>
      {showForm && (
        <PatientForm selectedPatient={selectedPatient} onSuccess={handleSuccess} />
      )}
      <PatientsList key={refresh} onEdit={handleEdit} />
    </Container>
  );
};

export default PatientsPage;
