import React, { FC } from "react";
import { useField } from "formik";
import { TextField, StandardTextFieldProps } from "@mui/material";

interface TextInputProps extends StandardTextFieldProps {
  readonly label: any;
  readonly name: string;
  readonly placeholder?: string;
  readonly multiline?: boolean;
  readonly rows?: number;
}

const InputField: FC<TextInputProps> = ({ name, label, placeholder, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className="my-1">
    <div>
      <label htmlFor="adharno">
          {label?.eng}
      </label>
    </div>
    
    <TextField
        sx={{pr: 2}}
        InputLabelProps={{
            shrink: true
        }}
        size="small"
        fullWidth
        hiddenLabel
        placeholder={placeholder}
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
    />
    </div>
    
  );
};

export default InputField;