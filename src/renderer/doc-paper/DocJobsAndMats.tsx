/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import DocTable from 'renderer/components/doc/DocTable';
import { deduplicateVar } from 'utils/deduplicate';
import { amount } from 'utils/disp';
import { getWorkLabor, getWorkMaterial } from 'utils/getAmount';
import DocInAuto from 'renderer/components/doc/DocInAuto';
import { jobInit, matInit, Work } from 'constants/const-work';
import { Options, worksInit } from 'constants/const-store';
import DocMenuBar from 'renderer/components/doc/DocMenuBar';
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
import DocInNum from 'renderer/components/doc/DocInNum';
import Td from '../components/doc/DocTableTd';
import IconBtn from '../components/doc/DocIconBtn';

type P = DocProps & { full: boolean };
const DocJobsAndMats = ({
  imm: [work, imWork],
  options,
  disabled,
  full,
}: P) => {
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
  const BtnAppendJob = disabled || (
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
  );
  return (
    <>
      <DocTable
        noBorderTop
        heading="Maintenance Items and Expense List 维修项目及费用清单"
      >
        <tr>
          {(
            [
              ['5%', 'Sn', '编号'],
              ['10%', 'Item Code', '项目编号'],
              ['33%', 'Maintenance Item', '维修项目'],
              full && ['9%', 'Labor Cost', '人工费(K)'],
              ['19%', 'Used Parts/Materials', '所用配件/材料'],
              ['5%', 'Qty', '数量'],
              full && ['8%', 'Unit Price', '单价(K)'],
              full && ['12%', 'Materials Cost', '材料费(K)'],
            ] as string[][]
          )
            .filter((f) => f)
            .map((td, i) => (
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
                {disabled || (
                  <DocMenuBar sx={{ left: -30 }}>
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
                      disabled={jobId === 0}
                      onClick={() =>
                        imWork((w) => {
                          w.jobs.splice(
                            jobId - 1,
                            0,
                            w.jobs.splice(jobId, 1)[0]
                          );
                        })
                      }
                    />
                    <IconBtn
                      MuiIcon={South}
                      disabled={jobId === work.jobs.length - 1}
                      onClick={() =>
                        imWork((w) => {
                          w.jobs.splice(
                            jobId + 1,
                            0,
                            w.jobs.splice(jobId, 1)[0]
                          );
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
                  </DocMenuBar>
                )}
                {jobId + 1}
              </Td>
              <DocInAuto // job / code
                disabled={disabled}
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
                disabled={disabled}
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
              {full && !!jobCostRowSpans[jobId] && (
                <td rowSpan={jobCostRowSpans[jobId]}>
                  <DocInNum // job / cost
                    disabled={disabled}
                    format="0,0.00"
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
              {full && <td />}
              {full && <td />}
              <Td>
                {disabled || (
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
                )}
              </Td>
            </tr>
          ) : (
            job.mats.map((mat, matId) => (
              <tr key={`${jobId}-${matId}`}>
                {matId === 0 && tdsLabor}
                <DocInAuto // mat / name
                  disabled={disabled}
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
                    disabled={disabled}
                    value={mat.qty}
                    format="0,0[.]0"
                    onEdit={(v) =>
                      imWork((d) => {
                        d.jobs[jobId].mats[matId].qty = v;
                      })
                    }
                  />{' '}
                  {disabled || (
                    <DocMenuBar sx={{ right: -30 }}>
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
                        MuiIcon={North}
                        disabled={matId === 0}
                        onClick={() =>
                          imWork((w) => {
                            w.jobs[jobId].mats.splice(
                              matId - 1,
                              0,
                              w.jobs[jobId].mats.splice(matId, 1)[0]
                            );
                          })
                        }
                      />
                      <IconBtn
                        MuiIcon={South}
                        disabled={matId === job.mats.length - 1}
                        onClick={() =>
                          imWork((w) => {
                            w.jobs[jobId].mats.splice(
                              matId + 1,
                              0,
                              w.jobs[jobId].mats.splice(matId, 1)[0]
                            );
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
                    </DocMenuBar>
                  )}
                </td>
                {full && (
                  <td>
                    <DocInNum // mat / rate
                      disabled={disabled}
                      value={mat.rate}
                      format="0,0.00"
                      onEdit={(v) =>
                        imWork((d) => {
                          d.jobs[jobId].mats[matId].rate = v;
                          if (mat.qty < 1) d.jobs[jobId].mats[matId].qty = 1;
                        })
                      }
                    />
                  </td>
                )}
                {full && <Td right>{amount(mat.qty * mat.rate) || '-'}</Td>}
              </tr>
            ))
          );
        })}
        {full && (
          <tr style={{ backgroundColor: '#ddd', height: 40 }}>
            <Td colSpan={3}>
              Sub-total of Labor Cost 人工费合计 (K){BtnAppendJob}
            </Td>
            <Td right>{amount(getWorkLabor(work))}</Td>
            <Td colSpan={3}>Sub-total of Material Cost 材料费合计 (K)</Td>
            <Td right>{amount(getWorkMaterial(work))}</Td>
          </tr>
        )}
      </DocTable>
      {full || <div style={{ position: 'relative' }}> {BtnAppendJob}</div>}
    </>
  );
};

export default DocJobsAndMats;
