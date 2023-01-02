/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@mui/material';
import { CSSProperties } from 'react';

export type DocInTextProps = Omit<TextFieldProps, 'variant'> & {
  textAlign?: CSSProperties['textAlign'];
};
const DocInText = ({ value, textAlign, ...props }: DocInTextProps) => {
  return (
    <TextField
      value={value}
      {...props}
      style={{ padding: 0, borderRadius: 0, ...props.style }}
      InputProps={{
        ...props.InputProps,
        style: {
          padding: 0,
          border: 0,
          borderRadius: 0,
          ...props.InputProps?.style,
        },
      }}
      onFocus={(e) => {
        if (e.target.value === '-') e.target.select();
        if (props.onFocus) props.onFocus(e);
      }}
      inputProps={{
        ...props.inputProps,

        style: {
          textAlign,
          display: 'inline-block',
          padding: '0 3px',
          WebkitTextFillColor: 'black',
          verticalAlign: 'middle',
          ...props.inputProps?.style,
        },
      }}
    />
  );
};
export default DocInText;
