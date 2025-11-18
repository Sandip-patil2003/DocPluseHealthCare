import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Box, TextField, Button, Paper, Alert } from "@mui/material";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setApiError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setApiError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("https://localhost:7222/api/Contact/send", form);

      if (response.status === 200) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } catch (error) {
      // Axios error handling
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError(error.message || "Network error. Please try again.");
      }
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #abcaedff 0%, #f8faff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "50px",
      paddingBottom: "50px"  
    }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", background: "#fff" }}>
          <Typography variant="h4" color="primary" gutterBottom align="center">
            Contact Us
          </Typography>
          <Typography variant="body1" mb={2} align="center">
            For inquiries, appointments, or feedback, please fill out the form below or reach us at <b>contact@hospital.com</b>.
          </Typography>
          {success && <Alert severity="success" sx={{ mb: 2 }}>Thank you! Your message has been sent.</Alert>}
          {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              value={form.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              fullWidth
              margin="normal"
              required
            />
            <Box mt={3} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4, borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                Send Message
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactPage;
