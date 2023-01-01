/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import '../../invoice.scss';

export type DocTableProps = {
  heading?: string;
  noBorderTop?: boolean;
} & React.ComponentProps<'div'>;
const DocTable = ({
  heading,
  children,
  noBorderTop,
  ...props
}: DocTableProps) => (
  <div {...props} style={{ position: 'relative', ...props.style }}>
    <table className="invoice-table" style={{ height: '100%', width: '100%' }}>
      <thead>
        <tr>
          <th colSpan={99} style={{ borderTop: noBorderTop ? 0 : undefined }}>
            <div>{heading}</div>
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

export default DocTable;
