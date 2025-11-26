import axios from 'axios';
import  { createContext, useContext, useEffect, useState } from 'react'
import { userContext } from './UserContext';

export const WishlistContext =  createContext();

export default function WishlistContextProvider({children}) {


const {userToken} = useContext(userContext);
const [userWishlist, setUserWishlist] = useState([]);
const [userWishlistCount, setUserWishlistCount] = useState(``);
const [userWishlistProductsById, setUserWishlistProductsById] = useState([]);

    const headers = {
        token : localStorage.getItem(`userToken`)
    }
  
    function getLoggedUserWishlist(){
        return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((response) => {           
       setUserWishlistCount(response.data.count);
       return response;
      })
      .catch((error) => error)
    }

     function addProductToWishlist(productId){
        return axios
      .post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},
        {headers,}
        )
      .then((response) => {           
       return response;
      })
      .catch((error) => error)
    }

    function removeProductFromWishlist(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {headers})
      .then((response) => {    
       return response;
      })
      .catch((error) => error)
    }

    useEffect(() => {
      if(userToken){
        getLoggedUserWishlist();
      }
    }, [userToken])
    

    return (
       <WishlistContext.Provider value={{getLoggedUserWishlist , addProductToWishlist , removeProductFromWishlist , setUserWishlist , userWishlist , setUserWishlistCount , userWishlistCount , userWishlistProductsById ,setUserWishlistProductsById }}>
           {children}   
       </WishlistContext.Provider>  
     
  )
}
