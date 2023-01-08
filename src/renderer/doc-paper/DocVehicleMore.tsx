import DocTable from '../components/doc/DocTable';
import Td from '../components/doc/DocTableTd';

const DocVehicle = ({ work }: { work: Work }) => {
  return (
    <>
      <DocTable heading="Vehicle Information 车辆信息">
        <tr>
          <Td width="14%">
            Number Plate <br /> 车牌号码
          </Td>
          <Td width="22%">{work.plate}</Td>
          <Td width="14%">
            Engine Type <br /> 引擎类型
          </Td>
          <Td width="14%">Petrol汽油</Td>
          <Td width="14%">
            Chassis Number <br /> 车架号
          </Td>
          <Td width="22%">AHTYZ59G608031019-608031019</Td>
        </tr>
        <tr>
          <Td>
            Vehicle Model <br /> 车牌型号
          </Td>
          <Td>{work.model}</Td>
          <Td>
            Year of Make <br /> 出产年份
          </Td>
          <Td>2022</Td>
          <Td>
            Engine Number <br /> 引擎号
          </Td>
          <Td>1KD-A822722</Td>
        </tr>
        <tr>
          <Td>
            行驶里程 <br /> Mileage
          </Td>
          <Td>{work.mileage}</Td>
          <Td>
            Engin Capacity <br /> 引擎排量
          </Td>
          <Td>3.5</Td>
          <Td>
            Tire Mode <br /> 轮胎型号
          </Td>
          <Td>275/65R18</Td>
        </tr>
      </DocTable>
      <DocTable heading="Owner's Information 车辆信息">
        <tr>
          <Td width="14%">
            {`Owner's Name`} <br /> 车主姓名
          </Td>
          <Td width="20%">{work.owner}</Td>
          <Td width="14%">
            Telephone No. <br /> 联系电话
          </Td>
          <Td width="20%">{work.tel}</Td>
          <Td width="14%">
            VIP No. <br /> 会员卡号
          </Td>
          <Td width="18%">{work.vip}</Td>
        </tr>
      </DocTable>
    </>
  );
};

export default DocVehicle;
