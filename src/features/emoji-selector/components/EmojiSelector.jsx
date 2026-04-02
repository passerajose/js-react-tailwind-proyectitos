import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useMemo, useRef, useState } from "react";

const EmojiSelector = ({ showMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ALL_ICONS = [
    { name: "smile", icon: "😀" },
    { name: "alien", icon: "👽" },
    { name: "sad", icon: "😥" },
    { name: "heart", icon: "❤️️" },
  ];
  const [iconName, setIconName] = useState("");
  const [iconSearch, setIconSearch] = useState("");

  const filteredIcons = useMemo(() => {
    return ALL_ICONS.filter((i) =>
      i.name.toLowerCase().includes(iconSearch.toLowerCase()),
    );
  }, [iconSearch]);

  const handleClick = (i) => {
    setIconName((prevTexto) => prevTexto + i.icon); // lo que ya tiene iconName + lo nuevo
  };
  return (
    <div className="flex flex-col w-75 mt-10 ml-10 gap-2">
      <div className="flex flex-row gap-1">
        <InputText
          type="text"
          value={iconName}
          onChange={(e) => setIconName(e.target.value)}
          className="h-10"
          placeholder="Ingrese mensaje"
        />
        <button
          className="bg-transparent cursor-pointer text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          😀
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col bg-black w-full gap-6 p-5 rounded-lg">
          <InputText
            id="inputTexto"
            placeholder="Search"
            className="h-10"
            value={iconSearch}
            onChange={(e) => setIconSearch(e.target.value)}
          />
          <div className="flex flex-row gap-3 mt-2 items-start h-50">
            {/* mapear sobre la lista filtrada */}
            {filteredIcons.map((i) => (
              <button
                className="text-amber-50 cursor-pointer text-4xl"
                key={i.name}
                onClick={() => handleClick(i)}
              >
                {i.icon}
              </button>
            ))}
            {filteredIcons.length === 0 && (
              <span className="text-white">No hay resultados</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
