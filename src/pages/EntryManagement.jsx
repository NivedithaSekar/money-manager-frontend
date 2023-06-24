import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IconButton, Typography } from "@mui/material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import MoneyEntries from "./entries/MoneyEntries";
import backendInstance from "../instances/serverInstance";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import dayjs from "dayjs";

const EntryManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { backdropDetails: backdropActivity, path } = useSelector(
    (state) => state.backdropReducer
  );
  const createNewEntry = () => {
    dispatch({ type: "SET_BD_STATE_ACTIVE", data: "NEW_ENTRY" });
  };

  const setFilterResponse = (resposeEntries, reset = false) => {
    if (resposeEntries) {
      setEntries(resposeEntries);
    }
    if (reset) {
      getEntries();
    }
  };

  const [entries, setEntries] = useState([]);

  const getEntries = async () => {
    const response = await backendInstance.get(
      `/entry/get?userID=${user.userID}`
    );
    setEntries(response.data);
  };

  const checkSessionExpiry = async () => {
    const response = await backendInstance.get(`/`);
    if (response.data.msg === "Please Login!") {
      alert(response.data.msg);
      dispatch({ type: "SESSION_EXPIRED" });
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    getEntries();
    checkSessionExpiry();
    window.history.pushState(null, "", path);
  }, [backdropActivity]);

  return (
    <Box sx={{ flexGrow: 1, p: "10px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <IconButton
          color={colors.primary[400]}
          aria-label="Create New Entry"
          size="large"
          onClick={createNewEntry}
        >
          <AddCircleIcon sx={{ fontSize: "3.5rem" }} />
        </IconButton>
        <Typography variant="button">New Entry</Typography>
      </Grid>
      <FilterForm setFilterResponse={setFilterResponse} />
      <MoneyEntries entries={entries} />
    </Box>
  );
};

export default EntryManagement;

const FilterForm = ({ setFilterResponse }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const INITIAL_FILTER_STATE = {
    type: "-",
    division: "-",
    from_date: "01/01/1900",
    to_date: "01/01/1900",
  };
  const [filterForm, setfilterForm] = useState(INITIAL_FILTER_STATE);

  function handleFormSubmission(e) {
    e.preventDefault();
    //console.log(filterForm);
    filterEntry(filterForm);
  }
  const filterEntry = (filterObj) => {
    const prevFilter = {};
    Object.keys(INITIAL_FILTER_STATE).forEach((key) => {
      if (INITIAL_FILTER_STATE[key] === filterObj[key]) {
        prevFilter[key] = INITIAL_FILTER_STATE[key];
        delete filterObj[key];
      } else {
        prevFilter[key] = filterObj[key];
      }
    });
    setfilterForm(prevFilter);
    backendInstance
      .put(`/entry/get?userID=${user.userID}`, filterObj)
      .then((res) => {
        setFilterResponse(res.data);
      });
  };

  return (
    <form className="filter-form" onSubmit={handleFormSubmission}>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl sx={{ width: 100, mt: 1 }}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              required
              value={filterForm.type}
              label="type"
              onChange={(event) => {
                setfilterForm((form) => ({
                  ...form,
                  type: event.target.value,
                }));
              }}
            >
              <MenuItem value="-">None</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ width: 100, mt: 1 }}>
            <InputLabel id="division">Division</InputLabel>
            <Select
              labelId="division"
              id="division"
              required
              value={filterForm.division}
              label="division"
              onChange={(event) => {
                setfilterForm((form) => ({
                  ...form,
                  division: event.target.value,
                }));
              }}
            >
              <MenuItem value="-">None</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="input-field"
                label="From"
                value={dayjs(filterForm.from_date)}
                disableFuture={true}
                onChange={(newValue) => {
                  setfilterForm((form) => ({
                    ...form,
                    from_date: newValue.format("MM-DD-YYYY"),
                  }));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="input-field"
                label="To"
                value={dayjs(filterForm.to_date)}
                disableFuture={true}
                onChange={(newValue) => {
                  setfilterForm((form) => ({
                    ...form,
                    to_date: newValue.format("MM-DD-YYYY"),
                  }));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ minWidth: "5%", borderRadius: "50%", ml: 2 }}
        >
          <FilterAltIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
        <Button
          type="reset"
          variant="contained"
          sx={{ minWidth: "5%", borderRadius: "50%", ml: 2 }}
          onClick={() => {
            setfilterForm(INITIAL_FILTER_STATE);
            setFilterResponse(null, true);
          }}
        >
          <RestartAltIcon sx={{ fontSize: "3rem" }} />
        </Button>
      </Grid>
    </form>
  );
};
