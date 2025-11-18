// Prescriptions page
import React, { useState } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import PrescriptionForm from "../components/Prescriptions/PrescriptionForm";
import PrescriptionsList from "../components/Prescriptions/PrescriptionsList";

const PrescriptionsPage = () => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const showForm = location.pathname !== "/prescriptions" || selectedPrescription !== null;

  const handleEdit = (p) => {
    setSelectedPrescription(p);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setSelectedPrescription(null);
    setRefresh((r) => !r);
  };

  return (
    <Container>
      {/*
        Hide the form when the current route is exactly "/prescriptions" and
        no prescription is selected for editing. Show it when editing (selectedPrescription)
        or when the pathname is different (e.g., a route that should show the form).
      */}
      {showForm && (
        <PrescriptionForm selectedPrescription={selectedPrescription} onSuccess={handleSuccess} />
      )}
      <PrescriptionsList key={refresh} onEdit={handleEdit} />
    </Container>
  );
};

export default PrescriptionsPage;
