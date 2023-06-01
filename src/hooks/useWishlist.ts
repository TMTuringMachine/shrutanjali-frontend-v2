import { useCallback } from "react"

const useWishlist = ()=>{
    const getWishlist = useCallback(()=>{
        let wish;
        const list = localStorage.getItem("wishlist");
        if(list){
            wish = JSON.parse(list);
        }
        return wish;
    },[])

    const addToWishlist = useCallback((media:string) => {
        const list = localStorage.getItem("wishlist");
        let wish;
        if(list){
            wish = JSON.parse(list);
            wish.push(media);
        }else{
            wish = [media];
        }
        localStorage.setItem("wishlist", JSON.stringify(wish));
      },[])

    const removeFromWishlist = useCallback((mediaId:string)=>{
        const list = localStorage.getItem("wishlist");
        let wish;
        if(list){
            wish = JSON.parse(list);
            const data = wish?.filter((w:string)=>{
                return w!==mediaId
            })
            localStorage.setItem("wishlist", JSON.stringify(data));
        }
        return wish;
    },[])
    
    return{
        getWishlist,
        addToWishlist,
        removeFromWishlist
    }
}

export default useWishlist;