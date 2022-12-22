/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@mui/material';

const InText = ({ InputProps, inputProps, ...props }: TextFieldProps) => (
  <TextField
    variant="standard"
    size="small"
    label=" "
    style={{ padding: 0, borderRadius: 0 }}
    InputProps={{
      style: {
        padding: 0,
        border: 0,
        borderRadius: 0,
      },
      ...InputProps,
    }}
    inputProps={{
      style: {
        // height: '100%',
        display: 'inline-block',
        // alignItems: 'center',
        padding: 0,
        WebkitTextFillColor: 'black',
        // textAlign,
        verticalAlign: 'middle',
      },
      ...inputProps,
    }}
    {...props}
  />
);
export default InText;
