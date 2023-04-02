import React from "react";

//styles
import { AdminLoginPage, AdminLoginContainer } from "./adminLogin.styles";
import { TextField, Typography } from "@mui/material";
import { CustomButton, CustomHeading1 } from "../../global/global.styles";

const AdminLogin = () => {
  return (
    <AdminLoginPage>
      <AdminLoginContainer>
        <CustomHeading1>ADMIN LOGIN</CustomHeading1>
        <form>
          <TextField label="Username" type="text" fullWidth variant="standard" />
          <TextField label="Password" type="password"  fullWidth variant="standard" />
          <CustomButton>LOGIN</CustomButton>
        </form>
      </AdminLoginContainer>
    </AdminLoginPage>
  );
};

export default AdminLogin;
