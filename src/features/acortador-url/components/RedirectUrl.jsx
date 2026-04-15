import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const RedirectUrl = ({ showMessage }) => {
  const { id, code } = useParams();
  const [urlList, setUrlList] = useState(() => {
    const saved = localStorage.getItem("urlList");
    return saved ? JSON.parse(saved) : [];
  });
  const urlEncontrada = urlList.find((u) => u.id === id);

  useEffect(() => {
    if (urlEncontrada?.url) {
      setTimeout(() => {
        // window.location.href = urlEncontrada.url; // abre en la misma pagina
        window.open(urlEncontrada.url, "_blank"); // abre en una pagina nueva
      }, 1000);
    }
  }, [urlEncontrada]);

  if (!urlEncontrada.url) {
    return <div>URL no encontrada</div>;
  }

  return <div className="m-auto">Redirecting to {urlEncontrada?.url}...</div>;
};
