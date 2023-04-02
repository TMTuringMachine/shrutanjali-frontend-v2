import React from "react";
import { AdminHeaderContainer } from "./adminHeader.styles";
import { CustomButton } from "../../../global/global.styles";

const AdminHeader = () => {
  return (
    <AdminHeaderContainer>
      <div className="header-name" >SHRUTANJALI ADMIN DASHBOARD</div>
      <CustomButton>LOGOUT</CustomButton>
    </AdminHeaderContainer>
  );
};

export default AdminHeader;
