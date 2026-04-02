import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const BookLibraryNavbar = () => {
  return (
    <nav className="grid grid-cols-3 items-center bg-gray-600 text-xl font-medium p-4 w-full text-white">
      <Link className="flex items-center gap-2" to={"/"}>
        <IoArrowBack />
        <p>App Home</p>
      </Link>
      <div className="flex gap-5 justify-center">
        <Link to={"/book-library/home"}>Home</Link>
        <Link to={"/book-library/create"}>Create</Link>
      </div>
      <div className="hidden md:block"></div>
    </nav>
  );
};

export default BookLibraryNavbar;
