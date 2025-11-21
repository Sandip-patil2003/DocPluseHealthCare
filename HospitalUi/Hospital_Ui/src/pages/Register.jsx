import React, { useState } from "react";
import { Box, TextField, Typography, Link, Stack, InputAdornment, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "../components/common/Button";
import { Link as RouterLink } from "react-router-dom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";


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
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!formData.username.trim()) return "Username is required.";
    if (formData.username.length < 3) return "Username must be at least 3 characters.";
    if (formData.username.length > 20) return "Username must not exceed 20 characters.";
    if (/\s/.test(formData.username)) return "Username cannot contain spaces.";
    if (!/^[a-zA-Z0-9_.-]+$/.test(formData.username)) return "Username can only contain letters, numbers, dots, hyphens, and underscores.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Email is invalid.";
    if (!formData.password) return "Password is required.";
    if (formData.password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(formData.password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(formData.password)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(formData.password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*]/.test(formData.password)) return "Password must contain at least one special character (!@#$%^&*).";
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
      await axios.post("https://localhost:7222/api/Auth/register", {
        username: formData.username,
        password: formData.password,
        email: formData.email
      });

      setSuccess("Registration successful! Please login.");
    } catch (err) {
      const apiError = err?.response?.data || "Registration failed";
      setError(apiError);
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
    <Box className="auth-scene">
      <Box className="glass-card">
        <Box className="glass-card__body">
          <Box className="glass-card__panel glass-card__panel--accent">
          <img src="/docpulse-logo.svg" alt="DocPulse Logo"  sx={{  width: 70 , margin: "auto", top : "10px" }}/>

            <Typography className="auth-heading">Join us</Typography>
            <Typography className="auth-subtitle">Create your workspace</Typography>
            <Box className="glass-card__blur">
              <Typography variant="body1" sx={{ opacity: 0.85 }}> 
                Verify your email with OTP to activate DocPulse access. It keeps your records secure and enables password recovery later.
              </Typography>
            </Box>
          </Box>
          <Box className="glass-card__panel">
            <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: "#fff" }}>
              Registration
            </Typography>
            {/* {success && (
              <Typography color="success.main" sx={{ mt: 1, mb: 1, fontWeight: 600, textAlign: "center" }}>
                {success}
              </Typography>
            )} */}
             {success && (
                <Typography
                  sx={{
                    color:"black",
                    mt: 1,
                    fontWeight: "bolder",
                    textAlign: "center",
                    borderRadius: 1,
                    backgroundColor: "#5cd660",
                    px: 1,
                    py: 0.5,
                  }}
                >
                  {success}
                </Typography>
              )}
            <form onSubmit={handleSubmit} className="auth-form">
              <TextField
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ "aria-label": "Username" }}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
                <TextField
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ "aria-label": "Email address" }}
                />
                <Button
                  type="button"
                  onClick={sendOtp}
                  sx={{ whiteSpace: "nowrap", minWidth: 100, height: 56 }}
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </Stack>
              
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
                <TextField
                  placeholder="Enter OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VerifiedUserIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  // inputProps={{ "aria-label": "OTP code" }}
                />
                  <Button
                    type="button"
                    variant={otpVerified ? "contained" : "outlined"}
                    color={otpVerified ? "success" : "primary"}
                    onClick={verifyOtp}
                    disabled={otpVerified}
                    startIcon={otpVerified ? <CheckCircleIcon /> : undefined}
                    sx={{
                      whiteSpace: "nowrap",
                      minWidth: 100,
                      height: 56,
                    }}
                  >
                    {otpVerified ? "Verified" : "Verify OTP"}
                  </Button>
                </Stack>
             
              <TextField
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{ "aria-label": "Password" }}
              />
              {error && (
                <Typography
                  
                  sx={{
                    color:"black",
                    mt: 1,
                    fontWeight: "bolder",
                    textAlign: "center",
                    borderRadius: 1,
                    backgroundColor: "#e64c51",
                    opacity:0.6,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                disabled={!otpVerified}
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 2,
                  fontWeight: 700,
                  background: "linear-gradient(90deg,#a855f7,#5ee7df)",
                }}
              >
                Create account
              </Button>
            </form>
            <Box className="auth-alt-link">
              <Typography variant="body2">
                Already registered?{" "}
                <Link component={RouterLink} to="/login">
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
