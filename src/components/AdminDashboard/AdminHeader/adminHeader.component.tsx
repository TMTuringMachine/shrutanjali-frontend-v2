import React from "react";
import { AdminHeaderContainer } from "./adminHeader.styles";
import { CustomButton } from "../../../global/global.styles";

import useAuth from "../../../hooks/useAuth";

const AdminHeader = () => {
  const { logout } = useAuth();
  return (
    <AdminHeaderContainer>
      <div className="header-name">SHRUTANJALI ADMIN DASHBOARD</div>
      <CustomButton onClick={() => logout()}>LOGOUT</CustomButton>
    </AdminHeaderContainer>
  );
};

export default AdminHeader;
