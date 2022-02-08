import { Grid } from "@mui/material";
import { EmailsInput } from "../components/EmailsInput";

export default function Index() {
  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <EmailsInput/>
      </Grid>   
    </Grid> 
  )
}
