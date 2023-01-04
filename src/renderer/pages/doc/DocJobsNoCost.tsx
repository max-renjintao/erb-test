/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import DocTable from 'renderer/components/doc/DocTable';
import { deduplicateVar } from 'utils/deduplicate';
import { amount } from 'utils/disp';
import { getWorkLabor, getWorkMaterial } from 'utils/getAmount';
import DocInAuto from 'renderer/components/inputs/DocInAuto';
import { jobInit, matInit, Work } from 'constants/const-work';
import DocInNum from 'renderer/components/inputs/DocInNum';
import { ImmerHook } from 'use-immer';
import { Options } from 'constants/const-store';
import {
  Add,
  Delete,
  JoinFull,
  North,
  NorthEast,
  NorthWest,
  South,
  SouthEast,
  SouthWest,
} from '@mui/icons-material';
import Td from '../../components/doc/DocTableTd';
import MenuEditJob from '../../components/menu/MenuBar';
import IconBtn from '../../components/menu/IconBtn';

type P = { imm: ImmerHook<Work>; options: Options };
const DocJobsAndMats = ({ imm: [work, imWork], options }: P) => {
  return (
    <DocTable
      noBorderTop
      heading="Maintenance Items and Expense List 维修项目及费用清单"
    >
      <tr>
        {[
          ['4%', 'Sn', '编号'],
          ['12%', 'Item Code', '项目编号'],
          ['36%', 'Maintenance Item', '维修项目'],

          ['20%', 'Used Parts/Materials', '所用配件/材料'],
          ['4%', 'Qty', '数量'],
        ].map((td, i) => (
          <Td key={i} width={td[0]}>
            {td[1]} <br /> {td[2]}
          </Td>
        ))}
      </tr>
      {work.jobs?.map((job, jobId) => {
        const rowSpan = job.mats.length || 1;
        const tdsLabor = (
          <>
            <Td rowSpan={rowSpan}>
              <MenuEditJob sx={{ left: -30 }}>
                <IconBtn
                  color="error"
                  MuiIcon={Delete}
                  onClick={() =>
                    imWork((w) => {
                      w.jobs.splice(jobId, 1);
                    })
                  }
                />

                <IconBtn
                  MuiIcon={North}
                  onClick={() =>
                    imWork((w) => {
                      // w.needs.splice(i + 1, 0, w.needs.splice(i, 1)[0]);
                    })
                  }
                />
                <IconBtn
                  MuiIcon={South}
                  onClick={() =>
                    imWork((w) => {
                      w.jobs.splice(jobId, 0, jobInit);
                    })
                  }
                />
                <IconBtn
                  MuiIcon={NorthEast}
                  onClick={() =>
                    imWork((w) => {
                      w.jobs.splice(jobId, 0, jobInit);
                    })
                  }
                />
                <IconBtn
                  MuiIcon={SouthEast}
                  onClick={() =>
                    imWork((w) => {
                      w.jobs.splice(jobId + 1, 0, jobInit);
                    })
                  }
                />
              </MenuEditJob>
              {jobId + 1}
            </Td>
            <DocInAuto // job / code
              rowSpan={rowSpan}
              options={options.jobs.map((j) => j.code)}
              value={job.code}
              onEdit={(v) =>
                imWork((d) => {
                  d.jobs[jobId].code = v;
                  if (v) {
                    const sameJob = options.jobs.find((j) => j.code === v);
                    if (sameJob) {
                      d.jobs[jobId].item = sameJob.item;
                      d.jobs[jobId].cost = sameJob.cost || 0;
                    }
                  }
                })
              }
            />
            <DocInAuto // job / item
              multiline
              textAlign="left"
              rowSpan={rowSpan}
              options={deduplicateVar(options.jobs.map((j) => j.item))}
              value={job.item}
              onEdit={(v) =>
                imWork((d) => {
                  d.jobs[jobId].item = v;
                  if (v) {
                    const sameJob = options.jobs.find((j) => j.item === v);
                    if (sameJob) {
                      d.jobs[jobId].code = sameJob.code;
                      if (!d.jobs[jobId].cost)
                        d.jobs[jobId].cost = sameJob.cost || 0;
                    }
                  }
                })
              }
            />
          </>
        );

        return job.mats.length === 0 ? (
          <tr key={jobId}>
            {tdsLabor}
            <td />
            <Td>
              <span style={{ position: 'absolute', right: -30 }}>
                <IconBtn
                  MuiIcon={Add}
                  onClick={() =>
                    imWork((w) => {
                      w.jobs[jobId].mats.push(matInit);
                    })
                  }
                />
              </span>
            </Td>
          </tr>
        ) : (
          job.mats.map((mat, matId) => (
            <tr key={`${jobId}-${matId}`}>
              {matId === 0 && tdsLabor}
              <DocInAuto // mat / name
                multiline
                options={options.mats.map((m) => m.name)}
                value={mat.name}
                onEdit={(v) =>
                  imWork((d) => {
                    d.jobs[jobId].mats[matId].name = v;
                    const sameMat = options.mats.find((m) => m.name === v);
                    if (sameMat) {
                      d.jobs[jobId].mats[matId].qty = sameMat.qty || 1;
                      d.jobs[jobId].mats[matId].rate = sameMat.rate || 0;
                    }
                  })
                }
              />
              <td>
                <DocInNum // mat / qty
                  value={mat.qty}
                  onEdit={(v) =>
                    imWork((d) => {
                      d.jobs[jobId].mats[matId].qty = v;
                    })
                  }
                />

                <MenuEditJob sx={{ right: -30 }}>
                  <IconBtn
                    MuiIcon={NorthWest}
                    onClick={() =>
                      imWork((w) => {
                        w.jobs[jobId].mats.splice(matId, 0, matInit);
                      })
                    }
                  />
                  <IconBtn
                    MuiIcon={SouthWest}
                    onClick={() =>
                      imWork((w) => {
                        w.jobs[jobId].mats.splice(matId + 1, 0, matInit);
                      })
                    }
                  />
                  <IconBtn
                    color="error"
                    MuiIcon={Delete}
                    onClick={() =>
                      imWork((w) => {
                        w.jobs[jobId].mats.splice(matId, 1);
                      })
                    }
                  />
                </MenuEditJob>
              </td>
            </tr>
          ))
        );
      })}
      <span style={{ position: 'absolute', left: -30 }}>
        <IconBtn
          MuiIcon={Add}
          onClick={() =>
            imWork((w) => {
              w.jobs.push(jobInit);
            })
          }
        />
      </span>
    </DocTable>
  );
};

export default DocJobsAndMats;
