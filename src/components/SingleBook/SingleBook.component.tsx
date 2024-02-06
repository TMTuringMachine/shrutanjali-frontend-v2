import "./styles.css";
import { FunctionComponent, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Page, pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();
import LifeOfLight from "../../assets/books/LifeOfLight.pdf";
import { Icon } from "@iconify/react";

interface Props {}

const SingleBook: FunctionComponent<Props> = () => {
  const [numPages, setNumPages] = useState<number>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const [pageNumber, setPageNumber] = useState(1);
  const [pageScale, setPageScale] = useState(1);

  function handleZoomIn() {
    if (pageScale < 3) {
      setPageScale(pageScale + 0.2);
    }
  }

  function handleZoomOut() {
    if (pageScale > 0.3) {
      setPageScale(pageScale - 0.2);
    }
  }

  function handleNext() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }
  function handlePrevious() {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  }

  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: "2rem" }}>
          {"Life Of Light"}
        </Typography>
      </Box>
      {/**
      <div className="footer">
        <div className="button-container">
          <button onClick={handleZoomIn} disabled={pageScale >= 3}>
            Zoom +
          </button>
          <button onClick={handleZoomOut} disabled={pageScale <= 0.3}>
            Zoom -
          </button>
        </div>
        <div className="page-text">
          Page {pageNumber} of {numPages}
        </div>
        <div className="button-container">
          <button onClick={handlePrevious} disabled={pageNumber === 1}>
            ‹ Previous
          </button>
          <button onClick={handleNext} disabled={pageNumber === numPages}>
            Next ›
          </button>
        </div>
      </div>
        **/}
      <div className="App">
        <div className="page-container">
          <Document
            loading={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "700px",
                }}
              >
                <CircularProgress />
              </Box>
            }
            file={LifeOfLight}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              loading={
                <>
                  <CircularProgress />
                </>
              }
              pageNumber={pageNumber}
              scale={1}
              // scale={pageScale}
            />
          </Document>
        </div>
        <Box
          sx={{
            display: "flex",
            // flexDirection: "column",
            gap: "30px",
            padding: "10px",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              color: "black",
              display: "flex",
              gap: "5px",
              justifyContent: "space-between",
            }}
            disabled={pageNumber === 1}
            onClick={handlePrevious}
          >
            <Icon
              icon="solar:arrow-left-linear"
              style={{ width: "30px", height: "30px" }}
            />
          </Button>
          <Typography sx={{ fontSize: "1.1em", fontWeight: 500 }}>
            {pageNumber} of {numPages}
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "black",
              display: "flex",
              gap: "5px",
              justifyContent: "space-between",
            }}
            disabled={pageNumber === numPages}
            onClick={handleNext}
          >
            <Icon
              icon="solar:arrow-right-linear"
              style={{ width: "30px", height: "30px" }}
            />
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default SingleBook;
