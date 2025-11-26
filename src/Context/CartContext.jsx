import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";

  export const CartContext = createContext();


export default function CartContextProvider(props) {



  const {userToken} = useContext(userContext);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cartId, setCartId] = useState('');

const [numCartItems, setNumCartItems] = useState('');
const [totalCartPrice, setTotalCartPrice] = useState('');
const [cartProducts, setCartProducts] = useState([]);
 
useEffect(() => {
  if(userToken){
    getLoggedUserCart();
  }
},[userToken])


  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => {
        setCartId(response.data.cartId);     
         setNumCartItems(response.data.numOfCartItems);   
         setTotalCartPrice(response.data.data.totalCartPrice);                  
       return response;
      })
      .catch((error) => error)
  }

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((response) => {
        setNumCartItems(response.data.numOfCartItems)
        return response})
      .catch((error) => error)
  }

  function updateCartQuantity(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error)
  }

  function removeSpecificItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) =>{
         setNumCartItems(response.data.numOfCartItems);
        return response})
      .catch((error) => error)
  }

  function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((response)=>{
      setNumCartItems(response.data.numOfCartItems);
      return response})
    .catch((error)=>error)  
  }
  
  function checkOut(cartId , url , shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
      shippingAddress
    },{headers})
    .then(response => response)
    .catch(error => error)
  }

  function createCashOrder(cartId , shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
    shippingAddress
    },{
     headers
    })
    .then(response => response)
    .catch(error => error)
  }


  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCart,
        updateCartQuantity,
        removeSpecificItem,
        clearCart,
        checkOut,
        createCashOrder,
        cartId,
        numCartItems,
        setNumCartItems,
        cartProducts ,
        setCartProducts,
        totalCartPrice,
       setTotalCartPrice
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
