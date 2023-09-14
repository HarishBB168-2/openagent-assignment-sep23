import httpService from "./httpService";
import { CustomDate } from "./utils";

const apiKey = "012be93ad79d7e8e145fb7d7569f191f";
const apiKeyDirect = "439d4b804bc8187953eb36d2a8c26a02";

const baseUrl = "https://api.openweathermap.org/";
const baseUrlDirect = "https://openweathermap.org/";

const geoCodingUrl = baseUrl + `geo/1.0/direct?limit=20&appid=${apiKey}&q=`;
const weatherDataUrl = (lat: string, lon: string) =>
  baseUrl +
  `data/2.5/weather?units=metric&appid=${apiKey}&lat=${lat}&lon=${lon}`;

const forecastDataUrl = (lat: string, lon: string) =>
  baseUrl +
  `/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;

const forecastDataUrlDirect = (lat: string, lon: string) =>
  baseUrlDirect +
  `data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${apiKeyDirect}`;

const iconToSky: any = {
  "01": "clear_sky",
  "02": "few_clouds",
  "03": "scattered_clouds",
  "04": "broken_clouds",
  "09": "shower_rain",
  "10": "rain", // prettier-ignore
  "11": "thunderstorm", // prettier-ignore
  "13": "snow", // prettier-ignore
  "50": "mist", // prettier-ignore
};

const getSkyFromIcon = (icon: string) => {
  return iconToSky[icon.slice(0, 2)];
};

const getLatLongForLocation = async (
  location: string
): Promise<{ lat: string; lon: string } | null> => {
  const url = geoCodingUrl + location + ",in";
  const { data } = await httpService.get(url);
  if (data) return { lat: data[0].lat, lon: data[0].lon };
  else throw new Error("No lat long data found for location : " + location);
};

const getDate = () => {
  const date = new CustomDate();
  return `${date.getMonthName().slice(0, 3)}, ${date.getDate()}`;
};

const parseWeatherDataFromApi = (data: any, forecastData) => {
  return {
    location: data.name,
    weatherToday: "day_clouded",
    temperature: parseInt(data.main.temp),
    temperatureMin: parseInt(data.main.temp_max),
    temperatureMax: parseInt(data.main.temp_min),
    rain: forecastData.rain,
    humidiy: data.main.humidity + "%",
    windSpeed: data.wind.speed + " m/s",
    date: getDate(),
    todayHourlyStats: forecastData.todayHourlyStats,
    weekForecast: forecastData.weekForecast,
  };
};

const parseForecastDataFromApi = (forecastData, forecastDataDirect) => {
  return {
    rain: (forecastData.list[0].pop * 100).toFixed(0).toString() + "%",
    todayHourlyStats: forecastData.list.slice(0, 4).map((item) => ({
      time: new CustomDate(item.dt * 1000).getHoursMinutes(),
      temperature: parseInt(item.main.temp),
      weather: getSkyFromIcon(item.weather[0].icon),
    })),
    weekForecast: forecastDataDirect.daily.slice(1).map((item) => ({
      day: new CustomDate(item.dt * 1000).getWeekdayName(),
      weather: getSkyFromIcon(item.weather[0].icon),
      temperatureMin: parseInt(item.temp.min),
      temperatureMax: parseInt(item.temp.max),
    })),
  };
};

const getWeatherForCity = async (city, latLon = null) => {
  if (!latLon) latLon = await getLatLongForLocation(city);

  let { data: forecastData } = await httpService.get(
    forecastDataUrl(latLon.lat, latLon.lon)
  );

  let { data: forecastDataDirect } = await httpService.get(
    forecastDataUrlDirect(latLon.lat, latLon.lon)
  );

  forecastData = parseForecastDataFromApi(forecastData, forecastDataDirect);

  const { data } = await httpService.get(
    weatherDataUrl(latLon.lat, latLon.lon)
  );
  return parseWeatherDataFromApi(data, forecastData);
};

const getCitiesList = () => {
  return ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru"];
};

const getLocationListFor = async (query: string) => {
  const url = geoCodingUrl + query;
  const { data } = await httpService.get(url);

  const fData = data.map((i, idx: number) => ({
    location: `${i.name}, ${i.country}`,
    lat: i.lat,
    lon: i.lon,
  }));
  return fData;
};

export default {
  getCitiesList,
  getLocationListFor,
  getWeatherForCity,
};
