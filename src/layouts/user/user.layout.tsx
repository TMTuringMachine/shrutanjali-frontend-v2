import React, { FunctionComponent } from "react";
import { Link, Outlet } from "react-router-dom";

//components
import Header from "../../components/Header/header.component";

//styles
import { LayoutOuterContainer, LayoutOutletContainer } from "../layouts.styles";

interface Props {}

const UserLayout: FunctionComponent<Props> = () => {
  return (
    <LayoutOuterContainer>
      <Header />
      <LayoutOutletContainer>
        <Outlet />
      </LayoutOutletContainer>
    </LayoutOuterContainer>
  );
};

export default UserLayout;
