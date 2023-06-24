import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const RadioGroupInput = ({label, options}) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <FormLabel id={label} sx={{ display: "inherit", fontSize:'20px', fontWeight:'bold' }}>
        {label}
      </FormLabel>
      <RadioGroup
        className="input-field"
        id={label}
        aria-labelledby={label}
        defaultValue=""
        name={label}
        row={true}
        value={value}
        onChange={handleChange}
      >
        {options.map((value)=><FormControlLabel value={value} control={<Radio />} label={value} />)}
      </RadioGroup>
      <br/>
    </>
  );
};

export default RadioGroupInput;

{
  /* <InputLabel id={`entry_${label}`}>{label}</InputLabel>
      <Select
        labelId={`entry_${label}`}
        id={`entry_${label}_select`}
        label={label}
        value={`formik.values.${label}`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={`formik.touched.${label}` && `formik.errors.${label}`}
        helperText={
          `formik.touched.${label}` && `formik.errors.${label}`
            ? `formik.errors.${label}`
            : ""
        }
      >
        {menuValues.map((value)=><MenuItem value={value}>{value}</MenuItem>)}
      </Select> */
}
