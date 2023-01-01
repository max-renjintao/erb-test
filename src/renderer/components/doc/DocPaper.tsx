/* eslint-disable react/jsx-props-no-spreading */

type P = React.ComponentProps<'div'>;
const PrintPaper = (props: P) => {
  return <div className="invoice-paper" {...props} />;
};

export default PrintPaper;
