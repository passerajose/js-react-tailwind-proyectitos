import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { getrandom } from "../../../shared/utils/actions";
import { IoCloseOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";

export const AcortadorUrl = ({ showMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState("");

  function init() {
    const saved = localStorage.getItem("urlList");
    return saved
      ? JSON.parse(saved)
      : [{ id: "", url: "", shortUrl: "", views: 0 }];
  }

  // state se linkea automáticamente con urlList
  const [urlList, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "ADD":
          console.log(action);
          const newId = crypto.randomUUID();
          // Asegurarnos de que tenga http la url pasada
          const rawUrl = action.data.toString();
          const fullUrl = rawUrl.startsWith("http")
            ? rawUrl
            : "https://" + rawUrl;
          return [
            ...state,
            {
              id: newId,
              url: fullUrl,
              shortUrl:
                "http://localhost:5173/acortador-url/" +
                String(newId) +
                "/" +
                getrandom(),
              views: 0,
            },
          ];
        case "DELETE_BY_ID":
          return state.filter((u) => u.id !== action.id); // filter devuelve un array -> si pongo [] el resultado final quedaría [[]]
        default:
          return state;
      }
    },
    null,
    init,
  );

  useEffect(() => {
    localStorage.setItem("urlList", JSON.stringify(urlList)); // guardar los datos en localStorage
    console.log(urlList);
  }, [urlList]);

  const handleClick = (u) => {
    if (!inputValue) {
      return showMessage("error", "Campo vacío", "Ingrese una URL antes");
    }
    dispatch({ type: "ADD", data: inputValue }); // se ejecuta el reducer
    setInputValue("");
  };

  const handleClickViews = (u) => {
    u.views += 1;
  };

  return (
    <div className="h-full w-full bg-gray-100 align-center flex items-center justify-center">
      <div className="w-3/7 h-3/4 border rounded-lg p-5 flex flex-col gap-3 bg-white">
        <div className="flex flex-row gap-2">
          <input
            type="text"
            placeholder="Type an URL"
            className="flex-1 border rounded-lg p-3"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleClick();
            }}
          />
          <button
            className="border p-3 rounded-lg px-5 cursor-pointer hover:bg-gray-200"
            onClick={handleClick}
          >
            Add URL
          </button>
        </div>
        <div className="flex flex-col gap-2 p-0 overflow-y-auto">
          {urlList.slice(1).map(
            (
              u, // se empieza a mapear desde el indice 1
            ) => (
              <div
                key={u.id}
                className="flex flex-row gap-1 rounded-lg hover:bg-gray-100 p-3 mr-3"
              >
                <div className="flex flex-col">
                  <div className="grid grid-cols-[18%_82%] text-gray-400">
                    <p>URL:</p>
                    <p>{u.url}</p>
                  </div>
                  <div className="grid grid-cols-[18%_82%] text-gray-400">
                    <p>Short URL:</p>
                    <Link
                      to={u.shortUrl}
                      onClick={handleClickViews}
                      className="hover:underline"
                    >
                      {u.shortUrl}
                    </Link>
                  </div>
                  <div className="grid grid-cols-[18%_82%] text-gray-400">
                    <p>Views:</p>
                    <p>{u.views}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => dispatch({ type: "DELETE_BY_ID", id: u.id })}
                  >
                    <FaTrash
                      size={15}
                      className="text-gray-400 hover:text-red-400"
                    />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
