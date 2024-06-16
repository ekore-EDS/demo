import React, { FC } from "react";
import { TextField, StandardTextFieldProps } from "@mui/material";

interface TextInputProps extends StandardTextFieldProps {
  readonly label: any;
  readonly name: string;
  readonly value: any;
  readonly placeholder?: string
}

const FieldValue: FC<TextInputProps> = ({ name, label, placeholder, value , ...props }) => {

  return (
    <div className="my-2">
    <div>
      <label htmlFor={name}>
          {label?.eng || label}
      </label>
    </div>
    
    <div className="my-2">
      <b>{value}</b>
    </div>
    </div>
    
  );
};

export default FieldValue;