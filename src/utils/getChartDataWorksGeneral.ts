// {
//   labels: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//   ],
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

import { ChartData } from 'chart.js';
import { getMonth } from 'date-fns';
import { TEAM_COLORS, TEAMS } from 'constants/const-work';
import getWorksMonths from './getWorksMonths';

// }
const getChartDataWorksGeneral = (
  works: Work[]
): ChartData<'bar', number[], string> => {
  const months = getWorksMonths(works).sort((p, c) => p - c);

  const data = [...Array(TEAMS.length)].map(() => Array(months.length).fill(0));

  works.forEach((w) => {
    const teamIndex = TEAMS.findIndex((t) => w.team === t);
    const monthIndex = months.findIndex((m) => getMonth(w.date_s) + 1 === m);
    if (teamIndex > -1 && monthIndex > -1 && w.total) {
      data[teamIndex][monthIndex] += w.total;
    }
  });

  return {
    labels: months.map((m) => `M ${m}`),
    datasets: data.map((arr, i) => ({
      label: TEAMS[i],
      data: arr,
      backgroundColor: TEAM_COLORS[i],
    })),
  };
};

export default getChartDataWorksGeneral;
