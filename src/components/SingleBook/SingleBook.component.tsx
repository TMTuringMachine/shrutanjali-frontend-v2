import './styles.css'
import { FunctionComponent,useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Page, pdfjs,Document } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
  ).toString();
import LifeOfLight from '../../assets/books/LifeOfLight.pdf' 

interface Props {
}

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
    <>
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flexDirection: 'column',
      flex: 1,
    }}> 
      <Typography sx={{ fontWeight: 800, fontSize: '2rem' }}>
        {"Life Of Light"}
      </Typography>
    </Box>
    <div className="App">
      <div className="page-container">
        <Document loading={<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",'height':'700px'}} ><CircularProgress/></Box>} file={LifeOfLight} onLoadSuccess={onDocumentLoadSuccess}>
          <Page loading={<><CircularProgress/></>} pageNumber={pageNumber} scale={pageScale} />
        </Document>
      </div>
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
    </div>
    </>
  );
};

export default SingleBook;
