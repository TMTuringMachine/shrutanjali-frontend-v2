import { FunctionComponent, useEffect, useState } from 'react';
import useBooks from '../../hooks/useBooks';
import { Box } from '@mui/material';
import SingleBook from '../../components/SingleBook/SingleBook.component';
import IBook from '../../interfaces/book.interface';
import AllBooks from '../../utils/AllBooksData';

const SingleBookPage: FunctionComponent = () => {
  const [currBook, setCurrentBook] = useState<IBook>();

  useEffect(() => {
    const id = parseInt(window.location.href.split('/')[4]);
    const curr = AllBooks.find((book) => book.id === id);
    if (curr == undefined) {
      return;
    }
    setCurrentBook(curr);
  }, [window.location]);

  const url =
    'http://res.cloudinary.com/ddb2uojz3/image/upload/v1684922158/PDFs/tlxev6ygqwaxio2kppx5.pdf';

  // console.log(currBook, ' thhis s the current book');

  return <SingleBook book={currBook} />;
};

export default SingleBookPage;
