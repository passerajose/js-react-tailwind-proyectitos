import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdOutlineEmojiEmotions } from "react-icons/md";
import { FaBookBible, FaClock } from "react-icons/fa6";
import { SiAccuweather } from "react-icons/si";
import { RiSearchFill } from "react-icons/ri";
import { SiDialogflow } from "react-icons/si";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-center gap-6 p-4 bg-gray-200 text-xl">
      <div className="flex items-center gap-2">
        <Link className="flex flex-row items-center gap-2" to="/home">
          <MdHome size={23} />
          Home
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link className="flex flex-row items-center gap-2" to="/pomodoro">
          <FaClock size={17} />
          Pomodoro
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link className="flex flex-row items-center gap-2" to="/weather">
          <SiAccuweather size={19} /> Weather
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link className="flex flex-row items-center gap-2" to="/emoji-selector">
          <MdOutlineEmojiEmotions size={22} />
          Emoji Selector
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link className="flex flex-row items-center gap-2" to="/book-library">
          <FaBookBible size={19} />
          Book Library
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          className="flex flex-row items-center gap-2"
          to="/search-box-filter"
        >
          <RiSearchFill size={22} />
          Search Box Filter
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link className="flex flex-row items-center gap-2" to="/modal-dialog">
          <SiDialogflow size={22} /> Modal Dialog
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link className="flex flex-row items-center gap-2" to="/native-modal">
          <SiDialogflow size={22} /> Native Modal
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
