/* eslint-disable react/jsx-props-no-spreading */
import DocInText, { DocInTextProps } from './DocInText';

type P = { value: number; onEdit: (v: number) => void } & DocInTextProps;
const DocInNum = ({ value, onEdit, ...ps }: P) => {
  return (
    <DocInText
      value={`${value || '-'}`}
      onFocus={(e) => {
        if (!+e.target.value) e.target.select();
      }}
      onChange={(e) => onEdit(+e.target.value || 0)}
      textAlign="right"
      {...ps}
    />
  );
};

export default DocInNum;
