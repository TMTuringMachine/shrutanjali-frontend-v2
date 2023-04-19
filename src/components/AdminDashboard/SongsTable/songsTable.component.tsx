import React, { MouseEventHandler, useEffect, useState } from "react";

//styles
import {
  SongsTableContainer,
  StyledTableCell,
  TableActions,
  TableSongImage,
} from "./songsTable.styles";
import { StyledTextField } from "../../../global/global.styles";

//libs
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Icon } from "@iconify/react";

//data
// import { songs } from "../../../helpers/data";
import moment from "moment";
import { Switch } from "@mui/material";
import DeleteModal from "../../Modals/DeleteModal";
import useMedia from "../../../hooks/useMedia";
import { IMedia } from "../../../interfaces/media.interface";
import SwitchComponent from "./switch.component";

interface DeleteModalState {
  visible: boolean;
  text?: string;
  id: null | string;
}


const SongsTable = () => {
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    visible: false,
    text: "",
    id: null,
  });
  const {getAllMedia,deleteMedia} = useMedia()
  const [media,setMedia] = useState<IMedia[]>([]);
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

  const handleDeleteSong: MouseEventHandler<HTMLButtonElement> = (): void => {
    console.log(deleteModalState);
  };

  const deleteSong = () => {
    //delete the song
  };

  const getSongs = async()=>{
    const {data} = await getAllMedia();
    setMedia(data)
    console.log("media",data)
  }
  
  useEffect(() => {
    getSongs();
  }, [])
  

  return (
    <>
      <TableActions>
        <StyledTextField label="Search songs" variant="standard" />
      </TableActions>
      <SongsTableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="center">Song Name</StyledTableCell>
              <StyledTableCell align="center">Uploaded on</StyledTableCell>
              <StyledTableCell align="center">FEATURED</StyledTableCell>
              <StyledTableCell align="center">LIVE</StyledTableCell>

              <StyledTableCell align="center">EDIT</StyledTableCell>
              <StyledTableCell align="center">DELETE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {media?.map((song, item) => (
              <TableRow
                key={item}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="left">
                  <TableSongImage src={song.thumbnailUrl} alt="" loading="lazy" />
                </StyledTableCell>
                <StyledTableCell align="center">{song.title}</StyledTableCell>
                <StyledTableCell align="center">
                  {moment(new Date()).format()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <SwitchComponent featured={song.isFeatured} songId={song._id} type={"Feature"} />
                  {/* <Switch checked={song.isFeatured} onChange={()=>{featureMedia(song._id)}}   /> */}
                </StyledTableCell>
                <StyledTableCell align="center">
                <SwitchComponent featured={song.isFeatured} songId={song._id} type={"Toggle"} />
                  {/* <Switch checked={song.isLive}  onChange={()=>{toggleMedia(song._id)}} /> */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:edit-square-outline"
                    width="20px"
                    height="20px"
                    style={{ cursor: "pointer",color:"gray" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:delete-rounded"
                    width="20px"
                    height="20px"
                    style={{ cursor: "pointer", color:"red" }}
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
            onYes={()=>{
              if(deleteModalState && deleteModalState.id){
              deleteMedia(deleteModalState.id)
              toggleDeleteModal();
            }
              else{
                
              }
            }}
            text={deleteModalState.text}
          />
        </Table>
      </SongsTableContainer>
    </>
  );
};

export default SongsTable;
