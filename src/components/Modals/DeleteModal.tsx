import React, { FunctionComponent, MouseEventHandler } from "react";
import { Box, Button, Modal, styled } from "@mui/material";
import { Icon } from "@iconify/react";

const DeleteModalContainer = styled(Box)(({ theme }) => ({
  width: "30vw",
  height: "fit-content",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  outline: "none",
  borderRadius: 10,
  padding: "10px 20px 20px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  //   '& .alert-svg':{
  //     '& path':{
  //         fill:'#c73737'
  //     }
  //   },

  "& .delete-text": {
    fontSize: "1.4em",
    fontWeight: 600,
    textAlign: "center",
  },
  "& .delete-text-sub": {
    fontSize: "0.9em",
    color: "#a3a3a3",
    textAlign: "center",
  },
  "& .btn-container": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "30px",

    "& .MuiButton-root": {
      width: "48%",
      borderRadius: 5,
    },
  },
  "& .delete-btn": {
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  "& .cancel-btn": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down("md")]: {
    width: "50vw",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80vw",
  },
}));

interface Props {
  state: boolean;
  toggleModal: Function;
  onYes: MouseEventHandler<HTMLButtonElement>;
  onNo: MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

const DeleteModal: FunctionComponent<Props> = ({
  state,
  onYes,
  onNo,
  toggleModal,
  text,
}) => {
  return (
    <Modal
      open={state}
      onClose={() => {
        toggleModal();
      }}
    >
      <DeleteModalContainer>
        <Icon icon="mdi:alert-circle" width="150px" height="150px" />
        <div>
          <div className="delete-text">
            {text || "Do you really want to delete this?"}
          </div>
          <div className="delete-text-sub">
            Once deleted, it cannot be restored !
          </div>
        </div>
        <div className="btn-container">
          <Button className="cancel-btn" onClick={onNo}>
            CANCEL
          </Button>
          <Button className="delete-btn" onClick={onYes}>
            DELETE
          </Button>
        </div>
      </DeleteModalContainer>
    </Modal>
  );
};

export default DeleteModal;
