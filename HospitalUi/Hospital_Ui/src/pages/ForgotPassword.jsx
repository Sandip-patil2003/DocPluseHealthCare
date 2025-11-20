import React, { useState } from "react";
import { Box, TextField, Typography, Stack, Link, InputAdornment } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Button from "../components/common/Button";
import api from "../api/apiHelper";
import { Link as RouterLink } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetFeedback = () => {
    setError("");
    setStatus("");
  };

  const handleSendOtp = async () => {
    resetFeedback();
    if (!email) {
      setError("Please enter your registered email.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password/send-otp", { email });
      setOtpSent(true);
      setStatus("OTP sent to your inbox.");
    } catch (e) {
      setError(e?.response?.data || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    resetFeedback();
    if (!otp) {
      setError("Enter the OTP you received.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password/verify-otp", { email, code: otp });
      setOtpVerified(true);
      setStatus("OTP verified! You can reset the password now.");
    } catch (e) {
      setOtpVerified(false);
      setError(e?.response?.data || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    resetFeedback();
    if (!otpVerified) {
      setError("Please verify the OTP first.");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password/reset", { email, newPassword });
      setStatus("Password updated! You can login with the new password.");
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
    } catch (e) {
      setError(e?.response?.data || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="auth-scene">
      <Box className="glass-card">
        <Box className="glass-card__body">
          <Box className="glass-card__panel glass-card__panel--accent">
            <Typography className="auth-heading">Reset</Typography>
            <Typography className="auth-subtitle">Forgot your password?</Typography>
            <Box className="glass-card__blur">
              <Typography variant="body1" sx={{ opacity: 0.85 }}>
                We will send a one-time password (OTP) to your registered email. Verify it and set
                a new password to regain access.
              </Typography>
            </Box>
          </Box>
          <Box className="glass-card__panel">
            <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: "#fff" }}>
              Recover account
            </Typography>
            <form onSubmit={handleResetPassword} className="auth-form">
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <TextField
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ "aria-label": "Email address" }}
                />
                <Button type="button" onClick={handleSendOtp} disabled={loading}>
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <TextField
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VerifiedUserIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ "aria-label": "OTP code" }}
                />
                <Button
                  type="button"
                  variant={otpVerified ? "contained" : "outlined"}
                  color={otpVerified ? "success" : "primary"}
                  onClick={handleVerifyOtp}
                  disabled={otpVerified || loading}
                >
                  {otpVerified ? "Verified" : "Verify OTP"}
                </Button>
              </Stack>
              <TextField
                placeholder="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ "aria-label": "New password" }}
              />
              <TextField
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ "aria-label": "Confirm password" }}
              />
              {error && (
                <Typography color="error" sx={{ mt: 1, fontWeight: 500 }}>
                  {error}
                </Typography>
              )}
              {status && (
                <Typography color="success.main" sx={{ mt: 1, fontWeight: 500 }}>
                  {status}
                </Typography>
              )}
              <Button
                type="submit"
                disabled={!otpVerified || loading}
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 2,
                  fontWeight: 700,
                  background: "linear-gradient(90deg,#56cfe1,#72efdd)",
                }}
              >
                Reset password
              </Button>
            </form>
            <Box className="auth-alt-link">
              <Typography variant="body2">
                Remembered it?{" "}
                <Link component={RouterLink} to="/login">
                  Back to login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;

