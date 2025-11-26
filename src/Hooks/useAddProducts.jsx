import React, { useContext } from 'react'
import { CartContext } from  '../Context/CartContext';
import toast from "react-hot-toast";

export default function useAddProducts() {

      const { addProductToCart } = useContext(CartContext);
     
       async function addProduct(productId) {
         const response = await addProductToCart(productId);
         if(response.data.status === 'success'){
             toast.success(response.data.message,{
               duration: 1000,
               position: 'bottom-left',
             })   
         }
         }
         
         return {
            addProduct
         }


    }


 
