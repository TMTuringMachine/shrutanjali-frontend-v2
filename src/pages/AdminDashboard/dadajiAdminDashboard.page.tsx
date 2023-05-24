import React, { useEffect, useState } from 'react';
import {
  ActionButton,
  ActionPanelContainer,
  AdminDahboardLeft,
  AdminDahboardRight,
  AdminDashboardContainer,
  AdminDashboardPage,
  Stat,
  StatsContainer,
} from './adminDashboard.styles';
import AdminHeader from '../../components/AdminDashboard/AdminHeader/adminHeader.component';
import { CustomHeading1 } from '../../global/global.styles';
import SongsTable from '../../components/DadajiAdminDashboard/SongsTable/SongsTable.component';
import AddSongModal from '../../components/DadajiAdminDashboard/AddSongModal/addSongModal.component';

import useAuth from '../../hooks/useAuth';

import { useNavigate } from 'react-router-dom';

const DadajiAdminDashboard = () => {
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const toggleAddSongModal = () => {
    setShowAddSongModal(!showAddSongModal);
  };

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [isLoggedIn]);

  return (
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
        </ActionPanelContainer>
        <AddSongModal
          state={showAddSongModal}
          toggleModal={toggleAddSongModal}
        />
      </AdminDahboardRight>
    </AdminDashboardContainer>
  );
};

export default DadajiAdminDashboard;
