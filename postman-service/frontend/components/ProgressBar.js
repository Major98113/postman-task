import Grid from "@mui/material/Grid";

export const ProgressBar = ( progress = 0 ) => (
    <Grid>
        <LinearProgress variant="determinate" value={progress} />
    </Grid>
);