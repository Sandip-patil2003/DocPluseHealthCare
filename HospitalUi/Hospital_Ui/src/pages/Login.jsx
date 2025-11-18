import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Link } from "@mui/material";
import Button from "../components/common/Button";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
    <Box
      sx={{
        backgroundColor: "#5ea8daff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "50%",
          height: "75vh",
          maxWidth: "1000px",
          //boxShadow: "10 10 20px rgba(0,0,0,0.1)",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: 7
        }}
      >
        {/* Left Image */}   
        <Box
          flex={1}
          sx={{
            display: { xs: "none", md: "block" },
            backgroundImage: 'url("/public/bgimg.jpg")', // Place bgimg.jpg in public/img folder
            
   

          }}
        />

        {/* Login Form */}
        <Box
          flex={1}
          p={4}
          sx={{
            background: "linear-gradient(135deg, #e0f7fa 0%, #b2f0ff 100%)",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: "#1976d2", marginBottom: "0" }}
          >
            Welcome
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ color: "#1976d2", fontWeight: 500, marginBottom: "15px" }}>
              Login with username
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "80%", margin: "0 auto" }}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              sx={{ background: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              sx={{ background: "#fff", borderRadius: 1 }}
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
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 600,
                fontSize: 18,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(25,118,210,0.08)",
              }}
            >
              Login
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2" sx={{ color: "#1976d2", fontWeight: 500 }}>
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register" sx={{ color: "#1976d2", fontWeight: 700 }}>
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
        </Box>
        
      </Box>
    
  );
};

export default LoginPage;
