import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// export type MatrixNx3 = [string[], number[], number[], number[]];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    // title: {
    //   display: true,
    //   text: 'Sell Amount',
    // },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'labor final',
//       data: [45, 74, 8, 76, 89, 77, 55],
//       backgroundColor: '#aaaa0080',
//     },
//     {
//       label: 'mater profit',
//       data: [34, 63, 44, 55, 34, 33, 22],
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

const ChartBar = ({ data }: { data: ChartData<'bar', number[], string> }) => {
  return <Bar options={options} data={data} />;
};
export default ChartBar;
