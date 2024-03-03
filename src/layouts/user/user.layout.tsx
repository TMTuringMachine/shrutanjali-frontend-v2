import React, { FunctionComponent, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

//components
import Header from "../../components/Header/header.component";
import useAuth from "../../hooks/useAuth";

//styles
import { LayoutOuterContainer, LayoutOutletContainer } from "../layouts.styles";

interface Props { }

const UserLayout: FunctionComponent<Props> = () => {
  // const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();


  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/admin/login")
  //   }
  // }, [isLoggedIn])

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
