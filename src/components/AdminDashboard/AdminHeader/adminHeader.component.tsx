import React from "react";
import { AdminHeaderContainer } from "./adminHeader.styles";
import { CustomButton } from "../../../global/global.styles";

import useAuth from "../../../hooks/useAuth";

const AdminHeader = () => {
  const { logout,home } = useAuth();
  return (
    <AdminHeaderContainer>
      <div className="header-name">SHRUTANJALI ADMIN DASHBOARD</div>
      <div>
      <CustomButton onClick={() => home()}>HOME</CustomButton>
      <CustomButton onClick={() => logout()}>LOGOUT</CustomButton>
      </div>
    </AdminHeaderContainer>
  );
};

export default AdminHeader;
