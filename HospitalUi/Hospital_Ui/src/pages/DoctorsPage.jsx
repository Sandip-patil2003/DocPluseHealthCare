// Doctors page
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import DoctorsList from "../components/Doctors/DoctorsList";
import DoctorForm from "../components/Doctors/DoctorForm";


const DoctorsPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const showForm = location.pathname !== "/doctors" || selectedDoctor !== null;
  let Navigate = useNavigate();
  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
   window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate("/doctorsadd");
  };

  const handleSuccess = () => {
    setSelectedDoctor(null);
    setRefresh((r) => !r);
  };

  return (
    <Container >
      {showForm && (
        <DoctorForm selectedDoctor={selectedDoctor} onSuccess={handleSuccess} />
      )}
      <DoctorsList key={refresh} onEdit={handleEdit} />
    </Container>
  );
};

export default DoctorsPage;
