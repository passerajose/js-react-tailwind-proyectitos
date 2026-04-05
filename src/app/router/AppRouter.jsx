import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { useCallback, useRef } from "react";
import { Toast } from "primereact/toast";

// features
import Home from "../../features/home/components/Home.jsx";
import Pomodoro from "../../features/pomodoro/components/Pomodoro.jsx";
import BookLibraryHome from "../../features/book-library/components/BookLibraryHome.jsx";
import BookLibraryCreate from "../../features/book-library/components/BookLibraryCreate.jsx";
import EmojiSelector from "../../features/emoji-selector/components/EmojiSelector.jsx";
import Weather from "../../features/weather/components/Weather.jsx";
import { BookProvider } from "../../features/book-library/hooks/BookContext.jsx";
import SearchBoxFilter from "../../features/search-box-filter/components/SearchBoxFilter.jsx";

function AppRouter() {
    // Para mensajes Toast
    const toast = useRef(null);
    const showMessage = useCallback((sev, sum, det) => {
    toast.current?.show({
        severity: sev,
        summary: sum,
        detail: det,
        life: 4000,
    });
    }, []);
  return (
    <BrowserRouter>
    <BookProvider>
      <Toast ref={toast} />
      <Routes element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/pomodoro"
          element={<Pomodoro showMessage={showMessage} />}
        />
        <Route
          path="/weather"
          element={<Weather showMessage={showMessage} />}
        />
        <Route
          path="/emoji-selector"
          element={<EmojiSelector showMessage={showMessage} />}
        />
        <Route
          path={"/book-library"}
          element={<BookLibraryHome showMessage={showMessage} />}
        />
        <Route
          path="/book-library/home"
          element={<BookLibraryHome showMessage={showMessage} />}
        />
        <Route
          path="/book-library/create"
          element={<BookLibraryCreate showMessage={showMessage} />}
        />
        <Route path="/search-box-filter" element={<SearchBoxFilter showMessage={showMessage}/>}/>
      </Routes>
      </BookProvider>
    </BrowserRouter>
  );
}

export default AppRouter;