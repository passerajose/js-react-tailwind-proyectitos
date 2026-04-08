import React, { use, useEffect, useId, useRef, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const Pomodoro = ({ showMessage }) => {
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editTarea, setEditTarea] = useState("");
  const [tareas, setTareas] = useState([
    // {
    //   id: crypto.randomUUID(),
    //   nombre: "Tarea 1",
    //   isPausedTarea: true,
    // },
    // {
    //   id: crypto.randomUUID(),
    //   nombre: "Tarea 2",
    //   isPausedTarea: true,
    // },
    // {
    //   id: crypto.randomUUID(),
    //   nombre: "Tarea 3",
    //   isPausedTarea: true,
    // },
  ]);
  const [tareaNueva, setTareaNueva] = useState("");

  useEffect(() => {
    let intervalo = null;

    if (!isPaused) {
      intervalo = setInterval(() => {
        if (sec > 0) {
          setSec((s) => s - 1);
        } else if (min > 0) {
          setMin((m) => m - 1);
          setSec(59);
        } else {
          setIsPaused(true);
          clearInterval(intervalo);
          showMessage("info", "¡Tiempo terminado!", "Es hora de un descanso");
        }
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [isPaused, min, sec]);

  const handleStartPause = (id) => {
    setTareas(
      tareas.map((t) => {
        if (t.id === id) {
          const nuevoEstadoPausa = !t.isPausedTarea;

          // Si activamos una tarea, pausamos el resto (opcional) y activamos el timer
          setIsPaused(nuevoEstadoPausa);
          return { ...t, isPausedTarea: nuevoEstadoPausa };
        }
        // Pausamos las demás para que solo una corra a la vez
        return { ...t, isPausedTarea: true };
      }),
    );
  };

  const handleReset = (id) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, isPausedTarea: true } : t)),
    );
    setIsPaused(true);
    setMin(25);
    setSec(0);
  };

  const handleAgregar = () => {
    if (!tareaNueva) {
      return showMessage("error", "Campo vacío", "Complete el campo antes");
    }
    setTareas([
      ...tareas,
      {
        id: crypto.randomUUID(),
        nombre: tareaNueva,
        isPausedTarea: true,
        edit: false,
      },
    ]);
    showMessage(
      "success",
      "Tarea Agregada",
      "Se ha agregado la tarea correctamente",
    );
  };

  const handleDelete = (tareaAEliminar) => {
    if (!tareas.some((t) => t.id === tareaAEliminar.id)) {
      return showMessage(
        "error",
        "No Exite Tarea",
        "La tarea seleccionada no existe",
      );
    }

    setTareas(tareas.filter((t) => t.id !== tareaAEliminar.id));

    return showMessage(
      "success",
      "Operación Exitosa",
      "Se ha eliminado la tarea correctamente",
    );
  };

  const habilitarEdit = (tarea) => {
    setEditTarea(tarea.nombre);
    // Asignar a la tarea en custrión edit = true y a las demás edit = false
    setTareas(
      tareas.map((t) =>
        t.id === tarea.id ? { ...t, edit: true } : { ...t, edit: false },
      ),
    );
  };

  const handleEdit = (tareaAEditar) => {
    if (!editTarea.trim()) {
      return showMessage("error", "Campo vacío", "Rellene el campo");
    }
    setTareas(
      tareas.map((t) =>
        t.id === tareaAEditar.id ? { ...t, nombre: editTarea, edit: false } : t,
      ),
    );
    return showMessage(
      "success",
      "Operacion Exitosa",
      "Se ha cambiado el nombre correctamente",
    );
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-5 font-bold">
      <div className="flex flex-col gap-5 min-w-[30%]">
        {sec !== 0 ? (
          <h1 className="flex flex-row justify-center text-8xl mb-5 mt-5">
            {min} : {sec}
          </h1>
        ) : (
          <h1 className="flex flex-row justify-center text-8xl mb-5 mt-5">
            {min} : {sec}0
          </h1>
        )}

        <div className="flex flex-row justify-start gap-2 w-full">
          <InputText
            className="flex-1"
            value={tareaNueva}
            placeholder="Tarea nueva"
            onChange={(e) => setTareaNueva(e.target.value)}
          />
          <Button onClick={handleAgregar}>Agregar</Button>
        </div>

        {tareas.length > 0 && (
          <div className="flex flex-col gap-3 w-100% p-3 border rounded-md border-gray-300">
            {tareas.map((t) => (
              <div key={t.id} className="flex flex-row justify-between gap-2">
                {!t.edit ? (
                  <>
                    <p className="font-normal text-lg">
                      {tareas.indexOf(t) + 1}. {t.nombre}
                    </p>
                    <div className="flex flex-row gap-4">
                      {!t.isPausedTarea ? (
                        <>
                          <button onClick={() => handleReset(t.id)}>
                            <i className="pi pi-replay cursor-pointer text-blue-500"></i>
                          </button>
                          <button onClick={() => handleStartPause(t.id)}>
                            <i className="pi pi-pause cursor-pointer text-yellow-600"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleStartPause(t.id)}>
                            <i className="pi pi-caret-right cursor-pointer text-green-600 text-2xl"></i>
                          </button>
                          <button onClick={() => habilitarEdit(t)}>
                            <i className="pi pi-pencil cursor-pointer"></i>
                          </button>
                        </>
                      )}

                      <button onClick={() => handleDelete(t)}>
                        <i className="pi pi-trash cursor-pointer hover:text-red-500"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row gap-2 w-full">
                    <InputText
                      className="flex-1 max-h-10"
                      value={editTarea}
                      placeholder="Tarea nueva"
                      onChange={(e) => setEditTarea(e.target.value)}
                      autoFocus // para que se autoseleccione
                    />
                    <Button
                      className="max-h-10"
                      severity="success"
                      onClick={() => handleEdit(t)}
                    >
                      Confirmar
                    </Button>
                    <Button
                      className="max-h-10"
                      severity="secondary"
                      onClick={() =>
                        setTareas(tareas.map((t) => ({ ...t, edit: false })))
                      }
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
