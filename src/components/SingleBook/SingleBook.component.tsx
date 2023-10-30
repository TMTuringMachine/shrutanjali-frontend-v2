import { FunctionComponent, useEffect } from 'react';
import useBooks from '../../hooks/useBooks';
import { Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import IBook from '../../interfaces/book.interface';

interface Props {
  book?: IBook;
}

const SingleBook: FunctionComponent<Props> = ({ book }) => {
  const { bookDataState, getBooksData } = useBooks();

  useEffect(() => {
    if (book === undefined) {
      return;
    }

    console.log(book, 'how i here');
    getBooksData(book.url);
  }, [book]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: '2rem' }}>
        {book?.title}
      </Typography>
      <Box sx={{ margin: '1rem' }}>
        {bookDataState.loading ? (
          <CircularProgress />
        ) : (
          <Box>{bookDataState?.data}</Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleBook;
