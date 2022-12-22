import React from 'react';
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import { deduplicateVar } from 'utils/deduplicate';
import InvoiceInput from '../../inputs/InvoiceInput';

const InvoiceVehicle = () => {
  const { work, works, imWork, app } = useWork();

  // const cellInput = (k: keyof Work, onChangeMore?: (v: any) => void) => (
  //   <InvoiceInput
  //     options={options(k)}
  //     value={`${work[k]}`}
  //     onEdit={(v) => {
  //       imWork((d) => {
  //         // console.log(d, k, d[k]);

  //         (d as any)[k] = typeof d[k] === 'number' ? +v : v.toString();
  //       });
  //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //       onChangeMore && onChangeMore(v);
  //     }}
  //   />
  // );

  return (
    <InvoiceTable heading="Vehicle and owner's information 车辆及车主信息">
      <tr>
        <Th w="15%" en="Number Plate" zh="车牌号码" />
        <InvoiceInput
          options={app.workOps.vehicles.map((v) => v.plate)}
          value={work.plate}
          onEdit={(plate) => {
            const ops = app.workOps.vehicles;
            const same = ops.find((w) => w.plate === plate);
            if (same) {
              // const { model, owner, tel, vip } = same;
              imWork((w) => {
                w.plate = plate;
                w.model = same.model;
                w.owner = same.owner;
                w.tel = same.tel;
                w.vip = same.vip;
              });
            } else {
              imWork((w) => {
                w.plate = plate;
              });
            }
          }}
        />
        <Th w="15%" en="Vehicle Model" zh="车辆型号" />
        <InvoiceInput
          options={app.workOps.models}
          value={work.model}
          onEdit={(model) =>
            imWork((w) => {
              w.model = model;
            })
          }
        />
        <Th w="15%" en="The Mileage" zh="行驶里程" />
        <InvoiceInput
          options={[
            `${
              app.workOps.vehicles.find((v) => v.plate === work.plate)
                ?.mileage || '0'
            } /km`,
          ]}
          value={`${work.mileage.toLocaleString()} /km`}
          onEdit={(v) => {
            imWork((d) => {
              d.mileage = +v.slice(0, -3).replaceAll(',', '').replace('，', '');
            });
          }}
        />
      </tr>
      <tr>
        <Th en="Owner's Name" zh="车主姓名" />
        <InvoiceInput
          options={deduplicateVar(app.workOps.vehicles.map((v) => v.owner))}
          value={work.owner}
          onEdit={(owner) => {
            const ops = app.workOps.vehicles;
            const same = ops.find((w) => w.owner === owner);
            if (same) {
              imWork((w) => {
                w.owner = same.owner;
                w.tel = same.tel;
                w.vip = same.vip;
              });
            } else {
              imWork((w) => {
                w.owner = owner;
              });
            }
          }}
        />
        <Th en="Telephone No." zh="联系电话" />
        <InvoiceInput
          options={[]}
          value={work.tel}
          onEdit={(tel) =>
            imWork((w) => {
              w.tel = tel;
            })
          }
        />
        <Th en="Number of VIP" zh="会员卡号" />
        <InvoiceInput
          options={deduplicateVar(app.workOps.vehicles.map((v) => v.vip))}
          value={work.vip}
          onEdit={(vip) => {
            if (vip) {
              const ops = app.workOps.vehicles;
              const same = ops.find((w) => w.vip === vip);
              if (same) {
                imWork((w) => {
                  w.owner = same.owner;
                  w.tel = same.tel;
                  w.vip = same.vip;
                });
              }
            } else {
              imWork((w) => {
                w.vip = vip;
              });
            }
          }}
        />
      </tr>
    </InvoiceTable>
  );
};

export default InvoiceVehicle;
