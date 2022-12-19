import useWork from 'renderer/store/useWork';

const InvoiceHeader = () => {
  const { work } = useWork();
  return (
    <>
      <h1 style={{ marginTop: 0, marginBottom: 5 }}>Proforma Invoice</h1>
      <h6 style={{ textAlign: 'right', margin: 2, color: 'blue' }}>
        No. 编号：{work.sn}
      </h6>
      <h6 style={{ textAlign: 'right', margin: 2 }}>
        Date. 日期 {work.date_e && work.date_e.getDay()} D日/{' '}
        {work.date_e && work.date_e.getMonth()} M月/{' '}
        {work.date_e && work.date_e.getFullYear()} Y年
      </h6>
    </>
  );
};

export default InvoiceHeader;
