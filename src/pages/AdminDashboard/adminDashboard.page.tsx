import React from "react";
import {
  ActionButton,
  ActionPanelContainer,
  AdminDahboardLeft,
  AdminDahboardRight,
  AdminDashboardContainer,
  AdminDashboardPage,
  Stat,
  StatsContainer,
} from "./adminDashboard.styles";
import AdminHeader from "../../components/AdminDashboard/AdminHeader/adminHeader.component";
import { CustomHeading1 } from "../../global/global.styles";
import SongsTable from "../../components/AdminDashboard/SongsTable/songsTable.component";

const AdminDashboard = () => {
  return (
    <AdminDashboardPage>
      <AdminHeader />
      <AdminDashboardContainer>
        <AdminDahboardLeft>
          <StatsContainer>
            <Stat>
              <div className="stat-header">120</div>
              <div className="stat-sub">SONGS</div>
            </Stat>
            <Stat>
              <div className="stat-header">30</div>
              <div className="stat-sub">BOOKS</div>
            </Stat>
          </StatsContainer>
          <CustomHeading1>MANAGE SONGS</CustomHeading1>
          <SongsTable />
        </AdminDahboardLeft>
        <AdminDahboardRight>
          <ActionPanelContainer>
            <p className="panel-header">ACTION PANEL</p>
            <ActionButton>ADD SONG</ActionButton>
            <ActionButton>ADD BOOK</ActionButton>
          </ActionPanelContainer>
        </AdminDahboardRight>
      </AdminDashboardContainer>
    </AdminDashboardPage>
  );
};

export default AdminDashboard;
