import React from 'react';
import { workInit } from 'renderer/store/constants';
import { useImmer } from 'use-immer';

const DialogWork = () => {
  const workImmer = useImmer(workInit);
  return (
    <div className="invoice-paper">
      <InvoiceHeader />
      <InvoiceVehicle />
      <InvoiceNeeds />
      <ButtonSide // order / append button
        left={18}
        mt={-15}
        onClick={() => {
          insertOrder(999);
        }}
      >
        <EastIcon />
      </ButtonSide>
      <InvoiceItemList />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <div style={{ position: 'relative', width: 520, paddingRight: 30 }}>
          <InvoiceNotice />
          {work.status.toLowerCase() === 'paid' && (
            <div
              style={{
                position: 'absolute',
                right: -200,
                marginTop: -150,
                transform: 'rotate(-30deg)',
              }}
            >
              <InvoicePaid />
            </div>
          )}
        </div>
        <div style={{ width: 260 }}>
          <InvoiceBill />
        </div>
      </div>
      <InvoiceFooter />
    </div>
  );
};

export default DialogWork;
