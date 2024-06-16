import React, { FC } from "react";
import { useField } from "formik";
import { FormControlLabel } from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

interface RadioInputProps {
  readonly label: any;
  readonly name: string;
  checkboxList: any;
}

const CheckboxGroup: FC<RadioInputProps> = ({ name, label, checkboxList, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <>
    <div>
        <label lang="mr">
            {label?.kan}
        </label>
    </div>
    <label htmlFor="adharno">
        {label?.eng}
    </label>
    <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        {...field}
        {...props}
      >
        {checkboxList.map((r: any) => <FormControlLabel key={r} value={r} control={<Radio />} label={r} />)}
        
      </RadioGroup>
    </>
    
  );
};

export default CheckboxGroup;