// porque estoy usando vite es import.meta.env.VITE_... (en el .env declarado)
const apiKeyCity = import.meta.env.VITE_WEATHER_KEY;

export default async function getWeather(city) {
  try {
    const geoCodeCity = await getGeocodingCountry(city);

    if (!geoCodeCity || geoCodeCity.length === 0) {
      throw new Error(`City credentials not found`);
    }

    const { lat, lon } = geoCodeCity[0];
    // console.log(lat, lon);
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyCity}`;
    const response = await fetch(API_URL);

    if (!response) {
      throw new Error(`City not found:  ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error("Error fetching weather data: ", e);
  }
}

// Obtener lat y lon a partir del nombre de la ciudad
export async function getGeocodingCountry(cityName) {
  const limitCountriesResponse = 1; // quiero la coincidencia más exacta
  const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limitCountriesResponse}&appid=${apiKeyCity}`;
  try {
    const response = await fetch(API_URL);
    if (!response) {
      throw new Error(`Geocoding error:  ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (e) {
    throw new Error("Error retrieving coordinates: ", e);
  }
}
