import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

const ModalDialogButton = ({ modalData, title }) => {
  console.log(modalData);
  const [visible, setVisible] = useState(false);

  return (
    <div className="">
      <button
        icon="pi pi-external-link"
        className="border rounded-md px-5 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => setVisible(true)}
      >
        {title}
      </button>
      <Dialog
        header={modalData?.header}
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <p className="m-0">{modalData?.content}</p>
      </Dialog>
    </div>
  );
};

export default ModalDialogButton;
