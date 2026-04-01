import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import getWeather from "../scripts/weatherApi";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Weather = ({ showMessage }) => {
  const [cityName, setcityName] = useState("Asunción");
  const [currentCity, setCurrentCity] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null); // Para mover el marcador sin recrear todo

  // Inicialización única del mapa
  useEffect(() => {
    // Solo inicializamos si no existe
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([-25.3, -57.6], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(mapRef.current);
    }

    // Carga inicial de datos
    const loadInitialData = async () => {
      const data = await getWeather("Asunción");
      if (data) {
        updateMap(data);
      }
    };

    loadInitialData();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Función para mover el mapa y el marcador
  const updateMap = (data) => {
    const { lat, lon } = data.coord;

    setCurrentCity(data);

    if (mapRef.current) {
      // Centrar mapa
      mapRef.current.setView([lat, lon], 14);

      // Si ya hay un marcador, quitarlo
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Crear nuevo marcador y guardarlo en ref
      markerRef.current = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(data.name || cityName)
        .openPopup();
    }
  };

  async function handleConfirm() {
    if (!cityName) {
      return showMessage("error", "Campo vacío", "Rellene el campo");
    }
    const data = await getWeather(cityName);
    if (!data) {
      return showMessage(
        "error",
        "Error",
        "No se pudo cargar la ciudad ingresada",
      );
    }
    updateMap(data);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col justify-center items-center gap-3 mt-10 w-[40%]">
        <div className="flex flex-row gap-2 w-full">
          <InputText
            className="flex-1"
            value={cityName}
            placeholder="Ingrese una ciudad"
            onChange={(e) => setcityName(e.target.value)}
            autoFocus
          />
          <Button severity="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-1 text-2xl">
            <p>Ciudad: {currentCity?.name || cityName}</p>
            <p>Temp: {currentCity?.main?.temp ?? "--"}°C</p>
            <p>
              Descripción:{" "}
              {currentCity?.weather?.[0]?.description || "Sin datos"}
            </p>
          </div>

          <div
            id="map"
            className="h-96 w-full border border-gray-300 rounded-lg"
            style={{ minHeight: "400px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
