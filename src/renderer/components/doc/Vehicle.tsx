/* eslint-disable react/no-unescaped-entities */
import InvoiceInput from 'renderer/components/inputs/DocInAuto';

import { deduplicateVar } from 'utils/deduplicate';
import DocTable from './DocTable';
import DocTableTd from './DocTableTd';

type P = WorkImmerProps & { options: WorkOptions };
const DocVehicle = ({ immer: [work, imWork], options }: P) => {
  return (
    <DocTable heading="Vehicle and owner's information 车辆及车主信息">
      <tr>
        <DocTableTd width="15%">
          Number Plate <br /> 车牌号码
        </DocTableTd>

        <InvoiceInput
          options={options.vehicles.map((v) => v.plate)}
          value={work.plate}
          onEdit={(plate) => {
            const same = options.vehicles.find((w) => w.plate === plate);
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

        <DocTableTd width="15%">
          Vehicle Model <br /> 车辆型号
        </DocTableTd>

        <InvoiceInput
          options={options.models}
          value={work.model}
          onEdit={(model) =>
            imWork((w) => {
              w.model = model;
            })
          }
        />

        <DocTableTd width="15%">
          The Mileage <br /> 行驶里程
        </DocTableTd>

        <InvoiceInput
          options={[
            `${
              options.vehicles.find((v) => v.plate === work.plate)?.mileage ||
              '0'
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
        <DocTableTd width="15%">
          Owner's Name <br /> 车主姓名
        </DocTableTd>
        <InvoiceInput
          options={deduplicateVar(options.vehicles.map((v) => v.owner))}
          value={work.owner}
          onEdit={(owner) => {
            const ops = options.vehicles;
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
        <DocTableTd width="15%">
          Telephone No. <br /> 联系电话
        </DocTableTd>
        <InvoiceInput
          options={[]}
          value={work.tel}
          onEdit={(tel) =>
            imWork((w) => {
              w.tel = tel;
            })
          }
        />
        <DocTableTd width="15%">
          Number of VIP <br /> 会员卡号
        </DocTableTd>
        <InvoiceInput
          options={deduplicateVar(options.vehicles.map((v) => v.vip))}
          value={work.vip}
          onEdit={(vip) => {
            if (vip) {
              const ops = options.vehicles;
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
    </DocTable>
  );
};

export default DocVehicle;
