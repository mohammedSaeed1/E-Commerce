import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../Context/WishlistContext';

export default function useAddToWishlist() {

const {setUserWishlistProductsById , setUserWishlistCount , addProductToWishlist} = useContext(WishlistContext);

    async function addToWishlist(productId) {
    const response = await addProductToWishlist(productId);
    if (response?.data?.status === "success") {
      setUserWishlistProductsById(response.data.data);
      setUserWishlistCount(response.data.data.length);
      toast.success(response.data.message, {
        duration: 1000,
        position: "bottom-left",
      });
    } else {
      toast.error(response.response.data.message, {
        duration: 1000,
        position: "bottom-left",
      });
    }
  }

  return {addToWishlist}
}
