import { Grid, Box, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

const LinearProgressWithLabel = (props: any) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant="determinate" value={props.value} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        props.value,
      )}%`}</Typography>
    </Box>
  </Box>
);

export const ProgressBar = ({ progress}) => (
  <Grid
    container
    spacing={10}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >
      <h1>Progress</h1>
      <LinearProgressWithLabel value={progress} />
  </Grid>
);