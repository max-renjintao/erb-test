/* eslint-disable react/no-array-index-key */
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import { deduplicateVar } from 'utils/deduplicate';
import { amount } from 'utils/disp';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonSide } from '../Buttons';
import InvoiceInput from '../InvoiceInput';

const InvoiceItemList = () => {
  const {
    work,
    setWorkImmer,
    insertJob,
    jobs,
    mats,
    deleteJob,
    insertMat,
    deleteMat,
    sumJobs,
    sumMats,
  } = useWork();
  return (
    <InvoiceTable heading="Maintenance Items and Expense List 维修项目及费用清单">
      <tr>
        <Th w="4%" en="Sn" zh="编号" />
        <Th w="12%" en="Item Code" zh="项目编号" />
        <Th w="36%" en="Maintenance Item" zh="维修项目" />
        <Th w="9%" en="Labor Cost" zh="人工费(K)" />
        <Th w="20%" en="Used Parts/Materials" zh="所用配件/材料" />
        <Th w="4%" en="Qty" zh="数量" />
        <Th w="6%" en="Unit Price" zh="单价(K)" />
        <Th w="9%" en="Materials Cost" zh="材料费(K)" />
      </tr>
      {work.jobs.map((job, jobId) => {
        const rowSpan = job.mats.length || undefined;
        const tdsLabor = (
          <>
            <Td rowSpan={rowSpan}>
              <ButtonSide // job / insert button
                left={18}
                mt={(rowSpan || 1) * -40}
                onClick={() => insertJob(jobId)}
              >
                <EastIcon />
              </ButtonSide>
              {jobId + 1}
            </Td>
            <InvoiceInput // job / code
              rowSpan={rowSpan}
              options={jobs.map((j) => j.code)}
              value={job.code}
              onEdit={(v) =>
                setWorkImmer((d) => {
                  d.jobs[jobId].code = v;
                  const sameJob = jobs.find((j) => j.code === v);
                  if (sameJob) {
                    d.jobs[jobId].item = sameJob.item;
                    d.jobs[jobId].cost = sameJob.cost || 0;
                  }
                })
              }
            />
            <InvoiceInput // job / item
              rowSpan={rowSpan}
              options={deduplicateVar(jobs.map((j) => j.item))}
              value={job.item}
              onEdit={(v) =>
                setWorkImmer((d) => {
                  d.jobs[jobId].item = v;
                  const sameJob = jobs.find((j) => j.item === v);
                  if (sameJob) {
                    d.jobs[jobId].code = sameJob.code;
                    d.jobs[jobId].cost = sameJob.cost || 0;
                  }
                })
              }
            />
            <InvoiceInput // job / labor
              rowSpan={rowSpan}
              textAlign="right"
              options={[]}
              value={job.cost.toLocaleString()}
              onEdit={(v) =>
                setWorkImmer((d) => {
                  d.jobs[jobId].cost = +v.replace(',', '');
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
                onClick={() => insertMat(jobId, 999)}
              >
                <EastIcon />
              </ButtonSide>
            </td>
            <td />
            <td />
            <Td justifyContent="end">
              <ButtonSide // job / delete button
                right={1}
                onClick={() => deleteJob(jobId)}
              >
                <CloseIcon />
              </ButtonSide>
              -
            </Td>
          </tr>
        ) : (
          job.mats.map((mat, matId) => (
            <tr key={matId}>
              {matId === 0 && tdsLabor}
              <InvoiceInput // mat / name
                options={mats.map((m) => m.name)}
                value={mat.name}
                onEdit={(v) =>
                  setWorkImmer((d) => {
                    d.jobs[jobId].mats[matId].name = v;
                    const sameMat = mats.find((m) => m.name === v);
                    if (sameMat) {
                      d.jobs[jobId].mats[matId].rate = sameMat.rate || 0;
                    }
                  })
                }
              >
                <ButtonSide // mat /insert
                  right={18}
                  mt={-10}
                  onClick={() => insertMat(jobId, matId)}
                >
                  <WestIcon />
                </ButtonSide>
              </InvoiceInput>
              <InvoiceInput // mat / qty
                options={[]}
                value={`${mat.qty}`}
                onEdit={(v) =>
                  setWorkImmer((d) => {
                    d.jobs[jobId].mats[matId].qty = +v;
                  })
                }
              />
              <InvoiceInput // mat / rate
                options={[]}
                value={`${mat.rate}`}
                onEdit={(v) =>
                  setWorkImmer((d) => {
                    d.jobs[jobId].mats[matId].rate = +v;
                  })
                }
              />
              <Td justifyContent="end">
                <ButtonSide // mat / delete button
                  right={1}
                  onClick={() => deleteMat(jobId, matId)}
                >
                  <CloseIcon />
                </ButtonSide>
                {(mat.qty * mat.rate).toLocaleString()}
              </Td>
            </tr>
          ))
        );
      })}
      <tr style={{ backgroundColor: '#ddd', height: 40 }}>
        <Td colSpan={3}>
          <ButtonSide // job / append button
            left={18}
            mt={-40}
            onClick={() => insertJob(9999)}
          >
            <EastIcon />
          </ButtonSide>
          Sub-total of Labor Cost 人工费合计 (K)
        </Td>
        <Td justifyContent="end">{amount(sumJobs)}</Td>
        <Td colSpan={3}>Sub-total of Material Cost 材料费合计 (K)</Td>
        <Td justifyContent="end">{amount(sumMats)}</Td>
      </tr>
    </InvoiceTable>
  );
};

export default InvoiceItemList;
