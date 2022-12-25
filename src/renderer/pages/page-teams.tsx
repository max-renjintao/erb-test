import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

const PageTeams = () => {
  return (
    <Box p={1}>
      <Grid container spacing={1}>
        <Grid xs={8}>PageEmployee</Grid>
        <Grid xs={4}>
          <Paper>PageEmployee</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageTeams;
