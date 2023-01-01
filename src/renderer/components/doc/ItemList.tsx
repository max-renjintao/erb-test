/* eslint-disable react/no-array-index-key */
import DocTable from 'renderer/components/doc/DocTable';
import useWork from 'renderer/store/useWork';
import { deduplicateVar } from 'utils/deduplicate';
import { amount } from 'utils/disp';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { getWorkLabor, getWorkMaterial } from 'utils/getAmount';
import { ButtonSide } from 'renderer/components/inputs/Buttons';
import InvoiceInput from 'renderer/components/inputs/DocInAuto';
import { jobInit, matInit } from 'renderer/store/constants';
import Td from './DocTableTd';

type P = WorkImmerProps & { options: WorkOptions };
const DocItemList = ({ immer: [work, imWork], options }: P) => {
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
        const rowSpan = job.mats.length || undefined;
        const tdsLabor = (
          <>
            <Td rowSpan={rowSpan}>
              <ButtonSide // job / insert button
                left={-20}
                mt={(rowSpan || 1) * -40}
                onClick={() =>
                  // insertJob(jobId)
                  imWork((w) => {
                    w.jobs.splice(jobId, 0, jobInit);
                  })
                }
              >
                <EastIcon />
              </ButtonSide>
              {jobId + 1}
            </Td>
            <InvoiceInput // job / code
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
            <InvoiceInput // job / item
              multiline
              align="left"
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
                      d.jobs[jobId].cost = sameJob.cost || 0;
                    }
                  }
                })
              }
            />
            <InvoiceInput // job / cost
              rowSpan={rowSpan}
              textAlign="right"
              options={[]}
              value={`${job.cost || '-'}`}
              onEdit={(v) =>
                imWork((d) => {
                  d.jobs[jobId].cost = +v.replace(',', '') || 0;
                })
              }
            />
          </>
        );

        return job.mats.length === 0 ? (
          <tr key={jobId}>
            {tdsLabor}
            <td>
              <ButtonSide // mat / first mat button
                mt={-10}
                onClick={
                  // console.log(w.jobs[jobId]);

                  () =>
                    imWork((w) => {
                      w.jobs[jobId].mats.push(matInit);
                    })
                  //  insertMat(jobId, 999)
                }
              >
                <EastIcon />
              </ButtonSide>
            </td>
            <td />
            <td />
            <Td right>
              <ButtonSide // job / delete button
                right={-40}
                onClick={() =>
                  // deleteJob(jobId)
                  imWork((w) => {
                    w.jobs.splice(jobId, 1);
                  })
                }
              >
                <CloseIcon />
              </ButtonSide>
              -
            </Td>
          </tr>
        ) : (
          job.mats.map((mat, matId) => (
            <tr key={`${jobId}-${matId}`}>
              {matId === 0 && tdsLabor}
              <InvoiceInput // mat / name
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
              >
                <ButtonSide // mat /insert
                  right={-20}
                  mt={-10}
                  onClick={
                    () =>
                      imWork((w) => {
                        w.jobs[jobId].mats.splice(matId, 0, matInit);
                      })
                    // insertMat(jobId, matId)
                  }
                >
                  <WestIcon />
                </ButtonSide>
              </InvoiceInput>
              <InvoiceInput // mat / qty
                options={[]}
                value={`${mat.qty || '-'}`}
                onEdit={(v) =>
                  imWork((d) => {
                    d.jobs[jobId].mats[matId].qty = +v.replace(',', '') || 0;
                  })
                }
              />
              <InvoiceInput // mat / rate
                options={[]}
                textAlign="right"
                value={`${mat.rate || '-'}`}
                onEdit={(v) =>
                  imWork((d) => {
                    d.jobs[jobId].mats[matId].rate = +v.replace(',', '') || 0;
                    if (mat.qty < 1) d.jobs[jobId].mats[matId].qty = 1;
                  })
                }
              />
              <Td right>
                <ButtonSide // mat / delete button
                  right={-40}
                  onClick={
                    () =>
                      imWork((w) => {
                        w.jobs[jobId].mats.splice(matId, 1);
                      })

                    // deleteMat(jobId, matId)
                  }
                >
                  <CloseIcon />
                </ButtonSide>
                {mat.qty * mat.rate || '-'}
              </Td>
            </tr>
          ))
        );
      })}
      <tr style={{ backgroundColor: '#ddd', height: 40 }}>
        <Td colSpan={3}>
          <ButtonSide // job / append button
            left={-20}
            mt={-40}
            onClick={
              () =>
                imWork((w) => {
                  w.jobs.push(jobInit);
                })
              // insertJob(9999)
            }
          >
            <EastIcon />
          </ButtonSide>
          Sub-total of Labor Cost 人工费合计 (K)
        </Td>
        <Td right>{amount(getWorkLabor(work))}</Td>
        <Td colSpan={3}>Sub-total of Material Cost 材料费合计 (K)</Td>
        <Td right>{amount(getWorkMaterial(work))}</Td>
      </tr>
    </DocTable>
  );
};

export default DocItemList;
