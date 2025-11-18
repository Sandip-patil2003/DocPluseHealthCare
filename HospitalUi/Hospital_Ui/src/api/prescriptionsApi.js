// Prescriptions API calls
import api from "./apiHelper";

export const getPrescriptions = () => api.get("/prescriptions");
export const getPrescriptionById = (id) => api.get(`/prescriptions/${id}`);
export const addPrescription = (prescription) => api.post("/prescriptions", prescription);
export const updatePrescription = (id, prescription) => api.put(`/prescriptions/${id}`, prescription);
export const deletePrescription = (id) => api.delete(`/prescriptions/${id}`);
