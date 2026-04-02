import React from "react";

export const BookCard = ({ book, setOpenModal, setCurrentBookModal }) => {
  const handleClick = () => {
    setCurrentBookModal(book);
    setOpenModal(true);
  };
  return (
    <div
      className="flex flex-col gap-2 p-5 rounded-xl hover:bg-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="rounded-xl"
        src={book.cover}
        width={"300"}
        height={"400"}
      ></img>
      <div className="flex justify-center">{book.title}</div>
    </div>
  );
};
