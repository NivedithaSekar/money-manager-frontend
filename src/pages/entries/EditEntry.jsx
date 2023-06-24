import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import backendInstance from "../../instances/serverInstance";
import { useDispatch, useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EditEntry = () => {
  const { backdropDetails: backdropActivity, path } = useSelector(
    (state) => state.backdropReducer
  );
  const entryId = path.slice(11);
  const [entry, setEntry] = useState(null);

  async function getEntryData() {
    const response = await backendInstance.get(`/entry/${entryId}`);
    setEntry(response.data);
    //console.log(response)
  }
  useEffect(() => {
    getEntryData();
  }, []);

  return entry ? <EditEntryForm entry={entry} /> : "Loading...";
};

export default EditEntry;

const EditEntryForm = ({ entry }) => {
  const [entryForm, setEntryForm] = useState({ ...entry });
  const dispatch = useDispatch();
  function handleFormSubmission(e) {
    e.preventDefault();
    if (entryForm.amount > 0) {
      editEntry(entryForm);
    }
  }
  const editEntry = (entryObj) => {
    backendInstance.put(`/entry/edit/${entryObj.id}`, entryObj).then((res) => {
      //setEntryForm(ENTRY_FORM_INITIAL_VALUE);
      alert(res.data.msg);
      dispatch({ type: "SET_BD_STATE_INACTIVE" });
    });
  };
  return (
    <form className="entry-form" onSubmit={handleFormSubmission}>
      <FormControl fullWidth>
        <InputLabel id="type">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          required
          value={entryForm.type}
          label="type"
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              type: event.target.value,
            }));
          }}
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel id="division">Division</InputLabel>
        <Select
          labelId="division"
          id="division"
          required
          value={entryForm.division}
          label="division"
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              division: event.target.value,
            }));
          }}
        >
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Office">Office</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          required
          value={entryForm.category}
          label="category"
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              category: event.target.value,
            }));
          }}
        >
          <MenuItem value="Fuel">Fuel</MenuItem>
          <MenuItem value="Medical">Medical</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Borrowed">Borrowed</MenuItem>
          <MenuItem value="Lended">Lended</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              className="input-field"
              label="Occured at"
              value={dayjs(entryForm.occuredAt)}
              disableFuture={true}
              onChange={(newValue) => {
                setEntryForm((form) => ({
                  ...form,
                  occuredAt: newValue.format("MM-DD-YYYY"),
                }));
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <br />
        <TextField
          id="amount"
          type="number"
          label="amount"
          variant="standard"
          required
          aria-describedby="amount"
          className="input-field"
          value={entryForm.amount}
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              amount: event.target.value,
            }));
          }}
          helperText="Amount should be > 0"
        />
        <br />
        <TextField
          id="description"
          label="description"
          variant="standard"
          aria-describedby="description"
          multiline={true}
          rows={2}
          className="input-field"
          required={true}
          value={entryForm.description}
          onChange={(event) => {
            setEntryForm((form) => ({
              ...form,
              description: event.target.value,
            }));
          }}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: "40%", m: "auto" }}
        >
          Update
        </Button>
      </FormControl>
    </form>
  );
};
