import React, { useState } from "react";
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
import AddSongModal from "../../components/AdminDashboard/AddSongModal/addSongModal.component";

const AdminDashboard = () => {
  const [showAddSongModal, setShowAddSongModal] = useState(true);
  const toggleAddSongModal = () => {
    setShowAddSongModal(!showAddSongModal);
  };

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
            <ActionButton onClick={toggleAddSongModal}>ADD SONG</ActionButton>
            <ActionButton>ADD BOOK</ActionButton>
          </ActionPanelContainer>
          <AddSongModal
            state={showAddSongModal}
            toggleModal={toggleAddSongModal}
          />
        </AdminDahboardRight>
      </AdminDashboardContainer>
    </AdminDashboardPage>
  );
};

export default AdminDashboard;
