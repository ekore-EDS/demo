import React, { FC } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';


interface SliderProps {
  readonly label: any;
  readonly name: string;
  readonly placeholder?: string;
  handleChange?: any,
  min?: number,
  max?: number,
  step?: any,
  width?: number
}

const DiscreteSlider: FC<SliderProps> = ({ name, label, placeholder, handleChange, min, max, step, width, ...props }) => {
  const [field, meta] = useField(name);

  const slider_width: any = width ? width : 250

  const { setFieldValue }: any = useFormikContext();

  const handleChange1 = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setFieldValue(name, newValue);
    }
  };

  return (
    <Box sx={{ marginRight: '20px'}}>
      <div className="field-label">
        <label htmlFor="name">
          {label}
        </label>
      </div>
      <Box sx={{ width: slider_width, marginLeft: '10px'}} >
      <Slider
        value={meta.value ? meta.value : 0}
        min={min}
        step={step}
        max={max}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
        // {...field}
        {...props}
      />
      
      </Box>
      <Typography id="non-linear-slider" gutterBottom>
        {/* Storage: {valueLabelFormat(calculateValue(value))} */}
        <b>Value - {meta.value ? meta.value : 0}</b>
      </Typography>
      <div>
        <ErrorMessage
          name={name}
          component="small"
          className="text-danger"
        />
      </div>
    </Box>
  );
}

export default DiscreteSlider;