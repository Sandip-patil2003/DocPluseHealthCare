// Patients related API calls
import api from "./apiHelper";

export const getPatients = () => api.get("/patients");
export const getPatientById = (id) => api.get(`/patients/${id}`);
export const addPatient = (patient) => api.post("/patients", patient);
export const updatePatient = (id, patient) => api.put(`/patients/${id}`, patient);
export const deletePatient = (id) => api.delete(`/patients/${id}`);
