import React, {
  FunctionComponent,
  useState,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";

//libs
import { FullScreenHandle } from "react-full-screen";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Popover,
  Select,
  Slider,
  Typography,
  useTheme,
  Tooltip
} from "@mui/material";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();
//interfaces
import { Song } from "../../interfaces/song.interface";

//styles
import {
  PlayerContainer,
  Overlay,
  SongInfoContainer,
  ProgressBar,
  PlayerOptions,
  LyricsContainer,
  LyricsText,
  ProgressSlider,
} from "./FullScreenPlayer.styles";
import { IAudio, IMedia } from "../../interfaces/media.interface";
import useMedia from "../../hooks/useMedia";
import { OptionButton } from "../../pages/Home/home.styles";
import { useWindowSize } from "../../hooks/useWindowSize";
import useWishlist from "../../hooks/useWishlist";

interface Props {
  fullScreenHandler: FullScreenHandle;
  song: IMedia | null;
  nextSong: Function;
  previousSong: Function;
  togglePlay: Function;
  progress: number;
  isPlaying: boolean;
  seek: Function;
  currentAudioIndex: any;
  setCurrentAudioIndex: Function;
}

const FullScreenPlayer: FunctionComponent<Props> = ({
  song,
  nextSong,
  previousSong,
  togglePlay: toggle,
  progress,
  fullScreenHandler,
  isPlaying,
  seek,
  currentAudioIndex,
  setCurrentAudioIndex,
}) => {
  const [readMode, setReadMode] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(true);
  const [language, setLanguage] = React.useState<number>(0);
  const ref = useRef<HTMLDivElement>();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [audioAnchorEl, setAudioAnchorEl] = useState(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [mobileReadMode, setMobileReadModa] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const audioOpen = Boolean(audioAnchorEl);
  const audioPopoverId = audioOpen ? "audio-popover" : undefined;
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAudioClick = (event: any) => {
    setAudioAnchorEl(event.currentTarget);
  };

  const handleAudioClose = () => {
    setAudioAnchorEl(null);
  };

  const { getSongLyrics, lyricState } = useMedia();

  const theme = useTheme();
  const mywindow = useWindowSize();

  useEffect(() => {
    if (song) {
      if (song.lyrics === undefined) {
        return;
      }
      if (song.lyrics.length > 0) {
        getSongLyrics(song.lyrics[language]?.url);
      }
    }
  }, [song, language]);

  const handleMouseMove = (e: MouseEvent) => {
    const timer = ref?.current?.getAttribute("timer");

    if (timer) {
      clearTimeout(timer);
      ref?.current?.setAttribute("timer", "");
    }

    const t = setTimeout(() => {
      ref?.current?.setAttribute("timer", "");
      setShowPlayer(false);
    }, 5000);

    ref?.current?.setAttribute("timer", t);
    setShowPlayer(true);
  };

  useEffect(() => {
    if (mywindow.width! > 600) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mywindow]);

  const toggleReadMode = () => {
    if (mywindow.width < 600) {
      setMobileReadModa(!mobileReadMode);
      return;
    }
    setReadMode(!readMode);
  };

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const fixUrl = (url: string) => {
    if (!url) return url;
    let nurl = url;
    if (url.slice(0, 6) != "https") {
      let main = url.slice(7);
      nurl = "https://" + main;
    }
    return nurl;
  };

  useEffect(() => {
    console.log(mywindow, "this is current dimensions");
  }, [mywindow]);

  const getIconColor = () => {
    if (mywindow.width < 600) return "black";
    return "white";
  };

  const { addToWishlist,getWishlist,removeFromWishlist } = useWishlist();
  const [wish, setWish] = useState<string[]>([]);
  const [render, setRender] = useState<Boolean>(false);

  const isWishListed = (songId: string) => {
    if (wish?.includes(songId)) return true;
    return false;
  };

  useEffect(() => {
    setWish(getWishlist());
  }, [render])

  



  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <PlayerContainer url={song?.thumbnailUrl} ref={ref} read={readMode}>
        <Overlay visible={showPlayer}>
          <SongInfoContainer>
            <img src={song!.thumbnailUrl} alt="" />
            <h1 className="song-name">{song!.title}</h1>
          </SongInfoContainer>
          <ProgressSlider
            sx={{ width: "100%" }}
            color="secondary"
            value={progress}
            onChange={(e: any) => seek(e.target.value)}
          />
          <PlayerOptions>
            <Box className="opt-container">

            <Tooltip title={"Lyrics"} >
              <Icon
                color={readMode ? theme.palette.primary.main : "#fff"}
                icon="basil:book-open-solid"
                width="35px"
                height="35px"
                onClick={() => toggleReadMode()}
                />
            </Tooltip>

            {isWishListed(song?._id) ? (
              <>
              <Tooltip title={"Remove From Wishlist"} arrow >

                <Icon
                  icon="fe:heart"
                  width="35px"
                  height="35px"
                  style={{ color: "red" }}
                  onClick={() => {
                    removeFromWishlist(song?._id);
                    setRender(!render);
                  }}
                  />
                  </Tooltip>
              </>
            ) : (
              <>
              <Tooltip title={"Add To Wishlist"} arrow >

                <Icon
                  color="#ffffff"
                  icon="fe:heart"
                  width="35px"
                  height="35px"
                  onClick={() => {
                    addToWishlist(song?._id);
                    setRender(!render);
                  }}
                  />
                  </Tooltip>
              </>
            )}
            </Box>
            <Box className="player-options">
              <Icon
                color="white"
                icon="material-symbols:skip-previous-rounded"
                width="40px"
                height="40px"
                onClick={() => {
                  previousSong();
                }}
              />
              <Icon
                color="white"
                icon={
                  isPlaying
                    ? "material-symbols:pause-circle-rounded"
                    : "material-symbols:play-circle-rounded"
                }
                // width="80px"
                width={mywindow.width! < 600 ? "60px" : "80px"}
                height={mywindow.width! < 600 ? "60px" : "80px"}
                // width={theme.breakpoints.down("sm") ? "60px" : "80px"}
                // height={theme.breakpoints.down("sm") ? "60px" : "80px"}
                // height="80px"
                onClick={() => {
                  toggle();
                }}
              />
              <Icon
                color="white"
                icon="material-symbols:skip-next-rounded"
                width="40px"
                height="40px"
                onClick={() => {
                  nextSong();
                }}
              />
            </Box>
            <Box className="opt-container">
              <Icon
                color="white"
                icon="material-symbols:headphones"
                width="35px"
                height="35px"
                onClick={handleAudioClick}
              />
              <Icon
                // color="white"
                color={getIconColor()}
                icon="tabler:arrows-diagonal-minimize-2"
                width="35px"
                height="35px"
                onClick={fullScreenHandler.exit}
              />
            </Box>
          </PlayerOptions>
          <Popover
            id={audioPopoverId}
            open={audioOpen}
            anchorEl={audioAnchorEl}
            onClose={handleAudioClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            container={ref.current}
          >
            <Box sx={{ width: "fit-content", padding: "5px" }}>
              {song?.audios?.map((item: IAudio, idx: number) => (
                <OptionButton
                  active={idx == currentAudioIndex}
                  onClick={() => {
                    setCurrentAudioIndex(idx);
                    toggle();
                    // setIsPlaying(false);
                  }}
                >
                  {item.language}
                </OptionButton>
              ))}
            </Box>
          </Popover>

          {mywindow.width! < 600 && mobileReadMode ? (
            <Box sx={{ overflow: "auto" }}>
              {lyricState.loading ? (
                <CircularProgress />
              ) : (
                <LyricsText>
                  <Document
                    file={fixUrl(song?.lyrics![language]?.url)}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        customTextRenderer={false}
                        key={`page_${index + 1}`}
                        className="pdf-page"
                        pageNumber={index + 1}
                        scale={1.7}
                      />
                    ))}
                  </Document>
                </LyricsText>
              )}
            </Box>
          ) : null}
        </Overlay>
      </PlayerContainer>
      <LyricsContainer read={readMode}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography sx={{ fontSize: "0.8em" }}>Lyrics</Typography>
          {song?.lyrics?.length! > 1 ? (
            <>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {song?.lyrics![language].language}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                container={ref.current}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {song?.lyrics?.map((i, idx) => (
                  <MenuItem
                    value={idx}
                    onClick={() => {
                      setLanguage(idx);
                    }}
                  >
                    {i.language}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : null}
        </Box>
        {lyricState.loading ? (
          <CircularProgress />
        ) : (
          <LyricsText>
            <Document
              file={fixUrl(song?.lyrics![language]?.url)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  customTextRenderer={false}
                  key={`page_${index + 1}`}
                  className="pdf-page"
                  pageNumber={index + 1}
                  scale={1.7}
                />
              ))}
            </Document>
            {/**

            {lyricState?.lyrics?.split("\n").map((item) => <p>{item}</p>)}
              **/}
          </LyricsText>
        )}
      </LyricsContainer>
    </Box>
  );
};

export default FullScreenPlayer;
