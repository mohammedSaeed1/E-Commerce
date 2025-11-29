import { createContext, useEffect, useState } from "react";
 
export const userContext = createContext();

 export default function UserContextProvider(props){
      
     const [userToken, setUserToken] = useState('');
     const [userName, setUserName] = useState('');
     const [userEmail, setUserEmail] = useState('');

    
     useEffect(() => {
       
        if(localStorage.getItem('userToken'))
            setUserToken(localStorage.getItem('userToken'));
       
        if(localStorage.getItem('userName'))
            setUserName(localStorage.getItem('userName'));

        if(localStorage.getItem('userEmail'))
            setUserEmail(localStorage.getItem('userEmail'));

       

     }, [])
     

    return  <userContext.Provider value={{userToken, setUserToken , userName , userEmail , setUserName , setUserEmail}}>
        {props.children}
      </userContext.Provider>
 }