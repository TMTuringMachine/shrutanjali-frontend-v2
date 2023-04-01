import React, { useState } from "react";
import * as UpChunk from "@mux/upchunk";

const AdminLandingPage = () => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleUpload = async (inputRef:any) => {
    try {
      const response = await fetch("http://localhost:5000/api/mux", { method: "POST" });
      const url = await response.json();

      const upload = UpChunk.createUpload({
        endpoint: url.url, // Authenticated url
        file: inputRef.files[0], // File object with your video file’s properties
        chunkSize: 5120, // Uploads the file in ~5mb chunks
      });

      // Subscribe to events
      upload.on("error", (error) => {
        setStatusMessage(error.detail);
      });

      upload.on("progress", (progress) => {
        setProgress(progress.detail);
        console.log(progress)
      });

      upload.on("success", () => {
        return setStatusMessage("Wrap it up, we're done here. 👋");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <h1>File upload button</h1>
      <label htmlFor="file-picker">Select a video file:</label>
      <input
        type="file"
        onChange={(e) => handleUpload(e.target)}
        id="file-picker"
        name="file-picker"
      />

      <label htmlFor="upload-progress">Uploading progress:</label>
      <progress value={progress} max="100" />

      <em>{statusMessage}</em>
    </div>
  );
};

export default AdminLandingPage;
