import React, { MouseEventHandler, useEffect, useState, useRef } from "react";

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
import DeleteModal from "../../Modals/DeleteModal";
import useMedia from "../../../hooks/useMedia";
import { IMedia } from "../../../interfaces/media.interface";
import SwitchComponent from "./switch.component";
import EditSongModal from "../EditSongModal/editSongModal.component";
import { Pagination, Switch } from "@mui/material";
import CustomSwitch from "./CustomSwitch.component";

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
    text: "",
    id: null,
  });
  const [editModalState, setEditModalState] = useState<EditModalState>({
    visible: false,
    song: null,
  });

  const tableRef = useRef(null);
  const [height, setHeight] = useState(0);
  const { getAllMedia, deleteMedia, getMediaPaginated } = useMedia();
  const [media, setMedia] = useState<IMedia[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const { featureMedia, toggleMedia } = useMedia();
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

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  // const handlePagination = (page: number) => {
  //   setPage(page);
  // };

  const [render,setRender] = useState(false);

  const getSongs = async () => {
    const data: any = await getMediaPaginated(page - 1, 6);
    setMedia(data.data);
    setCount(Math.ceil(parseInt(data.count) / 6));
  };

  useEffect(() => {
    getSongs();
  }, [page,render]);

  return (
    <>
      {/* <TableActions>
        <StyledTextField label="Search songs" variant="standard" />
      </TableActions> */}
      <SongsTableContainer ref={tableRef}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Index</StyledTableCell>
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
            {media &&
              media?.map((song, item) => {
                console.log(song.title, "FEATURED : ",song.isFeatured, "LIVE : ",song.isLive)
                return (
                  <TableRow
                    key={item}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* <StyledTableCell align="left">
                      <TableSongImage
                        src={song.thumbnailUrl}
                        alt=""
                        loading="lazy"
                      />
                    </StyledTableCell> */}
                    <StyledTableCell align="center">{item+1}</StyledTableCell>
  
                    <StyledTableCell align="center">{song.title}</StyledTableCell>
                    {/* <StyledTableCell align="center">
                    {moment(new Date()).format()}
                  </StyledTableCell> */}
                    <StyledTableCell align="center">
                      {song.streams}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {song.wishlists || 0}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* <CustomSwitch
                        checked={song.isFeatured}
                        handleChange={async() => {
                          await featureMedia(song._id);
                        }}
                      /> */}
                      <Switch checked={song.isFeatured} onChange={async()=>{
                        await featureMedia(song._id)
                        setRender(!render)
                      }} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* <CustomSwitch
                        checked={song.isLive}
                        handleChange={async() => {
                          await toggleMedia(song._id);
                        }}
                      /> */}
                      <Switch checked={song.isLive} onChange={async()=>{
                        await toggleMedia(song._id)
                        setRender(!render)
                      }} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Icon
                        icon="material-symbols:edit-square-outline"
                        width="20px"
                        height="20px"
                        style={{ cursor: "pointer", color: "gray" }}
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
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          toggleDeleteModal(song.title, song._id);
                        }}
                      />
                    </StyledTableCell>
                  </TableRow>
                )
              }
              )}
          </TableBody>
          <DeleteModal
            state={deleteModalState.visible}
            toggleModal={toggleDeleteModal}
            onNo={() => {
              toggleDeleteModal();
            }}
            onYes={() => {
              console.log(deleteMedia, "delete media state");
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
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
        sx={{ marginTop: "20px" }}
      />
      {/**
         
      <div style={{ display: "flex" }}>
        {[...new Array(count)].map((item, i) => {
          return (
            <>
              {page === i ? (
                <>
                  <div
                    onClick={() => handlePagination(i)}
                    style={{ padding: "10px", cursor: "pointer", color: "red" }}
                  >
                    {i + 1}
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => handlePagination(i)}
                    style={{ padding: "10px", cursor: "pointer" }}
                  >
                    {i + 1}
                  </div>
                </>
              )}
            </>
          );
        })}
      </div>
         * **/}
    </>
  );
};

export default SongsTable;
