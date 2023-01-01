/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

// https://www.toyodiy.com/parts/q?vin=ANH20-8040587

import { Autocomplete } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ReactNode } from 'react';

type P = {
  label?: ReactNode;
  pl?: string;
  multiline?: boolean;
  // options: string[];
  onEdit: (v: string) => void;
} & Omit<AutocompleteProps<string, false, true, true>, 'renderInput'>;
const InAuto = ({
  label,
  multiline,
  pl = '70px',
  // options,
  onEdit,
  ...rest
}: P) => {
  return (
    <Autocomplete
      // options={options}
      disableClearable
      freeSolo
      onChange={(e, v) => onEdit(v)}
      onInputChange={(e, v) => onEdit(v)}
      renderInput={(ps) => (
        <TextField
          multiline={multiline}
          {...ps}
          variant="standard"
          size="small"
          InputProps={{
            ...ps.InputProps,
            startAdornment: (
              <small style={{ minWidth: pl || '70px' }}>{label}</small>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} style={{ padding: 3 }}>
          <span className="input-option">{option}</span>
        </li>
      )}
      {...rest}
    />
  );
};

export default InAuto;
