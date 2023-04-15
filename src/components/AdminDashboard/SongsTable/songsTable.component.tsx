import React, { MouseEventHandler, useState } from "react";

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
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";

//data
import { songs } from "../../../helpers/data";
import moment from "moment";
import { Switch } from "@mui/material";
import { text } from "stream/consumers";
import DeleteModal from "../../Modals/DeleteModal";

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
            {songs.map((song, item) => (
              <TableRow
                key={item}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="left">
                  <TableSongImage src={song.image} alt="" loading="lazy" />
                </StyledTableCell>
                <StyledTableCell align="center">{song.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {moment(new Date()).format()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Switch />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Switch />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:edit-square-outline"
                    width="20px"
                    height="20px"
                    style={{ cursor: "pointer" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Icon
                    icon="material-symbols:delete-rounded"
                    width="20px"
                    height="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      toggleDeleteModal(song.name, song.id);
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
            onYes={handleDeleteSong}
            text={deleteModalState.text}
          />
        </Table>
      </SongsTableContainer>
    </>
  );
};

export default SongsTable;
