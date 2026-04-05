import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdOutlineEmojiEmotions } from "react-icons/md";
import { FaBookBible, FaClock } from "react-icons/fa6";
import { SiAccuweather } from "react-icons/si";
import { RiSearchFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-center gap-6 p-4 bg-gray-200 text-xl">
      <div className="flex items-center gap-2">
        <MdHome size={23} />
        <Link to="/home">Home</Link>
      </div>
      <div className="flex items-center gap-2">
        <FaClock size={17} />
        <Link to="/pomodoro">Pomodoro</Link>
      </div>
      <div className="flex items-center gap-2">
        <SiAccuweather size={19} />
        <Link to="/weather">Weather</Link>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineEmojiEmotions size={22} />
        <Link to="/emoji-selector">Emoji Selector</Link>
      </div>
      <div className="flex items-center gap-2">
        <FaBookBible size={19} />
        <Link to="/book-library">Book Library</Link>
      </div>
      <div className="flex items-center gap-2">
        <RiSearchFill size={22} />
        <Link to="/search-box-filter">Search Box Filter</Link>
      </div>
    </div>
  );
};

export default Navbar;
