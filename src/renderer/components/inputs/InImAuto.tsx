/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */

// https://www.toyodiy.com/parts/q?vin=ANH20-8040587

import { Autocomplete, Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ImmerHook } from 'use-immer';

type P = {
  immer: [ImmerHook<Work>, keyof Work];
  pl?: string;
  options: string[];
};
const InImAuto = ({ immer, pl = '70px', options }: P) => {
  const [[work, imWork], k] = immer;
  const handleInput = (v: any) =>
    work[k] === v &&
    imWork((w) => {
      w[k as 'sn'] = v;
    });
  return (
    <Autocomplete
      options={options}
      value={work[k] as string}
      onChange={handleInput}
      onInputChange={handleInput}
      renderInput={(ps) => (
        <TextField
          {...ps}
          variant="standard"
          size="small"
          InputProps={{
            ...ps.InputProps,
            startAdornment: (
              <small style={{ minWidth: pl || '70px' }}>{k}</small>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} style={{ padding: 3 }}>
          <span className="input-option">{option}</span>
        </li>
      )}
      disableClearable
      freeSolo
    />
  );
};

export default InImAuto;
