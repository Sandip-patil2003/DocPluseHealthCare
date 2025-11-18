// src/components/common/Button.js
import React from "react";
import { Button as MUIButton } from "@mui/material";

const Button = ({ children, ...props }) => {
  return (
    <MUIButton variant="contained" color="primary" {...props}>
      {children}
    </MUIButton>
  );
};

export default Button;
