import { Grid, Box, Typography } from "@mui/material";

const LinearProgressWithLabel = ({emailsCount, sentCount}) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{sentCount}/{emailsCount}</Typography>
    </Box>
  </Box>
);

export const ProgressBar = ({emailsCount, sentCount, status}) => (
  <Grid
    container
    spacing={10}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >
      <h1>Progress ({status})</h1>
      <LinearProgressWithLabel
        emailsCount={emailsCount}
        sentCount={sentCount}
      />
  </Grid>
);