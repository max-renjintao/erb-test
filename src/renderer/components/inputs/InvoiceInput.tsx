/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-duplicate-props */
import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import React, { CSSProperties } from 'react';

export const InvIn = ({ ...props }: TextFieldProps) => {
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
const InvoiceInput = ({
  textAlign,
  options,
  value,
  onEdit,
  children,
  disabled,
  multiline,
  ...rest
}: {
  textAlign?: CSSProperties['textAlign'];
  options: string[];
  value: string | undefined;
  disabled?: boolean;
  multiline?: boolean;
  onEdit: (v: string) => void;
} & React.ComponentProps<'td'>) => (
  <td style={{ padding: 0, height: '40px' }} {...rest}>
    {children}
    <Autocomplete
      disabled={disabled}
      options={options}
      value={value}
      disableClearable
      freeSolo
      onChange={(e, v) => v && onEdit(v)}
      renderInput={(ps) => (
        <TextField
          {...ps}
          multiline={multiline}
          style={{ padding: 0, borderRadius: 0 }}
          InputProps={{
            ...ps.InputProps,
            style: {
              padding: 0,
              border: 0,
              borderRadius: 0,
            },
          }}
          inputProps={{
            ...ps.inputProps,
            style: {
              // height: '100%',
              display: 'inline-block',
              // alignItems: 'center',
              padding: 0,
              WebkitTextFillColor: 'black',
              textAlign,
              verticalAlign: 'middle',
            },
          }}
          onChange={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            ps.inputProps.onChange && ps.inputProps.onChange(e as any);
            onEdit(e.target.value);
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} style={{ padding: 3 }}>
          <span className="input-option">{option}</span>
        </li>
      )}
    />
  </td>
);

export default InvoiceInput;
