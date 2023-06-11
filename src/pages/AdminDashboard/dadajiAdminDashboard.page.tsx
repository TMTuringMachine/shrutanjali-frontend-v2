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
