import { Modal, Slide } from "@mui/material";
import React, { FunctionComponent, useRef } from "react";
import { CustomButton, ModalContainer } from "../../../global/global.styles";
import { ModalHeader } from "../../Home/LyricsModal/LyricsModal.styles";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  state: boolean;
  toggleModal: Function;
}

const AddBlogModal: FunctionComponent<Props> = ({ state, toggleModal }) => {
  const editorRef = useRef<any>(null);
  const handleAddBlog = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const example_image_upload_handler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "image_upload_url", true);

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.data != "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.data);
      };

      const formData = new FormData();
      formData.append("image", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });
  return (
    <Modal
      open={state}
      onClose={() => {
        toggleModal();
      }}
    >
      <Slide direction="up" in={state}>
        <ModalContainer>
          <ModalHeader>ADD BLOG</ModalHeader>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="sipbzfgzbkks3gvw4i8zfy9zae8anqwhjdlzonw48zs2a2vu"
            init={{
              height: 500,
              // menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              images_upload_handler: example_image_upload_handler,
              image_title: true,
              file_picker_types: "image",
              automatic_uploads: true,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            initialValue="Start writing your blog here"
          />
          <CustomButton onClick={handleAddBlog}>ADD BLOG</CustomButton>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AddBlogModal;
