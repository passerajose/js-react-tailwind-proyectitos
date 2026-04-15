import React from "react";

import Navbar from "../../features/home/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen gap-0">
      <Navbar />
      <Outlet />{" "}
      {/* cambia según /home, /feature-1, etc., Navbar siempre aparece */}
    </div>
  );
};

export default MainLayout;
