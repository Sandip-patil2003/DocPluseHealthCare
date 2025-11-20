import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Link, Stack, FormControlLabel, Checkbox, InputAdornment } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "../components/common/Button";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (name === "username") {
      if (/\s/.test(value)) {
        setUsernameError("Username cannot contain spaces.");
      } else {
        setUsernameError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (/\s/.test(formData.username)) {
      setUsernameError("Username cannot contain spaces.");
      return;
    }
    try {
      await login(formData.username, formData.password);
      setFormData({ username: "", password: "" });
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Box className="auth-scene">
      <Box className="glass-card">
        <Box className="glass-card__body">
          <Box className="glass-card__panel glass-card__panel--accent">
          <img src="/docpulse-logo.svg" alt="DocPulse Logo"  sx={{  width: 70 , margin: "auto" }}/>     
          <Typography className="auth-heading">Join us</Typography>      
           <Typography className="auth-heading">DocPulsHelthCare Hospital</Typography>
           
            <Box className="glass-card__blur">
              <Typography variant="body1" sx={{ opacity: 0.85 }}>
                We are a stay for hepl you to manage your hospital and patients.
              </Typography>
            </Box>
          </Box>
          <Box className="glass-card__panel">
            <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: "#fff" }}>
              User login
            </Typography>
            <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
              Sign in with your workspace credentials
            </Typography>

            <form onSubmit={handleSubmit} className="auth-form">
              <TextField
                placeholder="Username"
                name="username"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                error={!!usernameError}
                helperText={usernameError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ "aria-label": "Username" }}
              />
              <TextField
                placeholder="Password"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ "aria-label": "Password" }}
              />
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox color="primary" sx={{ color: "#fff" }} />}
                  label={<Typography variant="body2">Remember me</Typography>}
                  sx={{ color: "#fff", m: 0 }}
                />
                <Link component={RouterLink} to="/forgot-password" sx={{ color: "#fff", fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </Stack>
              {error && (
                <Typography color="error" sx={{ mt: 1, mb: 1, fontWeight: 500 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 18,
                  background: "linear-gradient(90deg,#7f5af0,#63c5ff)",
                }}
              >
                Let's go!
              </Button>
            </form>

            <Box className="auth-alt-link">
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link component={RouterLink} to="/register">
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
