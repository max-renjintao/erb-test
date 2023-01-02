/* eslint-disable react/jsx-props-no-spreading */

type P = React.ComponentProps<'div'>;
const DocPaper = (props: P) => {
  return <div className="doc-paper" {...props} />;
};

export default DocPaper;
