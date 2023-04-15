import React from "react";

//styles
import { SongsTableContainer, TableActions } from "./songsTable.styles";
import { StyledTextField } from "../../../global/global.styles";

//libs
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SongsTable = () => {
  return (
    <>
      <TableActions>
        <StyledTextField label="Search songs" variant="standard" />
      </TableActions>
      <SongsTableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10)].map((row, item) => (
              <TableRow
                key={item}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item}
                </TableCell>
                <TableCell align="right">{item}</TableCell>
                <TableCell align="right">{item}</TableCell>
                <TableCell align="right">{item}</TableCell>
                <TableCell align="right">{item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SongsTableContainer>
    </>
  );
};

export default SongsTable;
