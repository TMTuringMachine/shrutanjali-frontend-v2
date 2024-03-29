import React, { MouseEventHandler, useEffect, useState } from 'react';

//styles
import {
  SongsTableContainer,
  StyledTableCell,
  TableActions,
  TableSongImage,
} from './songsTable.styles';
import { StyledTextField } from '../../../global/global.styles';

//libs
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Icon } from '@iconify/react';

//data
// import { songs } from "../../../helpers/data";
import moment from 'moment';
import DeleteModal from '../../Modals/DeleteModal';
import useMedia from '../../../hooks/useMedia';
import { IMedia } from '../../../interfaces/media.interface';
import SwitchComponent from './switch.component';
import EditSongModal from '../EditSongModal/editSongModal.component';
import { IbasicMedia } from '../../../interfaces/basic.media.interface';

interface DeleteModalState {
  visible: boolean;
  text?: string;
  id: null | string;
}

interface EditModalState {
  visible: boolean;
  song: IbasicMedia | null;
}

const SongsTable = () => {
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    visible: false,
    text: '',
    id: null,
  });
  const [editModalState, setEditModalState] = useState<EditModalState>({
    visible: false,
    song: null,
  });

  const { getAllBasicMedia, deleteBasicMedia } = useMedia();
  const [media, setMedia] = useState<IMedia[]>([]);
  // const [updated,setUpdated] = useState<boolean>(true);

  const toggleDeleteModal: Function = (name: string, id: string): void => {
    if (deleteModalState.visible) {
      setDeleteModalState({
        ...deleteModalState,
        visible: !deleteModalState.visible,
      });
    } else {
      setDeleteModalState({
        visible: true,
        text: `Do you really want to delete song ${name}`,
        id: id,
      });
    }
  };

  const toggleEditModal: Function = (song: IbasicMedia): void => {
    if (editModalState.visible) {
      setEditModalState({
        song: null,
        visible: false,
      });
    } else {
      setEditModalState({
        visible: true,
        song,
      });
    }
  };

  const getSongs = async () => {
    const { data } = await getAllBasicMedia();
    setMedia(data);
    console.log('media', data);
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      {/* <TableActions>
        <StyledTextField label="Search songs" variant="standard" />
      </TableActions> */}
      <SongsTableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Song Name</StyledTableCell>
              <StyledTableCell align="center">Streams</StyledTableCell>
              <StyledTableCell align="center">Uploaded on</StyledTableCell>
              <StyledTableCell align="center">LIVE</StyledTableCell>

              {/* <StyledTableCell align="center">EDIT</StyledTableCell> */}
              <StyledTableCell align="center">DELETE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {media?.map((song, item) => (
              <TableRow
                key={item}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="center">{song.title}</StyledTableCell>
                <StyledTableCell align="center">{song.streams}</StyledTableCell>
                <StyledTableCell align="center">
                  {moment(new Date()).format()}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <SwitchComponent
                    featured={song.isLive}
                    songId={song._id}
                    type={'Toggle'}
                  />
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:edit-square-outline"
                    width="20px"
                    height="20px"
                    style={{ cursor: 'pointer', color: 'gray' }}
                    onClick={() => {
                      toggleEditModal(song);
                    }}
                  />
                </StyledTableCell> */}
                <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:delete-rounded"
                    width="20px"
                    height="20px"
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => {
                      console.log(song, 'songgg');
                      toggleDeleteModal(song.title, song._id);
                    }}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
          <DeleteModal
            state={deleteModalState.visible}
            toggleModal={toggleDeleteModal}
            onNo={() => {
              toggleDeleteModal();
            }}
            onYes={() => {
              if (deleteModalState && deleteModalState.id) {
                deleteBasicMedia(deleteModalState.id);
                toggleDeleteModal();
              } else {
              }
            }}
            text={deleteModalState.text}
          />
          {/* <EditSongModal
            state={editModalState.visible}
            toggleModal={toggleEditModal}
            song={editModalState.song}
          /> */}
        </Table>
      </SongsTableContainer>
    </>
  );
};

export default SongsTable;
