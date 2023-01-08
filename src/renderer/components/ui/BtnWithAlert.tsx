/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, ButtonProps } from '@mui/material';
import { ReactNode, useState } from 'react';
import Dlg from 'renderer/components/ui/Dlg';

type P = {
  text: ReactNode;
  title: string;
  btnProps: ButtonProps[];
} & ButtonProps;
const BtnWithAlert = ({ text, title, children, btnProps, ...ps }: P) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const btnAddFunc = (Btn: JSX.Element) => Btn.props.onClick;
  return (
    <>
      <Button size="small" onClick={handleOpen} {...ps}>
        {text}
      </Button>
      <Dlg
        title={title}
        content={children}
        open={open}
        onClick={handleClose}
      >
        {btnProps.map((bps, i) => (
          <Button
            key={i}
            {...bps}
            onMouseUp={(e) => {
              if (bps.onMouseUp) bps.onMouseUp(e);
              handleClose();
            }}
          />
        ))}
        <Button onClick={handleClose}>Cancel</Button>
      </Dlg>
    </>
  );
};

export default BtnWithAlert;
