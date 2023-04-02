import { styled, Box } from "@mui/material";

export const AdminHeaderContainer = styled(Box)(() => ({
  width: "100%",
  height: "fit-content",
//   backgroundColor: "red",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  '& .header-name':{
    fontWeight:600
  }
}));
