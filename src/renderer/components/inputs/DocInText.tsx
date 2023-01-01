/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@mui/material';

const InvIn = ({ ...props }: TextFieldProps) => {
  return (
    <TextField
      {...props}
      style={{ padding: 0, borderRadius: 0 }}
      InputProps={{
        ...props.InputProps,
        style: {
          padding: 0,
          border: 0,
          borderRadius: 0,
        },
      }}
      inputProps={{
        ...props.inputProps,
        style: {
          display: 'inline-block',
          padding: 0,
          WebkitTextFillColor: 'black',
          verticalAlign: 'middle',
        },
      }}
    />
  );
};
export default InvIn;
