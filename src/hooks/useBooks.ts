import { useCallback, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import AllBooks from '../utils/AllBooksData';

interface bookDataProps {
  loading: boolean;
  data: string | null;
}

const useBooks = () => {
  const [bookDataState, setBookDataState] = useState<bookDataProps>({
    loading: false,
    data: null,
  });

  const getBooksData = useCallback(async (url: string) => {
    setBookDataState({
      loading: true,
      data: null,
    });
    const res = await axiosInstance.post('/media/getTextFromPdf', { url });
    setBookDataState({
      loading: false,
      data: res?.data,
    });
  }, []);

  const getAllBooks = useCallback(async () => {
    return AllBooks;
  }, []);

  return {
    getBooksData,
    bookDataState,
    getAllBooks,
  };
};

export default useBooks;
