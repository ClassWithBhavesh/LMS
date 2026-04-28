import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar visible={true} />

      {/* Yaha content change hoga */}
      <Outlet />

      <Footer />    
    </>
  );
}