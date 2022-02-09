import { Grid } from "@mui/material";
import { EmailsInput } from "../components/EmailsInput";

const App = () => (
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
);

export default App;