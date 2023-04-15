import { styled, Box, TableContainer, TableCell } from "@mui/material";

export const SongsTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "100%",
  flex: 1,
  maxHeight: "45vh",
  backgroundColor: theme.palette.background.default,
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  borderRadius: "30px",
  padding: "10px 20px",
  overflowY: "auto",
  overflowX: "initial",
}));

export const TableSongImage = styled("img")(({ theme }) => ({
  width: "50px",
  height: "50px",
  objectFit: "cover",
  borderRadius: "5px",
}));

export const TableActions = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  marginBottom: "20px",
}));

export const StyledTableCell = styled(TableCell)(() => ({
  padding: "10px",
}));
