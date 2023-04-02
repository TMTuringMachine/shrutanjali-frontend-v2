import React from "react";

//styles
import { AdminLoginPage, AdminLoginContainer } from "./adminLogin.styles";
import { TextField, Typography } from "@mui/material";

const AdminLogin = () => {
  return (
    <AdminLoginPage>
      <AdminLoginContainer>
        <Typography>ADMIN LOGIN</Typography>
        <form>
          <TextField label="username" />
          <TextField label="password" />
        </form>
      </AdminLoginContainer>
    </AdminLoginPage>
  );
};

export default AdminLogin;
