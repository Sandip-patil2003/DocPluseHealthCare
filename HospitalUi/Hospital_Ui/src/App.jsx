// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import LoginPage from "./pages/Login";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import RegisterPage from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import DoctorForm from "./components/Doctors/DoctorForm";
import DoctorsList from "./components/Doctors/DoctorsList";
import DeactivatedDoctorsList from "./components/Doctors/DeactivatedDoctorsList";
import AppointmentForm from "./components/Appointments/AppointmentForm";
import AppointmentsList from "./components/Appointments/AppointmentsList";
import PrescriptionForm from "./components/Prescriptions/PrescriptionForm";
import PrescriptionsList from "./components/Prescriptions/PrescriptionsList";
import PatientForm from "./components/Patients/PatientForm";
import PatientsList from "./components/Patients/PatientsList";
import PatientCheckout from "./components/Patients/PatientCheckout";
import "./App.css";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}


function Layout({ children }) {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/patients" element={<PrivateRoute><PatientsPage /></PrivateRoute>} />
            <Route path="/doctors" element={<PrivateRoute><DoctorsPage /></PrivateRoute>} />
            <Route path="/appointments" element={<PrivateRoute><AppointmentsPage /></PrivateRoute>} />
            <Route path="/prescriptions" element={<PrivateRoute><PrescriptionsPage /></PrivateRoute>} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/doctors/deactivated" element={<DeactivatedDoctorsList />} />
            <Route path="/doctors/add" element={<DoctorForm />} />
            <Route path="/appointments" element={<AppointmentsList />} />
            <Route path="/appointments/book" element={<AppointmentForm />} />
            <Route path="/prescriptions" element={<PrescriptionsList />} />
            <Route path="/prescriptions/add" element={<PrescriptionForm />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/patients/add" element={<PatientForm />} />
            <Route path="/patients/checkout/:id" element={<PatientCheckout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
