import React, { useState } from "react";
import { Container, Box, TextField, Typography, Link, Stack } from "@mui/material";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!formData.username.trim()) return "Username is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Email is invalid.";
    if (!formData.password) return "Password is required.";
    if (formData.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!otpVerified) {
      setError("Please verify the OTP sent to your email first.");
      return;
    }
    try {
        console.log(formData);
      await axios.post("https://localhost:7222/api/Auth/register", {
        username: formData.username,
        password: formData.password,
        email: formData.email
      });
      
      setSuccess("Registration successful! Please login.");
      
    } catch (err) {
        let error = err.response.data
         console.log(error);
      setError(error || "Registration failed");
      console.log(err);
    }
  };

  const sendOtp = async () => {
    setError("");
    if (!formData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setError("Enter a valid email first.");
      return;
    }
    try {
      await axios.post("https://localhost:7222/api/Auth/send-otp", { email: formData.email });
      setOtpSent(true);
    } catch (e) {
      setError(e?.response?.data || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    setError("");
    try {
      await axios.post("https://localhost:7222/api/Auth/verify-otp", { email: formData.email, code: otpCode });
      setOtpVerified(true);
    } catch (e) {
      setOtpVerified(false);
      setError(e?.response?.data || "Invalid OTP");
    }
  };

  return (
    <Box sx={{background: "linear-gradient(135deg, #abcaedff 0%, #f8faff 100%)", minHeight: "100vh" , display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
    <Container maxWidth="sm" >
      <Box mt={8} p={4}  borderRadius={2} sx={{ background: 'linear-gradient(135deg, #b2f0ff 0%, #e0f7fa 100%)', boxShadow: '4px 4px 15px rgba(9, 35, 57, 0.8)' , marginBottom: "60px" }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
          Register
        </Typography>
        {success && (
          <Typography color="success.main" sx={{ mt: 1, mb: 2, fontWeight: 600, fontSize: 18, textAlign: 'center' }}>
            {success}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            sx={{ background: '#fff', borderRadius: 1 }}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
            <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            sx={{ background: '#fff', borderRadius: 1, flex: 1 }}
          />
            <Button type="button" variant="contained" onClick={sendOtp} sx={{ mt: { xs: 0, sm: 1 } }}>
              {otpSent ? 'Resend OTP' : 'Send OTP'}
            </Button>
          </Stack>
          {otpSent && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center"  sx={{marginTop : "10px"}}>
              <TextField
                label="Enter OTP"
                name="otp"
                fullWidth
                margin="normal"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                sx={{ background: '#fff', borderRadius: 1, flex: 1}}
              />
              <Button
                type="button"
                variant={otpVerified ? 'contained' : 'outlined'}
                color={otpVerified ? 'success' : 'primary'}
                onClick={verifyOtp}
                disabled={otpVerified}
                sx={{
                  mt: { xs: 0, sm: 1 },
                  // additional explicit green background when verified for stronger contrast
                  backgroundColor: otpVerified ? '#2e7d32' : undefined,
                  borderColor: otpVerified ? '#2e7d32' : undefined,
                }}
              >
                {otpVerified ? 'Verified' : 'Verify OTP'}
              </Button>
            </Stack>
          )}
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            sx={{ background: '#fff', borderRadius: 1 }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1, mb: 2, fontWeight: 500 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!otpVerified}
            sx={{ mt: 2, py: 1.5, fontWeight: 600, fontSize: 18, borderRadius: 2, boxShadow: '0 2px 8px rgba(25,118,210,0.08)' }}
          >
            Register
          </Button>
        </form>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 500 }}>
            Already have an account?{' '}
            <Link href="/login" sx={{ color: '#1976d2', fontWeight: 700 }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default RegisterPage;
