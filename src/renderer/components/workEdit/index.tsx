/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Radio, Stack, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
  TxtIn,
} from 'renderer/components/InvoiceTable';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
// import { webContents } from 'electron';
import useWork from 'renderer/store/useWork';
import numeral from 'numeral';
import { amount, percent } from 'renderer/utils/disp';
import WestIcon from '@mui/icons-material/West';
import { ButtonSide } from 'renderer/components/Buttons';
import { deduplicateVar } from 'renderer/utils/deduplicate';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import EastIcon from '@mui/icons-material/East';
import produce from 'immer';
import InvoiceInput from '../InvoiceInput';
// import EastIcon from '@mui/icons-material/East'

const WorkEdit = ({
  id,
  onClose,
  onSave,
  onDelete,
}: {
  id: number;
  onClose: () => void;
  onSave: (w: Work) => void;
  onDelete: () => void;
}) => {
  const {
    works,
    work,
    setWork,
    setWorkImmer,
    options,
    orders,
    sumJobs,
    sumMats,
    subTotal,
    totalAmount,
    jobs,
    mats,
    insertOrder,
    deleteOrder,
    insertJob,
    deleteJob,
    insertMat,
    deleteMat,
  } = useWork(id);

  const [ui, setUi] = useState({
    en: true,
    zh: true,
    tax: true,
    discount: true,
    delete: '',
  });
  if (!work) return <>!!! no work</>;

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

  // console.log('work.maintenances', work.maintenances);
  return (
    <>
      <Stack direction="row" spacing={1} className="no-print" px={2} pt={2}>
        <TxtIn
          label="sn"
          type="number"
          sx={{ width: 90 }}
          value={work.sn}
          onChange={(e) =>
            setWorkImmer((dw) => {
              dw.sn = +e.target.value;
            })
          }
        />
        <TxtIn
          label="Start"
          type="date"
          value={work.date_s}
          onChange={(e) =>
            setWorkImmer((dw) => {
              dw.date_s = e.target.value;
            })
          }
        />
        <TxtIn
          label="End"
          type="date"
          value={work.date_e}
          onChange={(e) =>
            setWorkImmer((dw) => {
              dw.date_e = e.target.value;
            })
          }
        />
        <span style={{ width: 100 }} />
        <Autocomplete
          freeSolo
          options={['汪攀', '王毅', '杨波']}
          sx={{ width: 100 }}
          renderInput={(params) => <TxtIn {...params} />}
          value={work.team}
          onChange={(e, v) =>
            v &&
            setWorkImmer((dw) => {
              dw.team = v;
            })
          }
        />
        <Autocomplete
          freeSolo
          options={['PAID', 'DONE', 'Doing', 'Quotation', 'Await']}
          disableClearable
          disablePortal
          sx={{ width: 100 }}
          renderInput={(params) => <TxtIn {...params} />}
          value={work.status}
          onChange={(e, v) =>
            v &&
            setWorkImmer((dw) => {
              dw.status = v;
            })
          }
        />

        <Box ml="auto" mr="0">
          <TextField
            size="small"
            sx={{ width: 90 }}
            value={ui.delete}
            onChange={(e) => setUi((u) => ({ ...u, delete: e.target.value }))}
          />
          <Button
            onClick={() => {
              if (ui.delete.toLowerCase() === 'delete') {
                onDelete();
                onClose();
              }
            }}
          >
            Delete
          </Button>
        </Box>
      </Stack>
      <Stack px={2} className="no-print">
        <TxtIn
          multiline
          label="note"
          maxRows={5}
          value={work.note}
          onChange={(e) =>
            setWorkImmer((d) => {
              d.note = e.target.value;
            })
          }
        />
      </Stack>
      <Stack
        className="no-print"
        direction="row"
        spacing={1}
        justifyContent="end"
        alignItems="center"
        px={4}
      >
        <Box mr="auto">
          <span>
            En
            <Radio
              checked={ui.en && !ui.zh}
              onChange={() => setUi((s) => ({ ...s, en: true, zh: false }))}
              inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
              checked={ui.en && ui.zh}
              onChange={() => setUi((s) => ({ ...s, en: true, zh: true }))}
              inputProps={{ 'aria-label': 'B' }}
            />
            <Radio
              checked={!ui.en && ui.zh}
              onChange={() => setUi((s) => ({ ...s, en: false, zh: true }))}
              inputProps={{ 'aria-label': 'B' }}
            />
            中
          </span>
          Show Tax
          <Switch
            defaultChecked={ui.discount}
            onChange={(e, v) => setUi((s) => ({ ...s, discount: v }))}
            size="small"
          />
          Show Discount
        </Box>
        <Button
          startIcon={<PrintIcon />}
          onClick={() => window.electron.ipcRenderer.sendMessage('print', [])}
          children="print"
        />
        <Button
          startIcon={<SaveIcon />}
          onClick={() => onSave(work)}
          children="save"
        />
        <Button startIcon={<CloseIcon />} onClick={onClose} children="quit" />
      </Stack>
      <div className="invoice-paper">
        <h1 style={{ marginTop: 0, marginBottom: 5 }}>Proforma Invoice</h1>
        <h6 style={{ textAlign: 'right', margin: 2, color: 'blue' }}>
          No. 编号：{work.sn}
        </h6>
        <h6 style={{ textAlign: 'right', margin: 2 }}>
          Date. 日期 {work.date_e.split('-')[2]} D日/{' '}
          {work.date_e.split('-')[1]} M月/ {work.date_e.split('-')[0]} Y年
        </h6>

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

                  d.mileage = +v
                    .slice(0, -3)
                    .replaceAll(',', '')
                    .replace('，', '');
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
        <InvoiceTable heading="Fault Phenomenon/Repair Requirements 故障现象/送修要求">
          {work.orders.map((item, i) => (
            <tr key={i}>
              <Td width="4%">
                <ButtonSide // order / insert button
                  left={18}
                  mt={-40}
                  onClick={() => {
                    insertOrder(i);
                  }}
                >
                  <EastIcon />
                </ButtonSide>
                {i + 1}
              </Td>
              <InvoiceInput // order
                textAlign="left"
                options={orders}
                value={`${work.orders[i]}`}
                onEdit={(v) => {
                  setWorkImmer((draft) => {
                    draft.orders[i] = v;
                  });
                }}
              >
                <ButtonSide // order delete button
                  right={1}
                  mt={10}
                  onClick={() => deleteOrder(i)}
                >
                  <CloseIcon />
                </ButtonSide>
              </InvoiceInput>
            </tr>
          ))}
        </InvoiceTable>

        <ButtonSide // order / append button
          left={18}
          mt={-15}
          onClick={() => {
            insertOrder(999);
          }}
        >
          <EastIcon />
        </ButtonSide>

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
              <tr>
                {tdsLabor}
                <td>
                  <ButtonSide // mat / first mat button
                    mt={-10}
                    onClick={() => insertMat(jobId, 999)}
                  >
                    <EastIcon />
                  </ButtonSide>
                </td>
                <td /> <td />
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <div style={{ width: 520, paddingRight: 30 }}>
            <InvoiceTable
              heading="Thanks for your supporting/谢谢您的惠顾"
              style={{ height: 230 }}
            >
              <tr>
                <td>
                  <ol
                    style={{
                      fontSize: 10,
                      paddingInlineStart: 20,
                      marginTop: 5,
                    }}
                  >
                    <li>本店永久免费赠送雨刮水，用完可随时返回添加；</li>
                    <li>
                      本店给予至尊卡客户3个月或3000km的质保，钻石卡客户1个月或1000km的质保，时间或里程，以先到者为准。以上所有维修项目若在保修期内出现任何问题，均可返店免费检查，若因本店维修失误或配件质量问题导致，经查证属实，本店将负责免费维修；
                    </li>
                    <li>
                      本店允许客户自带配件，不加收工时费，但不提供质保；因配件质量、型号、尺寸问题导致的多次拆装、返工及其他问题，需以实际工作时间或工作量收取工费；
                    </li>
                    <li>
                      TASC005的168项健康检查为附加赠送项目，客户可根据需要选择其中几项或全部放弃，但是总费用不因客户放弃赠送项目而削减；
                    </li>
                    <li>
                      电子元件建议更换新件，若客户选择维修，无法提供质保；
                    </li>
                    <li>
                      二手拆车件，除车身外观件（如保险杆、叶子板、车门等）外，不提供质保；
                    </li>
                    <li>
                      疫情防控期间，所有进店车辆均免费赠送价值300K的纳米雾化消毒，疫情过后恢复原价。
                    </li>
                  </ol>
                </td>
              </tr>
            </InvoiceTable>
          </div>
          <div style={{ width: 260 }}>
            <InvoiceTable
              heading="Total Amount and Details 费用统计"
              style={{ height: 230, textAlign: 'right' }}
            >
              <tr>
                <Td justifyContent="end">Labor Cost 人工费</Td>
                <Td justifyContent="end">{sumJobs}</Td>
              </tr>
              <tr>
                <Td justifyContent="end">Parts and Materials 材料费</Td>
                <Td justifyContent="end">{sumMats}</Td>
              </tr>
              <tr>
                <Td justifyContent="end">Sub-Total 小计</Td>
                <Td justifyContent="end">{amount(subTotal)}</Td>
              </tr>
              <tr>
                <Td justifyContent="end">Tax</Td>

                <InvoiceInput // tax
                  options={[]}
                  textAlign="right"
                  value={percent(work.tax)}
                  onEdit={(v) =>
                    setWorkImmer((d) => {
                      d.tax = numeral(v).value() || 0;
                    })
                  }
                />
              </tr>
              {ui.discount && (
                <tr>
                  <Td justifyContent="end">Discount</Td>
                  <InvoiceInput // discount
                    options={[]}
                    textAlign="right"
                    value={amount(work.discount)}
                    onEdit={(v) =>
                      setWorkImmer((d) => {
                        d.discount = numeral(v).value() || 0;
                      })
                    }
                    // style={{ color: 'red' }}
                  />
                  {/* <Td justifyContent="end">
                  <span >{amount(work.discount)}</span>
                </Td> */}
                </tr>
              )}
              <tr>
                <Td justifyContent="end">Total Amount</Td>
                <Td justifyContent="end">
                  <strong>{amount(totalAmount)}</strong>
                </Td>
              </tr>
            </InvoiceTable>
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 30,
            width: 600,
          }}
        >
          <div>Customer 客户:</div>
          <div>Receptionist 接待员:</div>
        </div>
      </div>
    </>
  );
};
export default WorkEdit;
