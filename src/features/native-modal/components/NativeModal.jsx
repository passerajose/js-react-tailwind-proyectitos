import React, { useReducer, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

export const NativeModal = ({
  showMessage,
  dialogData = { title: "Header", content: "Content" },
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const dialogRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
      dialogRef.current?.close();
    }, 300);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col p-5">
      <button
        commandFor="my-dialog"
        command="show-modal"
        className="border rounded-md px-4 py-2 m-auto hover:bg-gray-100 cursor-pointer"
        onClick={handleOpen}
      >
        Open Modal
      </button>
      <dialog
        id="my-dialog"
        ref={dialogRef}
        className={`rounded-lg w-1/2 h-1/2 m-auto`}
      >
        <div className="flex flex-col p-10 h-full gap-2">
          <div
            id="dialog-header"
            className="flex flex-row justify-center items-center"
          >
            <h2 className="flex-1">{dialogData.title}</h2>
            <button
              commandFor="my-dialog"
              command="close"
              className="hover:opacity-75"
              onClick={handleClose}
            >
              <IoMdClose size={20} />
            </button>
          </div>
          <div id="dialog-content" className="flex flex-col h-full">
            <p>{dialogData?.content || ""}</p>
          </div>
          <div
            id="dialog-footer"
            className="flex flex-row w-full justify-end"
          ></div>
        </div>
      </dialog>
    </div>
  );
};
