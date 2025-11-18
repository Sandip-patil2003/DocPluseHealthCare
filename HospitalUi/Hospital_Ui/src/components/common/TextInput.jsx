// src/components/common/TextInput.js
import React from "react";
import { TextField } from "@mui/material";

const TextInput = ({ label, name, value, onChange, type = "text", ...props }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default TextInput;
