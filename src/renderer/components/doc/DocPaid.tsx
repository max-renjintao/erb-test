/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentProps } from 'react';

type P = ComponentProps<'div'>;
const DocPaid = ({ style, ...ps }: P) => {
  return (
    <div
      {...ps}
      style={{
        zIndex: 999,
        position: 'absolute',
        right: 150,
        marginTop: 0,
        transform: 'rotate(-30deg)',
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 40,
          color: '#bb0000',
          border: '6px solid #bb0000',
          padding: '8px 16px',
          borderRadius: 16,
          opacity: 0.5,
        }}
      >
        InvoicePaid
      </div>
    </div>
  );
};

export default DocPaid;
