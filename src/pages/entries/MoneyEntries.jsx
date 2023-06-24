import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import React from "react";
import backendInstance from "../../instances/serverInstance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { IconButton, Tooltip, Box } from "@mui/material";
import { useDispatch } from "react-redux";

const MoneyEntries = ({ entries }) => {
  const dispatch = useDispatch();

  const deleteEntry = async (id) => {
    dispatch({ type: "SET_BD_STATE_ACTIVE", data: "DELETE_ENTRY" });
    const response = await backendInstance.delete(`/entry/${id}`);
    alert(response.data.msg);
  };

  const editEntry = async (id) => {
    dispatch({ type: "SET_BD_STATE_ACTIVE", data: `EDIT_ENTRY_${id}` });
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Type</Th>
          <Th>Division</Th>
          <Th>Category</Th>
          <Th>Occured At</Th>
          <Th>Amount</Th>
          <Th>Description</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {entries.map((entry) => (
          <Tr>
            <Td>{entry.type}</Td>
            <Td>{entry.division}</Td>
            <Td>{entry.category}</Td>
            <Td>
              {dayjs(entry.occuredAt).subtract(1, "day").format("DD/MM/YYYY")}
            </Td>
            <Td>{entry.amount}</Td>
            <Td>{entry.description}</Td>
            <Td>
              {Math.floor(
                (new Date() - new Date(entry.registered_at)) / (1000 * 3600)
              ) < 12 ? (
                <IconButton
                  onClick={() => {
                    editEntry(entry.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <Tooltip
                  title="Edit Feature disabled after 12 hours of entry"
                  placement="left-start"
                >
                  <Box sx={{ display: "inline-block" }}>
                    <IconButton disabled>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Tooltip>
              )}
              <IconButton
                onClick={() => {
                  deleteEntry(entry.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default MoneyEntries;
