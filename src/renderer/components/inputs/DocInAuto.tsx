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
} & React.ComponentProps<'td'>;

const DocInAuto = ({
  textAlign,
  options,
  value,
  onEdit,
  children,
  disabled,
  multiline,
  ...rest
}: P) => (
  <td {...rest}>
    {children}
    <Autocomplete
      disabled={disabled}
      options={options}
      value={value}
      disableClearable
      freeSolo
      onChange={(e, v) => v && onEdit(v)}
      renderInput={(ps) => (
        <DocInText {...ps} textAlign={textAlign} multiline={multiline} />
      )}
      renderOption={(props, option) => (
        <li {...props} style={{ padding: 3 }}>
          <span className="input-option">{option}</span>
        </li>
      )}
    />
  </td>
);

export default DocInAuto;
