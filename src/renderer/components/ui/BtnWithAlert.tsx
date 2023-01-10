/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { Close } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { ReactNode, useState } from 'react';
import Dlg from 'renderer/components/ui/Dlg';
import Btn, { BtnProps } from './Btn';

type P = {
  title: string;
  btnProps: BtnProps[];
} & BtnProps;
const BtnWithAlert = ({ title, children, btnProps, ...ps }: P) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const btnAddFunc = (Btn: JSX.Element) => Btn.props.onClick;
  return (
    <>
      <Btn onClick={handleOpen} {...ps} />
      <Dlg title={title} content={children} open={open} onClick={handleClose}>
        {btnProps.map((bps, i) => (
          <Btn
            key={i}
            {...bps}
            onMouseUp={(e) => {
              if (bps.onMouseUp) bps.onMouseUp(e);
              handleClose();
            }}
          />
        ))}
        <Btn
          onClick={handleClose}
          startIcon={<Close fontSize="small" />}
          text="cancel"
        />
      </Dlg>
    </>
  );
};

export default BtnWithAlert;
