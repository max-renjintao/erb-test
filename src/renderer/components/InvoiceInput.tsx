/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-duplicate-props */
import { Autocomplete, TextField } from '@mui/material';
import React, { CSSProperties } from 'react';

const InvoiceInput = ({
  textAlign,
  options,
  value,
  onEdit,
  children,
  disabled,
  ...rest
}: {
  textAlign?: CSSProperties['textAlign'];
  options: string[];
  value: string | undefined;
  disabled?: boolean;
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
          multiline
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
              padding: 4,
              WebkitTextFillColor: 'black',
              textAlign,
            },
          }}
          onBlur={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            ps.inputProps.onBlur && ps.inputProps.onBlur(e as any);
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