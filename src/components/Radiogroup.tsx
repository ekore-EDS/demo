import React, { FC } from "react";
import { ErrorMessage, useField } from "formik";
import { FormControlLabel } from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

interface RadioInputProps {
  readonly label: any;
  readonly name: string;
  radioList: any;
  labelType?: string;
  withUpload?: boolean;
  uploadName?: any;
}

const Radiogroup: FC<RadioInputProps> = ({ name, label, radioList, labelType, withUpload, uploadName, ...props }) => {
  const [field, meta] = useField(name);


  const getRadioLabel = (labelConfig: any) => {
    return (
      <>
        {labelType === 'v' ? 
          labelConfig.label && labelConfig.label.eng  ? <div>{labelConfig.label.eng && <div>{labelConfig.label.eng}</div>}</div> : labelConfig :
          labelConfig.label && labelConfig.label.eng  ? <div>{labelConfig.label.eng ? <span> {labelConfig.label.eng}</span> : ''}</div> : labelConfig}
      </>
    )
  }

  return (
    <div className="my-1">
    {label?.eng && <div>
      <label className="font-weight-600">
          {label?.eng}
      </label>
    </div>}
    
    <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        {...field}
        {...props}
      >
        {radioList.map((r: any) => <FormControlLabel className="my-2"  key={r.value || r} value={r.value || r} control={<Radio />}
          label={getRadioLabel(r)} />)}
        
      </RadioGroup>
      <div className="ps-3">
        <ErrorMessage
          name={name}
          component="small"
          className="text-danger"
        />
      </div>
    </div>
    
  );
};

export default Radiogroup;