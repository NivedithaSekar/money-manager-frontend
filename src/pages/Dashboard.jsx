import React from "react";
import ChartWrapper from "../components/charts/ChartWrapper";

import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import backendInstance from "../instances/serverInstance";
import { useEffect } from "react";

const Dashboard = () => {
  //Get the user data from local storage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  //Dashboard filter handler (Month, Year)
  const [filter, setFilter] = useState("month");
  //chart data (result data of the filter) state handler
  const [chartData, setChartData] = useState([{}]);
  
  //Backend Communication Function to receive the required data
  const getChartdata = () => {
    backendInstance.post(`/entry/getChartData?userID=${user.userID}`, {filter} ).then((res) => {
        setChartData(res.data)
        //console.log('Dashboard data: '+res.data)
      }); 
  }

  //Executes based on the filter dependency change
  useEffect(()=>{
    getChartdata()
  },[filter])


  return (
    <Box className="main-content">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Dashboard</h1>
        <Box className="chart-filter-form">
          <FormControl>
            <InputLabel id="filter">Filter</InputLabel>
            <Select
              labelId="filter"
              id="filter"
              required
              value={filter}
              label="filter"
              onChange={(event) => {
                setFilter(event.target.value);
                //handleFilter(event);
              }}
            >
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Grid container sx={{ mt: 1 }} spacing={1}>
        <Grid item xs={12} md={6}>
          <ChartWrapper chartType="BarChart" data={chartData.filter((data)=> data.type === 'Income')} title="Income" filter={filter}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartWrapper chartType="BarChart" data={chartData.filter((data)=> data.type === 'Expense')} title="Expense" filter={filter}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
