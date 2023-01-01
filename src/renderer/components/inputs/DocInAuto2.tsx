/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-duplicate-props */
import { Autocomplete } from '@mui/material';
import React, { CSSProperties } from 'react';
import DocInText from './DocInText';

type P = {
  textAlign?: CSSProperties['textAlign'];
  options: string[];
  value: string | undefined;
  disabled?: boolean;
  multiline?: boolean;
  onEdit: (v: string) => void;
};

const InvoiceInput = ({ options, value, onEdit, disabled, multiline }: P) => (
  <Autocomplete
    disabled={disabled}
    options={options}
    value={value || '-'}
    disableClearable
    freeSolo
    onChange={(e, v) => v && onEdit(v)}
    renderInput={(ps) => (
      <DocInText
        {...ps}
        multiline={multiline}
        onBlur={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          ps.inputProps.onBlur && ps.inputProps.onBlur(e as any);
          onEdit(e.target.value);
        }}
      />
    )}
    renderOption={(props, option) => (
      <li {...props} style={{ padding: '3px' }}>
        <span className="input-option">{option}</span>
      </li>
    )}
  />
);

export default InvoiceInput;
