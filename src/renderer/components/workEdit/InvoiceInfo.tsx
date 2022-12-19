import React from 'react';
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import InvoiceInput from '../InvoiceInput';

const InvoiceInfo = () => {
  const { work, works, setWork, setWorkImmer, options } = useWork();

  const cellInput = (k: keyof Work, onChangeMore?: (v: any) => void) => (
    <InvoiceInput
      options={options(k)}
      value={`${work[k]}`}
      onEdit={(v) => {
        setWorkImmer((d) => {
          // console.log(d, k, d[k]);

          (d as any)[k] = typeof d[k] === 'number' ? +v : v.toString();
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onChangeMore && onChangeMore(v);
      }}
    />
  );

  return (
    <InvoiceTable heading="Vehicle and owner's information 车辆及车主信息">
      <tr>
        <Th w="15%" en="Number Plate" zh="车牌号码" />
        <InvoiceInput
          options={options('plate')}
          value={work.plate}
          onEdit={(plate) => {
            const same = works.find((w) => w.plate === plate);
            if (same) {
              const { model, owner, tel, vip } = same;
              setWork((w) => ({ ...w, plate, model, owner, tel, vip }));
            } else {
              setWork((w) => ({ ...w, plate }));
            }
          }}
        />
        <Th w="15%" en="Vehicle Model" zh="车辆型号" />
        {cellInput('model')}
        <Th w="15%" en="The Mileage" zh="行驶里程" />
        <InvoiceInput
          options={[`last:${'none'}`]}
          value={`${work.mileage.toLocaleString()} /km`}
          onEdit={(v) => {
            setWorkImmer((d) => {
              // console.log(d, k, d[k]);

              d.mileage = +v.slice(0, -3).replaceAll(',', '').replace('，', '');
            });
          }}
        />
      </tr>
      <tr>
        <Th en="Owner's Name" zh="车主姓名" />
        {cellInput('owner')}
        <Th en="Telephone No." zh="联系电话" />
        {cellInput('tel')}
        <Th en="Number of VIP" zh="会员卡号" />
        {/* {cellInput('vip')} */}
        <td>
          {/* <TextField
            sx={{ p: 0, w: '100%', display: 'flex' }}
            variant="standard"
            size="small"
            label=" "
            inputProps={{ sx: { display: 'flex', h: '100' } }}
          /> */}
        </td>
      </tr>
    </InvoiceTable>
  );
};

export default InvoiceInfo;
