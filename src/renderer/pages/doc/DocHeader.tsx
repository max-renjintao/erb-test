import { isValid } from 'date-fns';
import { HEADERS } from 'renderer/store/constants';
import useWork from 'renderer/store/useWork';

const DocHeader = ({ work }: { work: Work }) => {
  // const { work } = useWork();
  // const status = work.status;
  const date =
    work.date_e || isValid(work.date_e) ? work.date_e : new Date(Date.now());
  return (
    <>
      <h1 style={{ marginTop: 0, marginBottom: 5 }}>
        {HEADERS[work.status]}
        {/* {status === 'paid' || status === 'doing' || status === 'done'
          ? 'Proforma Invoice'
          : 'QUOTATION'} */}
      </h1>
      <h6 style={{ textAlign: 'right', margin: 2, color: '#0070c0' }}>
        No. 编号：{work.sn}
      </h6>
      <h6 style={{ textAlign: 'right', margin: 2 }}>
        Date. 日期 {date.getDate()} D日/ {date.getMonth() + 1} M月/{' '}
        {date.getFullYear()} Y年
      </h6>
    </>
  );
};

export default DocHeader;
