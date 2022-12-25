import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import ChartBar from 'renderer/components/ChartBar';

const PageHome = () => {
  return (
    <Box p={1}>
      <Grid container spacing={1}>
        <Grid xs={8}>
          <ChartBar />
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
