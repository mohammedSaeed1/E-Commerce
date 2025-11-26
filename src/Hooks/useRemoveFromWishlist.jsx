import React, { useContext } from 'react'
import { WishlistContext } from '../Context/WishlistContext';
import toast from 'react-hot-toast';

export default function useRemoveFromWishlist() {

     const {removeProductFromWishlist  , setUserWishlistProductsById , setUserWishlistCount} =  useContext(WishlistContext);
  
   async function removeFromWishlist(productId){
        const {data} = await removeProductFromWishlist(productId);
        if(data?.status === 'success'){
        setUserWishlistProductsById(data.data);
        setUserWishlistCount(data.data.length);
            toast.success(data.message,{
              duration : 1000,
               position: 'bottom-left'
            })
           }
      }  
  
    return {removeFromWishlist}
}
