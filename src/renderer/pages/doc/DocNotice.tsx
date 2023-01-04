/* eslint-disable react/jsx-props-no-spreading */
import { Stack } from '@mui/material';
import InText from 'renderer/components/inputs/InText';
import DocTable from 'renderer/components/doc/DocTable';
import useWork from 'renderer/store/useWork';
import { ComponentProps } from 'react';
// import InvoiceTable, { TxtIn } from '../InvoiceTable';
type P = { imm: ImmWork } & ComponentProps<'div'>;
const DocNotice = ({ imm: [work, imWork], ...props }: P) => {
  // const { work, imWork } = useWork();
  return (
    <DocTable heading="Thanks for your supporting/谢谢您的惠顾" {...props}>
      <tr>
        <td>
          <Stack justifyContent="center">
            <ol
              style={{
                fontSize: 10,
                fontWeight: 600,
                WebkitTextFillColor: '#0070c0',
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
              <li>电子元件建议更换新件，若客户选择维修，无法提供质保；</li>
              <li>
                二手拆车件，除车身外观件（如保险杆、叶子板、车门等）外，不提供质保；
              </li>
              <li>
                疫情防控期间，所有进店车辆均免费赠送价值300K的纳米雾化消毒，疫情过后恢复原价。
              </li>
            </ol>
            <ul
              style={{
                fontSize: 10,
                paddingInlineStart: 0,
                margin: 0,
                listStyle: 'none',
              }}
            >
              <li>
                <InText
                  variant="outlined"
                  multiline
                  value={work.notice || ''}
                  inputProps={{
                    style: {
                      textAlign: 'left',
                      WebkitTextFillColor: '#bb0000',
                      padding: '0 8px',
                    },
                  }}
                  onChange={(e) =>
                    imWork((w) => {
                      w.notice = e.target.value;
                    })
                  }
                />
              </li>
            </ul>
          </Stack>
        </td>
      </tr>
    </DocTable>
  );
};

export default DocNotice;
