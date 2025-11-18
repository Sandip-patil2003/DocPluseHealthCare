// Appointments API calls
import api from "./apiHelper";

export const getAppointments = () => api.get("/appointments");
export const getAppointmentById = (id) => api.get(`/appointments/${id}`);
export const addAppointment = (appointment) => api.post("/appointments", appointment);
export const updateAppointment = (id, appointment) => api.put(`/appointments/${id}`, appointment);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);
