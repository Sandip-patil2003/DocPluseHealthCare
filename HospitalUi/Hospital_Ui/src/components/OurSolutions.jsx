import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

// Image imports
import hospitalImg from "../img/hos.jpg";
import medicalImg from "../img/med.jpg";
import clinicImg from "../img/cli.jpg";
import D1 from "../img/d1.jpeg";
import D2 from "../img/d2.jpg";
import D3 from "../img/d3.jpg";

const solutions = [
  {
    title: "Hospital Software",
    description:
      "DocPulse HIMS is one of the best digital healthcare solutions for hospitals. Manage appointments, billing, lab, stock and inventory, pharmacy, in-patient department and more. Advanced EMR to manage patient health records and deliver improved patient care.",
    image: hospitalImg,
    alt: "Hospital Software",
  },
  {
    title: "Medical Practice Management Software",
    description:
      "One-stop solution to manage all the aspects of OPD starting from patient registration to generating digital prescriptions, bills and revenue analysis. Pharmacy and Lab management is also simplified, enabling doctors to view lab reports in the software. Customisable medical case sheets to create electronic medical records (EMR).",
    image: medicalImg,
    alt: "Medical Practice Software",
  },
  {
    title: "Clinic Management Software",
    description:
      "Adopt our digital healthcare ecosystem for a holistic approach towards patient management. Our patient management system comes with a wide range of features like managing multi-chain facilities centrally, appointment scheduling portals for patients, feedback collection channels, maintaining Electronic Health Records (EHR), tracking pharmacy operations and stocks, LIS for in-house pathology and radiology diagnostics.",
    image: clinicImg,
    alt: "Clinic Management Software",
  },
];

const BlogCard = styled(Box)(({ theme }) => ({
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  borderRadius: theme.shape.borderRadius,
  background: "#fff",
  overflow: "hidden",
  transition: "box-shadow 0.3s, transform 0.3s",
  "&:hover": {
    boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
    transform: "translateY(-4px) scale(1.02)",
  },
}));

const BlogImg = styled("img")({
  width: "110%",
  height: 200,
  objectFit: "cover",
  transition: "transform 0.4s",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  transform: "scale(1.08)", // Zoom image inside box
  "&:hover": {
    transform: "scale(1.15) rotate(3deg)", // Zoom more and rotate on hover
  },
});

const blogPosts = [
  {
    date: "22 Jul",
    title: "Efficient Hospital Management, Simplified Digitally",
    image: D1,
    alt: "Efficient Hospital Management",
    button: "Learn more",
  },
  {
    date: "14 Jul",
    title: "Hassle-Free IPD Billing Means Better Patient Experience",
    image: D2,
    alt: "IPD Billing",
    button: "Learn more",
  },
  {
    date: "22 Jul",
    title: "Digitize Hospital Operations with Cloud Software",
    image: D3,
    alt: "Cloud Software",
    button: "Learn more",
  },
];

const OurSolutions = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 10 }, backgroundColor: "#fff" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 8 }}
      >
        Our Solutions
      </Typography>

      <Grid container spacing={8} sx={{ marginLeft:"-80px" , marginRight:"-80px "}}>
        {solutions.map((solution, index) => (
          <Grid
            container
            spacing={4}
            alignItems="center"
            key={index}
            direction={index % 2 === 0 ? "row" : "row-reverse"}
            sx={{ mb: 6 }}
          >
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={solution.image}
                alt={solution.alt}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  mx: "auto",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ width: "35%" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2 }}
              >
                {solution.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#444",
                  lineHeight: 1.8,
                  textAlign: "justify",
                }}
              >
                {solution.description}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Latest Blog Section */}
      <Box sx={{ mt: 10, mb: 6 }}>
        <Typography variant="h5" align="center" fontWeight="bold" sx={{ mb: 4 }}>
          Latest Blog
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {blogPosts.map((post, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx} sx={{ width: "30%" }}>
              <BlogCard>
                <Box sx={{ position: "relative" }}>
                  <BlogImg src={post.image} alt={post.alt} />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#2e7d32",
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {post.date}
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    {post.title}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Box
                      component="button"
                      sx={{
                        background: "#7cb342",
                        color: "#fff",
                        border: "none",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        cursor: "pointer",
                        mt: 1,
                        "&:hover": { background: "#558b2f" },
                      }}
                    >
                      {post.button}
                    </Box>
                  </Box>
                </Box>
              </BlogCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default OurSolutions;
