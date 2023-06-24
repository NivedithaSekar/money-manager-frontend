import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BarChart from "./BarChart";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ChartWrapper = ({ chartType, data, title, filter }) => {
  const chartResult = [];
  for (let i = 0; i < data.length; i++) {
    let indexFound = chartResult.findIndex((item) => {
      if (item[filter] === data[i][filter]) {
        return true;
      }
      return false;
    });
    if (indexFound === -1) {
      chartResult.push({
        [filter]: data[i][filter],
        [data[i].division]: data[i].totalAmount,
      });
    } else {
      chartResult.some((item) => {
        if (item?.[data[i].division]) {
          chartResult[indexFound] = {
            ...chartResult[indexFound],
            [data[i].division]:
              chartResult[indexFound][data[i].division] + data[i].totalAmount,
          };
        } else {
          chartResult[indexFound] = {
            ...chartResult[indexFound],
            [data[i].division]: data[i].totalAmount,
          };
        }
      });
    }
  }
  const component =
    chartType === "BarChart" ? (
      <BarChart data={chartResult} filterOption={filter} />
    ) : (
      ""
    );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ backgroundColor: colors.primary[400] }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h4">{title}</Typography>}
      />
      <CardContent sx={{ height: "22rem", p: 0 }}>{component}</CardContent>
    </Card>
  );
};

export default ChartWrapper;
