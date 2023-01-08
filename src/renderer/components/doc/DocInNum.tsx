/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import DocInText, { DocInTextProps } from './DocInText';

type P = {
  value: number;
  format?: string;
  unit?: string;
  onEdit: (v: number) => void;
} & DocInTextProps;
const DocInNum = ({ value, onEdit, format, unit, ...ps }: P) => {
  const [str, setStr] = useState(`${value}`);
  useEffect(() => {
    let s = '-';
    if (value) s = format ? numeral(value).format(format) : s;
    setStr(unit ? `${s} ${unit}` : s);
  }, [format, value, unit]);
  return (
    <DocInText
      value={str}
      onFocus={(e) => {
        if (!+e.target.value) e.target.select();
      }}
      onChange={(e) => setStr(e.target.value)}
      onBlur={() => onEdit(numeral(str).value() || 0)}
      textAlign="right"
      {...ps}
    />
  );
};

export default DocInNum;
