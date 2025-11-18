// src/components/common/Loader.js
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress />
  </Box>
);

export default Loader;
