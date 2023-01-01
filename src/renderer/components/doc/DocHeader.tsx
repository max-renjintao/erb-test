type P = { title: string; sn: number; date: Date };
const DocHeader = ({ title, sn, date }: P) => {
  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: 5 }}>{title}</h1>
      <h6 style={{ textAlign: 'right', margin: 2, color: '#0070c0' }}>
        No. 编号：{sn}
      </h6>
      <h6 style={{ textAlign: 'right', margin: 2 }}>
        Date. 日期 {date.getDate()} D日/ {date.getMonth() + 1} M月/{' '}
        {date.getFullYear()} Y年
      </h6>
    </div>
  );
};

export default DocHeader;
