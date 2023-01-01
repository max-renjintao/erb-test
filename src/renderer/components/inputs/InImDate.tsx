/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */

import { InputProps } from '@mui/material';
import { ImmerHook } from 'use-immer';
import { dateFormat } from 'utils/date';
import InText from './InText2';

type P = { immer: [ImmerHook<any>, string]; pl?: string } & InputProps;

const InImDate = ({ immer: [[v, im], k], pl = '70px', ...props }: P) => (
  <InText
    type="date"
    fullWidth
    label={k}
    pl={pl}
    value={dateFormat(v[k])}
    onChange={(e) =>
      im((d: { [x: string]: Date }) => {
        d[k] = new Date(e.target.value);
      })
    }
    {...props}
  />
);
export default InImDate;
