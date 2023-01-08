const DocFooter = ({ imm: [work] }: DocProps) => {
  return (
    <div
      style={{
        fontSize: 11,
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30,
        width: 600,
      }}
    >
      {work.status === 4 && (
        <>
          <div>Customer 客户:</div>
          <div>Receptionist 接待员:</div>
        </>
      )}
    </div>
  );
};

export default DocFooter;
