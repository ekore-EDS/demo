import React, { FC } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

interface SelectProps {
  readonly label: any;
  readonly name: string;
  readonly placeholder?: string;
  menuItem: any,
  handleChange?: any
}

const SelectField: FC<SelectProps> = ({ name, label, placeholder, menuItem,handleChange, ...props }) => {
  const [field, meta] = useField(name);

  const { setFieldValue }: any = useFormikContext();

  return (
    <>
    <div className="mb-4">
      <label htmlFor="name">
          {label?.eng}
      </label>
    </div>
      <Select
          size="small"
          fullWidth
          placeholder={placeholder}
          onChange={(e: any) => handleChange ? setFieldValue(name, e.target.value): field.onChange}
          value={field.value}
          // {...field}
          {...props}
          error={meta.touched && Boolean(meta.error)}
      >
        {menuItem.map((item: any) => <MenuItem key={item}
              value={item}
          >
              {item}
          </MenuItem>)}
      </Select>
      {/* <Autocomplete
        disablePortal
        size="small"
        id="combo-box-demo"
        options={menuItem}
        onChange={(e: any) => handleChange ? setFieldValue(name, e.target.innerText) : field.onChange}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Assembly Constituency" />}
      /> */}
      <div className="ps-3">
        <ErrorMessage
          name={name}
          component="small"
          className="text-danger"
        />
      </div>
    </>
    
  );
};

export default SelectField;