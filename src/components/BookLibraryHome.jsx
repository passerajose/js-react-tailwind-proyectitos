import React, { useState } from "react";
import BookLibraryNavbar from "./BookLibraryNavbar";
import { BookCard } from "./BookCard";
import { useBooks } from "../context/BookContext";
import { Dialog } from "primereact/dialog";

const BookLibraryHome = ({ showMessage }) => {
  const { bookList } = useBooks(); // se hace el import en main.jsx
  const [openModal, setOpenModal] = useState(false);
  const [currentBookModal, setCurrentBookModal] = useState({});
  return (
    <div className="flex flex-col">
      <BookLibraryNavbar />
      {bookList.length > 0 ? (
        <>
          <div className="grid grid-cols-6 gap-3 p-15 mx-10 w-auto">
            {bookList.map((b) => (
              <BookCard
                key={b.id}
                book={b}
                setOpenModal={setOpenModal}
                setCurrentBookModal={setCurrentBookModal}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center p-15">
          <p className="text-xl text-gray-400 font-light italic">
            No books listed
          </p>
        </div>
      )}
      {openModal && currentBookModal && (
        <Dialog
          header={currentBookModal.title}
          visible={openModal}
          position="right"
          style={{ width: "50vw" }}
          onHide={() => {
            if (!openModal) return;
            setOpenModal(false);
          }}
          // footer={footerContent}
          draggable={false}
          resizable={false}
        >
          <div className="flex flex-row gap-8">
            <img
              src={currentBookModal.cover}
              width={400}
              height={500}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-5">
              <p>
                <b>Title</b>
                <br />
                {currentBookModal.title}
              </p>
              <p>
                <b>Author</b>
                <br />
                {currentBookModal.author}
              </p>
              <p>
                <b>Introduction</b>
                <br />
                {currentBookModal.intro}
              </p>
              <p>
                <b>Completed</b>
                <br />
                {currentBookModal.completed}
              </p>
              <p>
                <b>Review</b>
                <br />
                {currentBookModal.review}
              </p>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default BookLibraryHome;
