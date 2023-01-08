/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */

import { Input, InputProps } from '@mui/material';
import { ImmerHook } from 'use-immer';
import InText, { InTextProps } from './InText2';

type P = { immer: [ImmerHook<any>, string]; pl?: string } & InTextProps;

const InImNum = ({ immer: [[v, im], k], ...ps }: P) => (
  <InText
    fullWidth
    label={k}
    type="number"
    sx={{ textAlign: 'right', ...ps.sx }}
    value={`${v[k]}`}
    onChange={(e) =>
      im((d: { [x: string]: string }) => {
        d[k] = +e.target.value;
      })
    }
    {...ps}
  />
);
export default InImNum;
