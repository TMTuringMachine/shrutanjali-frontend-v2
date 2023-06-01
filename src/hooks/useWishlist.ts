import { useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useWishlist = () => {
  const getWishlist = useCallback(() => {
    let wish;
    const list = localStorage.getItem('wishlist');
    if (list) {
      wish = JSON.parse(list);
    }
    return wish;
  }, []);

  const addToWishlist = useCallback(async (media: string) => {
    const list = localStorage.getItem('wishlist');
    let wish;
    if (list) {
      wish = JSON.parse(list);
      wish.push(media);
    } else {
      wish = [media];
    }
    localStorage.setItem('wishlist', JSON.stringify(wish));

    const res = await axiosInstance.post(`/media/updateMediaStats/${media}`, {
      wishlistCount: 1,
    });
    console.log(res, 'heres the wishlistt');
  }, []);

  const removeFromWishlist = useCallback(async (mediaId: string) => {
    const list = localStorage.getItem('wishlist');
    let wish;
    if (list) {
      wish = JSON.parse(list);
      const data = wish?.filter((w: string) => {
        return w !== mediaId;
      });
      localStorage.setItem('wishlist', JSON.stringify(data));
      const res = await axiosInstance.post(
        `/media/updateMediaStats/${mediaId}`,
        {
          wishlistCount: -1,
        }
      );
    }
    return wish;
  }, []);

  return {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
  };
};

export default useWishlist;
