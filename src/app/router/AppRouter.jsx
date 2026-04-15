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
import ModalHome from "../../features/modal-dialog/ModalHome.jsx";
import { NativeModal } from "../../features/native-modal/components/NativeModal.jsx";
import { NativeModalHome } from "../../features/native-modal/components/NativeModalHome.jsx";
import { AcortadorUrl } from "../../features/acortador-url/components/AcortadorUrl.jsx";
import { RedirectUrl } from "../../features/acortador-url/components/RedirectUrl.jsx";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/acortador-url/:id/:code"
            element={<RedirectUrl showMessage={showMessage} />}
          />
          <Route element={<MainLayout />}>
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
            <Route
              path="/search-box-filter"
              element={<SearchBoxFilter showMessage={showMessage} />}
            />
            <Route
              path="/modal-dialog"
              element={<ModalHome showMessage={showMessage} />}
            />
            <Route
              path="/native-modal"
              element={<NativeModalHome showMessage={showMessage} />}
            />
            <Route
              path="/acortador-url"
              element={<AcortadorUrl showMessage={showMessage} />}
            />
          </Route>
        </Routes>
      </BookProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
