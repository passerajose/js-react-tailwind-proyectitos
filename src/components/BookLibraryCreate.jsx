import React, { createContext, useContext, useEffect, useState } from "react";
import BookLibraryNavbar from "./BookLibraryNavbar";
import { InputText } from "primereact/inputtext";
import { LuUpload } from "react-icons/lu";
import { useBooks } from "../context/BookContext";
import { FaCheck } from "react-icons/fa6";

const BookLibraryCreate = ({ showMessage }) => {
  const { bookList, addBook } = useBooks(); // usando custom hook del context BookContext
  const [newBook, setNewBook] = useState({
    id: crypto.randomUUID(),
    title: "",
    author: "",
    cover: "",
    intro: "",
    completed: false,
    review: "",
  });
  useEffect(() => {
    // console.log("newBook: ", newBook);
    console.log("bookList: ", bookList);
  }, [newBook, bookList]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let finalValue;

    if (type === "checkbox") {
      finalValue = checked;
    } else if (type === "file") {
      // se hace esto porque por segurar el navegador no deja acceder directamente a los path de las imagenes, por lo que se usa un URL temporal
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // imageUrl se entiende en un <img src={...} />
        setNewBook({ ...newBook, cover: imageUrl });
      }
      return;
    } else {
      finalValue = value;
    }
    setNewBook({ ...newBook, [name]: finalValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let atr in Object.values(newBook)) {
      if (atr === "") {
        return showMessage("error", "Campo vacío", "Llenar todos los campos");
      }
    }
    addBook(newBook); // usando el context BookContext
    setNewBook({
      id: crypto.randomUUID(),
      title: "",
      author: "",
      cover: "",
      intro: "",
      completed: false,
      review: "",
    }); // reset form
    return showMessage(
      "success",
      "Operación exitosa",
      "Se ha agregado el libro correctamente",
    );
  };

  return (
    <div className="flex flex-col items-center gap-15">
      <BookLibraryNavbar />
      <form
        id="form"
        className="flex flex-col gap-4 w-[20%] text-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            name="title"
            type="text"
            className="h-10.5"
            onChange={handleChange}
            value={newBook.title} // buena práctica que el componente sea controlado. Si no se hace, el input podría no reflejar cambios externos o resetearse correctamente.
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="author">Author</label>
          <InputText
            id="author"
            name="author"
            type="text"
            className="h-10.5"
            onChange={handleChange}
            value={newBook.author}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cover">Cover</label>
          <label htmlFor="cover" className="flex-1 flex-col">
            <div className="leading-none inline-flex flex-row items-center justify-center px-5 h-10 cursor-pointer bg-gray-500 rounded-sm hover:bg-gray-600 text-white">
              {/* <RiUploadLine />     conversiones:   1rem = 16px = 2 | 5 = 20px = 1.25rem | 10 = 40px = 2.5rem | 1.75 = 7px = 0.438rem | px == pr y pl juntos */}

              {!newBook.cover ? (
                <>
                  <LuUpload className="mr-1.75" />
                  <p>Elegir archivo</p>
                </>
              ) : (
                <>
                  <FaCheck className="mr-1.75" />
                  <p>Archivo subido</p>
                </>
              )}
            </div>
            <input
              id="cover"
              name="cover"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex flex-col">
          <label htmlFor="intro">Introduction</label>
          <InputText
            id="intro"
            name="intro"
            type="text"
            className="h-10.5"
            onChange={handleChange}
            value={newBook.intro}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="completed">Completed</label>
          <input id="completed" type="checkbox" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="review">Review</label>
          <InputText
            id="review"
            name="review"
            type="text"
            className="h-10.5"
            onChange={handleChange}
            value={newBook.review}
          />
        </div>
        <button
          className="mt-5 h-10.5 bg-gray-500 hover:bg-gray-600 text-white rounded-md cursor-pointer w-full" // 10.5*4 = 42px (standard minimo es de 42px)
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BookLibraryCreate;
