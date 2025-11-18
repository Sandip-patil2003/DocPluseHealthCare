import React, { useState, useEffect } from "react";
import { Box, Typography, Fade, useTheme } from "@mui/material";
import slider1 from '../img/slider-2.jpg';
import slider2 from '../img/slider-01.jpg';
import slider3 from '../img/slider-4.jpg';
import slider4 from '../img/slider-3.jpg';



const images = [
    {
        src: slider1,
        title: "Pharmacy Management",
        description:
            "Inventory and stock management, low stock reminder notifications, easy purchase and returns, vendor payment management, detailed transaction overview, GST reports, and more.",
    },
    {
        src: slider2,
        title: "Comprehensive Cloud-Based Healthcare Software",
        description:
            "Digital solutions tailored for Hospitals, Clinics, and Doctors. Including CMS, PMS, and HIMS solutions.",
    },
    {
        src: slider3,
        title: "Telemedicine",
        description:
            "Video consultations, E-prescriptions, and secure chat interactions to serve patients remotely.",
    },
    {
        src: slider4,
        title: "Hospital Information Management System (HIMS)",
        description:
            "SaaS-based healthcare platform supporting billing, insurance claims, HIPAA compliance, and patient data storage.",
    },
];


const ImageCarousel = () => {
    const [index, setIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % images.length);
                setFadeIn(true);
            }, 300);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "auto",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: "100px",
                
            }}
        >
            <Fade in={fadeIn} timeout={600}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        overflow: "hidden",
                        position: "relative",
                        borderRadius: 2,
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                        p: 4,
                        transition: "all 0.5s ease-in-out",
                        cursor: "pointer",
                        "&:hover": {
                            boxShadow: 6,
                            transform: "scale(1.01)",
                        },
                    }}
                >
                    {/* Text Section */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h5"
                            color={theme.palette.primary.main}
                            fontWeight="bold"
                            gutterBottom
                        >
                            {images[index].title}
                        </Typography>
                        <Typography variant="body1" sx={{ maxWidth: 500 }}>
                            {images[index].description}
                        </Typography>
                    </Box>

                    

                    {/* Image Section */}
                    <Box
                        component="img"
                        src={images[index].src}
                        alt={images[index].title}
                        sx={{
                            flex: 1,
                            maxHeight: 350,
                            maxWidth: "100%",
                            objectFit: "contain",
                            borderRadius: 2,
                            ml: { md: 4, xs: 0 },
                            mt: { xs: 3, md: 0 },
                            transition: "all 0.5s ease",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    />
                </Box>
            </Fade>
        </Box>
    );
};

export default ImageCarousel;
