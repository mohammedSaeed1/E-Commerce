import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="dark:bg-[#1B1B1F] ">
        <div className="h-[80vh]">
          <Navbar />
          <section className="container sm:w-[90%] mx-auto pt-8 ">
            <Outlet />
          </section>
        <Footer />
        </div>
      </div>
    </>
  );
}