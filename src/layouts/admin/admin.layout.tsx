import React, { FunctionComponent } from "react";
import { Link, Outlet } from "react-router-dom";

//styles
import { LayoutOuterContainer, LayoutOutletContainer } from "../layouts.styles";

interface Props {}

const AdminLayout: FunctionComponent<Props> = () => {
  return (
    <LayoutOuterContainer>
      <LayoutOutletContainer>
        <Outlet />
      </LayoutOutletContainer>
    </LayoutOuterContainer>
  );
};

export default AdminLayout;
