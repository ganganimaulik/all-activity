import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import LogsTable from "src/LogsTable";
import { Button, Grid } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import AddLogDialog from "../src/AddLogDialog";
import RefreshDataContext from "src/refreshDataContext";

const Home: NextPage = () => {
  const [showAddLogDialog, setShowLogDialog] = React.useState(false);
  const { setRefresh } = React.useContext(RefreshDataContext);

  return (
    <Container maxWidth="lg">
      <AddLogDialog
        open={showAddLogDialog}
        handleClose={(refresh: boolean) => {
          setShowLogDialog(false);
          if (refresh) {
            console.log("refresh set to true");
            setRefresh(true);
          }
        }}
      />
      <Box
        sx={{
          my: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container width={"100%"}>
          <Grid item xs={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              AllActivity - Logs
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"}>
            <Button
              variant="contained"
              startIcon={<GridAddIcon />}
              onClick={() => setShowLogDialog(true)}
            >
              Add Log
            </Button>
          </Grid>
        </Grid>

        <LogsTable />

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
