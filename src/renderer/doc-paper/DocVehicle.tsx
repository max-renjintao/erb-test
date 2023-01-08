/* eslint-disable react/no-unescaped-entities */
import DocInAuto from 'renderer/components/doc/DocInAuto';
import DocInNum from 'renderer/components/doc/DocInNum';

import { deduplicateVar } from 'utils/deduplicate';
import { amount } from 'utils/disp';
import DocTable from '../components/doc/DocTable';
import DocTableTd from '../components/doc/DocTableTd';

const DocVehicle = ({ imm: [work, imWork], disabled, options }: DocProps) => {
  return (
    <DocTable heading="Vehicle and owner's information 车辆及车主信息">
      <tr>
        <DocTableTd width="15%">
          Number Plate <br /> 车牌号码
        </DocTableTd>

        <DocInAuto
          disabled={disabled}
          options={options.vehicles.map((v) => v.plate).filter((f) => !!f)}
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

        <DocInAuto
          disabled={disabled}
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
        <DocTableTd width="17%">
          <DocInNum
            disabled={disabled}
            format="0,0"
            unit="/km"
            textAlign="center"
            value={work.mileage}
            onEdit={(v) => {
              imWork((d) => {
                d.mileage = v;
              });
            }}
          />
        </DocTableTd>
      </tr>
      <tr>
        <DocTableTd width="15%">
          Owner's Name <br /> 车主姓名
        </DocTableTd>
        <DocInAuto
          disabled={disabled}
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
        <DocInAuto
          disabled={disabled}
          options={deduplicateVar(options.vehicles.map((v) => v.tel)).filter(
            (f) => !!f
          )}
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
        <DocInAuto
          disabled={disabled}
          options={deduplicateVar(options.vehicles.map((v) => v.vip)).filter(
            (f) => !!f
          )}
          value={work.vip || '/'}
          onEdit={(vip) => {
            console.log('vip:', vip, 'work.vip:', work.vip);

            if (vip && vip !== '/') {
              const ops = options.vehicles;
              const same = ops.find((w) => w.vip === vip);
              if (same) {
                imWork((w) => {
                  w.owner = same.owner;
                  w.tel = same.tel;
                  w.vip = same.vip;
                });
              } else {
                imWork((w) => {
                  w.vip = vip;
                });
              }
            } else {
              imWork((w) => {
                w.vip = '';
              });
            }
          }}
        />
      </tr>
    </DocTable>
  );
};

export default DocVehicle;
