import React, { useState } from "react";
import ModalDialogButton from "./ModalDialogButton";

// Se podría hacer con lazy rendering también, pero no vale la pena porque el contenido del componente es muy poco. Si fuese el contenido del modal, por ejemplo, un
// formulario largo, entonces sí valdría la pena utilizar lady rendering para que se descargue y renderice el contenido del componente sólo cuando se necesite el componente
// Explico el lazy rendendring en mi vault de obsidian

const ModalHome = ({ showMessage }) => {
  const [modalData, setModalData] = useState({
    header: "Titulo",
    content: "Contenido",
  });
  return (
    <div className="grid grid-cols-1 justify-center items-center place-items-start p-10">
      <ModalDialogButton modalData={modalData} title={"Show"} />
    </div>
  );
};

export default ModalHome;
