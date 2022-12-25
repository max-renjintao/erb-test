import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ChartBar from 'renderer/components/ChartBar';
import useWorks from 'renderer/store/useWorks';
import getChartDataWorksGeneral from 'utils/getChartDataWorksGeneral';

const PageHome = () => {
  const { works } = useWorks();
  const chartData = useMemo(() => getChartDataWorksGeneral(works), [works]);
  return (
    <Box p={1}>
      <Grid container spacing={1}>
        <Grid xs={8}>
          <ChartBar data={chartData} />
        </Grid>
        <Grid xs={4}>
          <Paper>PageEmployee</Paper>
        </Grid>
        <Grid>
          PageHome / <Link to="/works">works</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageHome;
