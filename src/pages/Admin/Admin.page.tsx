import React, { useRef, useState } from "react";
import * as UpChunk from "@mux/upchunk";
// import {MuxAudio} from '@mux/mux-audio-react';

import MuxAudio from "@mux/mux-audio-react";
import "./Admin.css";
import { Box, Button, Typography } from "@mui/material";

const AdminLandingPage = () => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const audioRef = useRef();

  const handleUpload = async (inputRef: any) => {
    try {
      const response = await fetch(
        "https://shrutanjali-api.onrender.com/api/mux",
        {
          method: "POST",
        }
      );
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
        console.log(progress);
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
      <div>
        <h1>Simple MuxAudio Example</h1>
        <MuxAudio
          src="https://stream.mux.com/qKAAVaxiKFKVAJx6CRPfwErh2u86LqU9g3lBj9rgSgc.m3u8?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlgzWTJMenlCV2g4MDFWbTAyUTl2Z09YMlBJNzh2VEVoMDBKOUNHY2thNlcwMjhZIn0.eyJleHAiOjE2ODIxMTAzMjcsImF1ZCI6InYiLCJzdWIiOiJxS0FBVmF4aUtGS1ZBSng2Q1JQZndFcmgydTg2THFVOWczbEJqOXJnU2djIn0.uJ6IMQagJ0ahw1xeuPFog8A42f7Nwq7KjXK8vmyJNYYMjr6xIl9H0lnD9hGu3-RMq6urCYthe8nvxBTKDfMGwf3ACt5cU53CPS1GhLy12bTjINwQMFP8v4C-Mh8oRALtgUb2x0XaeEntq9fsTHrsu2n_e_q9hT1vs8K6V9eXjRh-Z7jmjL0YKhagLYX-tG1Ktm0wHrnN8knIVDPfLPd316R3br4ba7bZFtS77zl3YZ_yyMfuRqzkAY8dm9ZT-FrtmQXK8DCG8nVhuuhavmXtT-pVBfZFPA7DzUFk4eeWuWeqD2YEab3fSsffLp7ufSuSAvivRILcWEymZ7-Js0OkTg"
          type="hls"
          controls
          ref={audioRef}
          // style={{ display: "none" }}
        />

        <Box>
          <Typography>my player</Typography>
          <Button
            onClick={() => {
              audioRef.current.play();
            }}
          >
            PLAY
          </Button>
        </Box>

        {/* <MuxAudio
          playbackId="AVHkeLWTefZen4Nx5i7cHjdliYnaMoTCtb1UMgVMGc00"
          streamType="on-demand"
          controls
          muted
        /> */}
      </div>
    </div>
  );
};

export default AdminLandingPage;
