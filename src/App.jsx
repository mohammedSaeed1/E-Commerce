import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Orders from "./components/Orders/Orders";
import ProductsCategory from "./components/ProductsCategory/ProductsCategory";
import Payment from "./components/Payment/Payment";
import ProfileContextProvider from './Context/ProfileContext';
import WishlistContextProvider from "./Context/WishlistContext";
import Wishlist from "./components/Wishlist/Wishlist";
import RecoverEmail from "./components/RecoverEmail/RecoverEmail";
import VerificationCode from "./components/VerificationCode/VerificationCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import Password from "./components/Password/Password";

const query = new QueryClient();

 const router = createBrowserRouter([{
   path:'', element:<Layout/> , children:[
   {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
   {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>}, 
   {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
   {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
   {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
   {path:'payment', element:<ProtectedRoute><Payment/></ProtectedRoute>},
   {path:'allorders', element:<ProtectedRoute><Orders/></ProtectedRoute>},
   {path:'recoveremail', element:<RecoverEmail/>},
   {path:'resetpassword', element:<ResetPassword/>},
   {path:'verificationcode', element:<VerificationCode/>},
   {path:'wishlist', element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
   {path:'changepassword', element:<ProtectedRoute><Password/></ProtectedRoute>},
   {path:'personalInformation', element:<ProtectedRoute><PersonalInformation/></ProtectedRoute>},
   {path:'productscategory/:categoryname', element:<ProtectedRoute><ProductsCategory/></ProtectedRoute>},
   {path:'productdetails/:id/:categoryname', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
   {path:'register', element:<Register/>},
   {path:'login', element:<Login/>},
   {path:'*', element:<ErrorPage/>},
  ]
}])


export default function App(){
            
  
  return <>
         <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <ProfileContextProvider>
            <WishlistContextProvider>      
     <RouterProvider router={router}/> 
       <Toaster/>
            </WishlistContextProvider>
          </ProfileContextProvider>
        </CartContextProvider>
     <ReactQueryDevtools/>
      </UserContextProvider>
      </QueryClientProvider> 
  
     </>
}