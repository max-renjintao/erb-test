/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */

import { Input, InputProps } from '@mui/material';
import { ImmerHook } from 'use-immer';
import InText from './InText2';

type P = { immer: [ImmerHook<any>, string]; pl?: string } & InputProps;

const InImNum = ({ immer: [[v, im], k], pl, ...props }: P) => (
  <InText
    fullWidth
    label={k}
    type="number"
    pl={pl}
    value={`${v[k]}`}
    onChange={(e) =>
      im((d: { [x: string]: string }) => {
        d[k] = +e.target.value;
      })
    }
    {...props}
  />
);
export default InImNum;
