import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const BookContext = createContext();
export const BookProvider = ({ children }) => {
  const isMounted = useRef(false);

  // inicializar el estado con lo guardado en localstorage si es que hay algo guardado, si no, se pone []
  const [bookList, setBookList] = useState(() => {
    const savedBooks = localStorage.getItem("bookListSaved");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  // actualizar lo guardado en localstorage cada vez que se actualiza bookList
  useEffect(() => {
    localStorage.setItem("bookListSaved", JSON.stringify(bookList));
  }, [bookList]);

  const addBook = (newBook) => {
    setBookList([...bookList, newBook]);
  };
  return (
    <BookContext.Provider value={{ bookList, addBook }}>
      {children}
    </BookContext.Provider>
  );
};

// hook personalizado para usar el contexto fácilmente -> quiero usarlo en BookLibraryCreate.jsx y BookLibraryHome.jsx
export const useBooks = () => useContext(BookContext);
