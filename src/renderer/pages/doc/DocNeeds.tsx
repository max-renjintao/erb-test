/* eslint-disable react/no-array-index-key */
import DocTable from 'renderer/components/doc/DocTable';
import Td from '../../components/doc/DocTableTd';

const DocNeeds = ({ work }: { work: Work }) => {
  return (
    <DocTable heading="Malfunctions description/Requirements 故障现象/送修要求">
      {work.needs.length ? (
        work.needs.map((need, index) => (
          <tr key={index}>
            <Td width="7%">{index + 1}</Td>
            <Td left>{need}</Td>
          </tr>
        ))
      ) : (
        <tr>
          <Td width="7%">1</Td>
        </tr>
      )}
    </DocTable>
  );
};

export default DocNeeds;
