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
  const jobRowSpans = work.jobs.map((j) => j.mats.length || 1);
  const jobCostRowSpans = work.jobs.map((job, jobId, jobs) => {
    let jobCostRowSpan = jobRowSpans[jobId];
    if (jobId > 0 && job.joinUp) {
      //
      jobCostRowSpan = 0;
    } else {
      for (let i = jobId + 1; i < jobs.length; i++) {
        if (jobs[i].joinUp) jobCostRowSpan += jobRowSpans[i];
        else break;
      }
    }
    return jobCostRowSpan;
  });
  console.log(`jobRowSpans:${jobRowSpans}`);
  console.log(`jobCostRowS:${jobCostRowSpans}`);

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
          ['9%', 'Labor Cost', '人工费(K)'],
          ['20%', 'Used Parts/Materials', '所用配件/材料'],
          ['4%', 'Qty', '数量'],
          ['6%', 'Unit Price', '单价(K)'],
          ['9%', 'Materials Cost', '材料费(K)'],
        ].map((td, i) => (
          <Td key={i} width={td[0]}>
            {td[1]} <br /> {td[2]}
          </Td>
        ))}
      </tr>
      {work.jobs?.map((job, jobId) => {
        const rowSpan = jobRowSpans[jobId] || undefined;

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
                <IconBtn
                  color={work.jobs[jobId].joinUp ? 'primary' : 'default'}
                  MuiIcon={JoinFull}
                  onClick={() =>
                    imWork((w) => {
                      w.jobs[jobId].joinUp = !work.jobs[jobId].joinUp;
                      if (!work.jobs[jobId].joinUp) w.jobs[jobId].cost = 0;
                    })
                  }
                />
              </MenuEditJob>
              {/* {jobId + 1}  */}
              {jobCostRowSpans[jobId]}
              {job.joinUp && 'j'}
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
            {!!jobCostRowSpans[jobId] && (
              <td rowSpan={jobCostRowSpans[jobId]}>
                <DocInNum // job / cost
                  value={job.cost}
                  onEdit={(v) =>
                    imWork((d) => {
                      d.jobs[jobId].cost = v;
                    })
                  }
                />
              </td>
            )}
          </>
        );

        return job.mats.length === 0 ? (
          <tr key={jobId}>
            {tdsLabor}
            <td />
            <td />
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
              </td>
              <td>
                <DocInNum // mat / rate
                  value={mat.rate}
                  onEdit={(v) =>
                    imWork((d) => {
                      d.jobs[jobId].mats[matId].rate = v;
                      if (mat.qty < 1) d.jobs[jobId].mats[matId].qty = 1;
                    })
                  }
                />
              </td>
              <Td right>
                {mat.qty * mat.rate || '-'}

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
              </Td>
            </tr>
          ))
        );
      })}
      <tr style={{ backgroundColor: '#ddd', height: 40 }}>
        <Td colSpan={3}>
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
          Sub-total of Labor Cost 人工费合计 (K)
        </Td>
        <Td right>{amount(getWorkLabor(work), '0,0')}</Td>
        <Td colSpan={3}>Sub-total of Material Cost 材料费合计 (K)</Td>
        <Td right>{amount(getWorkMaterial(work), '0,0')}</Td>
      </tr>
    </DocTable>
  );
};

export default DocJobsAndMats;
