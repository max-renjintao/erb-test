/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

type CellProps = {
  left?: boolean;
  right?: boolean;
  // textAlign?: React.CSSProperties['justifyContent'];
} & React.ComponentProps<'td'>;

const DocTableTd = ({ children, left, right, ...rest }: CellProps) => (
  <td {...rest}>
    <div
      className="cell"
      style={{ justifyContent: left ? 'start' : right ? 'end' : 'center' }}
    >
      {children}
    </div>
  </td>
);
export default DocTableTd;
