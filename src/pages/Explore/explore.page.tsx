import React from "react";
import Transition from "../../components/Transition";
import { PageContainer } from "../page.styles";
import { StyledTextField } from "../../global/global.styles";
import { ContinueListeningSection } from "./explore.styles";

//data
import { songs } from "../../helpers/data";
import { Grid } from "@mui/material";
import SongOverview from "../../components/Explore/SongOverview/songOverview.component";

const Explore = () => {
  return (
    <Transition>
      <PageContainer>
        <StyledTextField label="Search songs" variant="standard" style={{marginBottom:'20px'}} />
        <ContinueListeningSection container spacing={5} >
          {songs.slice(10).map((song) => (
            <Grid item md={2} >
              <SongOverview song={song} />
            </Grid>
          ))}
        </ContinueListeningSection>
      </PageContainer>
    </Transition>
  );
};

export default Explore;
