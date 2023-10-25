import React, { MouseEventHandler, useEffect, useState,useRef } from 'react';

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
import { Switch } from '@mui/material';

interface DeleteModalState {
  visible: boolean;
  text?: string;
  id: null | string;
}

interface EditModalState {
  visible: boolean;
  song: IMedia | null;
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
  
  const tableRef = useRef(null)
  const [height,setHeight] = useState(0)
  const { getAllMedia, deleteMedia,getMediaPaginated } = useMedia();
  const [media, setMedia] = useState<IMedia[]>([]);
  const [page,setPage] = useState(0);
  const [count,setCount] = useState(5);
  const {featureMedia,toggleMedia} = useMedia()
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

  const toggleEditModal: Function = (song: IMedia): void => {
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

  const handleDeleteSong: MouseEventHandler<HTMLButtonElement> = (): void => {
    console.log(deleteModalState);
  };

  const handlePagination = (page:number) => {
    setPage(page)
  };

  const getSongs = async () => {
    const data:any = await getMediaPaginated(page,4);
    console.log("THIS IS DATA W COUNT",data)
    setMedia(data.data);
    setCount(parseInt((data.count/4).toString()))
  };


  useEffect(() => {
    getSongs();
  }, [page]);

  return (
    <>
      <TableActions>
        <StyledTextField label="Search songs" variant="standard" />
      </TableActions>
      <SongsTableContainer ref={tableRef}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="center">Song Name</StyledTableCell>
              {/* <StyledTableCell align="center">Uploaded on</StyledTableCell> */}
              <StyledTableCell align="center">Streams</StyledTableCell>
              <StyledTableCell align="center">Wish-listed</StyledTableCell>
              <StyledTableCell align="center">FEATURED</StyledTableCell>
              <StyledTableCell align="center">LIVE</StyledTableCell>

              <StyledTableCell align="center">EDIT</StyledTableCell>
              <StyledTableCell align="center">DELETE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {media && media?.map((song, item) => (
              <TableRow
                key={item}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell align="left">
                  <TableSongImage
                    src={song.thumbnailUrl}
                    alt=""
                    loading="lazy"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{song.title}</StyledTableCell>
                {/* <StyledTableCell align="center">
                  {moment(new Date()).format()}
                </StyledTableCell> */}
                <StyledTableCell align="center">{song.streams}</StyledTableCell>
                <StyledTableCell align="center">
                  {song.wishlists || 0}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* <SwitchComponent
                    featured={song.isFeatured}
                    songId={song._id}
                    type={'Feature'}
                  /> */}
                  <Switch checked={song.isFeatured} onChange={()=>{featureMedia(song._id)}}   />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* <SwitchComponent
                    featured={song.isLive}
                    songId={song._id}
                    type={'Toggle'}
                  /> */}
                  <Switch checked={song.isLive}  onChange={()=>{toggleMedia(song._id)}} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:edit-square-outline"
                    width="20px"
                    height="20px"
                    style={{ cursor: 'pointer', color: 'gray' }}
                    onClick={() => {
                      toggleEditModal(song);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:delete-rounded"
                    width="20px"
                    height="20px"
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => {
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
              console.log(deleteMedia, 'delete media state');
              if (deleteModalState && deleteModalState.id) {
                deleteMedia(deleteModalState.id);
                toggleDeleteModal();
              } else {
              }
            }}
            text={deleteModalState.text}
          />
          <EditSongModal
            state={editModalState.visible}
            toggleModal={toggleEditModal}
            song={editModalState.song}
          />
        </Table>
      </SongsTableContainer>
      <div style={{display:"flex"}}>

          {
            [...new Array(count)].map((item,i)=>{
              return(
                <>
                {page===i?<><div onClick={()=>handlePagination(i)} style={{padding:"10px",cursor:"pointer",color:"red"}}>{i+1}</div></>:<><div onClick={()=>handlePagination(i)} style={{padding:"10px",cursor:"pointer"}}>{i+1}</div></>}
                </>
              )
            })
          }
        </div>

    </>
  );
};

export default SongsTable;
