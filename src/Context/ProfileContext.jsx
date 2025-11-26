import axios from 'axios';
import React, { createContext} from 'react'

  export const ProfileContext = createContext();

export default function ProfileContextProvider({children}) {
  
    const headers ={
        token : localStorage.getItem(`userToken`)
    }
     

    function getLoggedUserAddresses(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`,{
         headers 
        })
        .then(response => response)
        .catch(error => error)        
    }
  
  return <>
        <ProfileContext.Provider value={{getLoggedUserAddresses}}>
             {children}
        </ProfileContext.Provider>
  </>
}
