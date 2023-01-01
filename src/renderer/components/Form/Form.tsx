import { Stack, StackProps } from '@mui/material';
import React from 'react';

type P = StackProps;
const FormWrap = ({ title, children }: P) => {
  return (
    <Stack className="no-print">
      {title && (
        <small style={{ padding: '1px 4px', backgroundColor: '#ccc' }}>
          {title}
        </small>
      )}

      {children}
    </Stack>
  );
};

export default FormWrap;
