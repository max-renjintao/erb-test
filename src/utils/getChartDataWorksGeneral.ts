import { ChartData } from 'chart.js';
import { getMonth } from 'date-fns';
import { TEAM_COLORS, TEAMS } from 'constants/const-work';
import getWorksMonths from './getWorksMonths';

const getChartDataWorksGeneral = (
  works: Work[]
): ChartData<'bar', number[], string> => {
  const months = getWorksMonths(works).sort((p, c) => p - c);

  const data = [0, 1, 2, 3].map(() => Array(months.length).fill(0));

  works.forEach((w) => {
    const monthIndex = months.findIndex((m) => getMonth(w.date_s) + 1 === m);
    if (monthIndex > -1 && w.total) {
      data[w.team][monthIndex] += w.total;
    }
  });
  console.log('data:', data);

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
