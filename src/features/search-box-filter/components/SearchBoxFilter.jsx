import React, { useEffect, useMemo, useRef, useState } from "react";

const SearchBoxFilter = ({ showMessage }) => {
  const [isSelected, setIsSelected] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchInput, setSearchInput] = useState("all");
  const [activeId, setActiveId] = useState("button_all"); // para estado de botones, toggle o no para bg color

  const results = {
    // caramelos: ["chupetin", "chocolate", "chicle", "bonbon"],
    people: ["carlos", "personas", "ellos"],
    calendar: ["viernes 1", "viernes 2", "jueves 1", "miercoles"],
    emails: [
      "prueba@example.com",
      "gm@gmai.com",
      "prueba123@prueba.com",
      "calos@example.com",
    ],
  };

  // useEffect(() => {
  //   console.log(searchValue);
  //   console.log(filtered);
  // }, [searchValue]);

  useEffect(() => {
    console.log("activeId:", activeId);
  }, [activeId]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = (selection, button_id) => {
    setSearchInput(selection);
    setActiveId((prev) => (prev === button_id ? null : button_id)); // manejo de estado de botón, toggle o no para bg color
  };

  const filtered = useMemo(() => {
    if (searchInput === "all" || searchInput === "") {
      // console.log(Object.values(results).flat()); // sin flat, me daría un array de arrays de strings porque los values del diccionario son arrays de strings
      return Object.values(results)
        .flat()
        .filter((i) => i.toLowerCase().includes(searchValue.toLowerCase())); // retornar todos los valores como tal del diccionario, tendré un array de strings nomas
    } else {
      return results[searchInput].filter((i) =>
        i.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
  }, [searchValue, searchInput]);

  const handleSelect = (selection) => {
    setIsSelected(selection);
  };

  return (
    <div className="flex flex-col gap-0">
      <nav className="flex flex-row p-3 gap-2">
        <button
          onClick={() => handleClick("all", "button_all")}
          className={`px-5 border rounded-md cursor-pointer hover:bg-gray-200 ${activeId === "button_all" ? "bg-gray-200" : "bg-white"}`}
        >
          All
        </button>
        <button
          onClick={() => handleClick("people", "button_people")}
          className={`px-5 border rounded-md cursor-pointer hover:bg-gray-200 ${activeId === "button_people" ? "bg-gray-200" : "bg-white"}`}
        >
          People
        </button>
        <button
          onClick={() => handleClick("calendar", "button_calendar")}
          className={`px-5 border rounded-md cursor-pointer hover:bg-gray-200 ${activeId === "button_calendar" ? "bg-gray-200" : "bg-white"}`}
        >
          Calendar
        </button>
        <button
          onClick={() => handleClick("emails", "button_emails")}
          className={`px-5 border rounded-md cursor-pointer hover:bg-gray-200 ${activeId === "button_emails" ? "bg-gray-200" : "bg-white"}`}
        >
          Emails
        </button>
      </nav>
      <div className="pl-3">
        <p>Your selection: {isSelected}</p>
      </div>
      <div className="grid grid-cols-3">
        <div></div>
        <div className="flex flex-col gap-1">
          <p>{filtered.length} results</p>
          <div className="flex flex-col border rounded-md gap-0">
            <input
              type="text"
              id="input"
              className=" px-4 py-2"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => handleChange(e)}
            />
            {filtered.map((r, i) => (
              <div
                key={i}
                className="py-2 px-4 border-t first:border-t-0 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(r)}
              >
                <span className="font-bold">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBoxFilter;
