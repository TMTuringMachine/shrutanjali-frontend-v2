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
import SongsTable from '../../components/AdminDashboard/SongsTable/songsTable.component';
import AddSongModal from '../../components/AdminDashboard/AddSongModal/addSongModal.component';

import useAuth from '../../hooks/useAuth';

import { useNavigate } from 'react-router-dom';
import DadajiAdminDashboard from './dadajiAdminDashboard.page';
import { Typography } from '@mui/material';
import DadajiHeader from '../DadajiSongs/DadajiHeader';

const AdminDashboard = () => {
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
    <AdminDashboardPage>
      <AdminHeader />
      <AdminDashboardContainer>
        <AdminDahboardLeft>
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
      <hr />
      <DadajiHeader/>
      <DadajiAdminDashboard />
    </AdminDashboardPage>
  );
};

export default AdminDashboard;
