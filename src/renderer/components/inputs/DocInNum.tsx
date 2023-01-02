/* eslint-disable react/jsx-props-no-spreading */
import DocInText from './DocInText';

type P = { value: number; onEdit: (v: number) => void };
const DocInNum = ({ value, onEdit }: P) => {
  return (
    <DocInText
      value={`${value || '-'}`}
      onFocus={(e) => {
        if (!+e.target.value) e.target.select();
      }}
      onChange={(e) => onEdit(+e.target.value || 0)}
      textAlign="right"
    />
  );
};

export default DocInNum;
