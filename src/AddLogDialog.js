import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextareaAutosize } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useSnackbar } from "notistack";

const AddLogDialog = ({ open, handleClose }) => {
  const [description, setDescription] = React.useState("");
  const [startDateTime, setStartDateTime] = React.useState(new Date());
  const [endDateTime, setEndDateTime] = React.useState(new Date());
  const { enqueueSnackbar } = useSnackbar();

  async function createNewLog() {
    return fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, startDateTime, endDateTime }),
    });
  }

  let saveLog = async (e) => {
    e.preventDefault();

    if (startDateTime > endDateTime) {
      enqueueSnackbar("EndDateTime must be greater than StartDateTime", {
        variant: "error",
      });
      return;
    }
    if (!startDateTime || !endDateTime) {
      enqueueSnackbar("StartDateTime and EndDateTime are required", {
        variant: "error",
      });
      return;
    }

    createNewLog().then(() => {
      enqueueSnackbar("LogEntry successfully created", { variant: "success" });
      handleClose(true);
      setDescription("");
      setStartDateTime(new Date());
    });
  };

  React.useEffect(() => {
    if (startDateTime && startDateTime <= endDateTime) {
      // add 1 hour to endDateTime when startDateTime is set & endDateTime is less than startDateTime
      setEndDateTime(
        new Date(startDateTime.getTime()).setHours(startDateTime.getHours() + 1)
      );
    }
  }, [startDateTime]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={saveLog}>
        <DialogTitle>Add Log</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            autoFocus
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={4}
            required
            placeholder="Description"
            style={{ width: 500 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid mt={1} container width={"100%"}>
              <Grid item xs={6}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start DateTime"
                  value={startDateTime}
                  onChange={(newValue) => {
                    setStartDateTime(newValue);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End DateTime"
                  minDateTime={startDateTime}
                  value={endDateTime}
                  onChange={(newValue) => {
                    setEndDateTime(newValue);
                  }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLogDialog;
