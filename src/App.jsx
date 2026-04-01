import { useCallback, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { Toast } from "primereact/toast";
import Home from "./components/Home";
import Pomodoro from "./components/Pomodoro";
import Weather from "./components/Weather";
import EmojiSelector from "./components/EmojiSelector";
import BookLibraryCreate from "./components/BookLibraryCreate";
import BookLibraryHome from "./components/BookLibraryHome";

function App() {
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
    <>
      <Toast ref={toast} />
      <Routes element={<Home />}>
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
      </Routes>
    </>
  );
}

export default App;
