import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";

//styles
import { AdminLoginPage, AdminLoginContainer } from "./adminLogin.styles";
import { TextField, Typography } from "@mui/material";
import { CustomButton, CustomHeading1 } from "../../global/global.styles";
import { AdminLoginForm } from "../../interfaces/admin.interface";

//libs
import { useNavigate } from "react-router-dom";

//hooks
import useAuth from "../../hooks/useAuth";

const AdminLogin = () => {
  const [data, setData] = useState<AdminLoginForm>({
    username: "",
    password: "",
  });

  const { login,
    isLoggedIn } = useAuth();
  const navigate = useNavigate()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    console.log(data, "this is the data");
    // if (data.username == "" || data.password == "") return;
    login(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dashboard')
    }
  }, [isLoggedIn])

  return (
    <AdminLoginPage>
      <AdminLoginContainer>
        <CustomHeading1>ADMIN LOGIN</CustomHeading1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            name="username"
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            name="password"
            onChange={handleChange}
            required
          />
          <CustomButton type="submit">LOGIN</CustomButton>
        </form>
      </AdminLoginContainer>
    </AdminLoginPage>
  );
};

export default AdminLogin;
