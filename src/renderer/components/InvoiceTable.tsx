/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { TextField, TextFieldProps } from '@mui/material';
import React, { CSSProperties } from 'react';
import '../invoice.scss';

type CellProps = {
  justifyContent?: CSSProperties['justifyContent'];
} & React.ComponentProps<'td'>;

export const InvoiceCell = ({
  justifyContent,
  children,
  ...rest
}: CellProps) => (
  <td {...rest}>
    <div className="gutter" style={{ justifyContent }}>
      {children}
    </div>
  </td>
);

export const TxtIn = (props: TextFieldProps) => (
  <TextField variant="standard" size="small" label=" " {...props} />
);

export const InvoiceTH = ({
  w,
  en,
  zh,
}: {
  w?: string;
  en: string;
  zh: string;
}) => (
  <InvoiceCell width={w}>
    {en}
    {zh && (
      <>
        <br />
        {zh}
      </>
    )}
  </InvoiceCell>
);

const InvoiceTable = ({
  heading,
  children,
  style,
}: {
  heading: string;
  children: any;
  style?: React.CSSProperties;
}) => (
  <div style={{ position: 'relative' }}>
    <table className="invoice-table" style={style}>
      <thead>
        <tr>
          <th colSpan={99}>
            <div>{heading}</div>
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

export default InvoiceTable;
