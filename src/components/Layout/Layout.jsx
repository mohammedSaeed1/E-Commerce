import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from './../Footer/Footer';


export default function Layout(){
  
return (
    <>
      <Navbar/>
      <section className="container sm:w-[90%] mx-auto pt-8 dark:bg-[#1B1B1F]">
      <Outlet/>
      </section>
     <Footer/>
    
    </>
)


}