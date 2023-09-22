import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import weatherService from "../../services/weatherService";
import { Typeahead } from "react-bootstrap-typeahead";
import "../../assets/css/typeahead-bootstrap.css";

const useStyles = createUseStyles({
  weekForecast: {
    width: "100%",
    maxWidth: "100%",
    padding: "1.2rem 1.4rem 1.6rem",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
  },
  forecastHeader: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "1.8rem",
  },
  forecastHeaderLabel: {
    fontSize: "2rem",
    fontWeight: 700,
    width: "100%",
    textAlign: "center",
  },
  forecastDay: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "1.4rem 0",
  },
  forecastDayName: {
    width: "8.3rem",
  },
  forecastTemperature: {
    display: "flex",
    columnGap: "1rem",
  },
  weatherIcon: {
    fontSize: "2rem",
  },
  temperature: {
    fontWeight: "600",
    fontSize: "2rem",
  },
  autocomplete: {
    background: "white",
    color: "black",
    "& .rbt-menu": {
      background: "rgba(255,255,255)",
    },
    border: "1px solid black",
    width: "100%",
  },
  loadingIcon: {
    fontSize: "2rem",
  },
});

// Api weather to weather font map
const weatherApiToFont: { [key: string]: JSX.Element } = {
  day_clouded: <i className="wi wi-day-cloudy"></i>,
  clouded: <i className="wi wi-cloud"></i>,
  night_clouded: <i className="wi wi-night-alt-cloudy"></i>,
  rainy: <i className="wi wi-rain"></i>,
  day_lightening: <i className="wi wi-day-lightning"></i>,
  day_showers: <i className="wi wi-day-showers"></i>,

  clear_sky: <i className="wi wi-day-sunny"></i>,
  few_clouds: <i className="wi wi-day-cloudy"></i>,
  scattered_clouds: <i className="wi wi-cloud"></i>,
  broken_clouds: <i className="wi wi-day-cloudy"></i>,
  shower_rain: <i className="wi wi-showers"></i>,
  rain: <i className="wi wi-day-rain"></i>,
  thunderstorm: <i className="wi wi-day-lightning"></i>,
  snow: <i className="wi wi-snowflake-cold"></i>,
  mist: <i className="wi wi-fog"></i>,
};

const DEFAULT_CITY = "DELHI";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<any>();
  const [locationsAutoComplete, setLocationsAutoComplete] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const loadFirstCityData = async () => {
      const data = await weatherService.getLocationListFor(DEFAULT_CITY);
      const city = data[0];
      loadDataForCity(city.location, { lat: city.lat, lon: city.lon });
      console.log("city :>> ", city);
    };
    loadFirstCityData();
  }, []);

  const loadDataForCity = async (city: any, latLon: any) => {
    setLocationName(city);
    setIsLoading(true);
    const weather = await weatherService.getWeatherForCity(city, latLon);
    setWeatherData(weather);
    console.log("weather :>> ", weather);
    setIsLoading(false);
    setIsSearchActive(false);
  };

  const handleLocationChange = async (location: any) => {
    if (location.length > 0) {
      const city = location[0];
      loadDataForCity(city.location, { lat: city.lat, lon: city.lon });
    }
  };

  const handleLocationInputChange = async (value: string) => {
    if (value) {
      const data = await weatherService.getLocationListFor(value);
      setLocationsAutoComplete(data);
    }
  };

  const classes = useStyles();
  if (!weatherData) return <div>Fetching...</div>;
  return (
    <div className={classes.weekForecast}>
      <div className={classes.forecastHeader}>
        {isSearchActive && (
          <Typeahead
            id="location"
            options={locationsAutoComplete}
            labelKey="location"
            placeholder="Search for a location..."
            onChange={handleLocationChange}
            onInputChange={handleLocationInputChange}
            className={classes.autocomplete}
          />
        )}
        {!isSearchActive && (
          <span
            className={classes.forecastHeaderLabel}
            onClick={() => setIsSearchActive(true)}
          >
            {locationName}
          </span>
        )}
        {isLoading && (
          <span className={classes.loadingIcon}>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          </span>
        )}
        {!isLoading && (
          <>
            <div className={classes.weatherIcon}>
              {weatherApiToFont[weatherData.weatherToday]}
            </div>
            <span className={classes.temperature}>
              {weatherData.temperature}º
            </span>
          </>
        )}
      </div>
      <div className="wa_weekForecast_list">
        {weatherData.weekForecast.map((item: any, idx: number) => (
          <div key={idx} className={classes.forecastDay}>
            <span className={classes.forecastDayName}>{item.day}</span>
            <span className="wa_weekForecast_weather">
              {weatherApiToFont[item.weather]}
            </span>
            <span className={classes.forecastTemperature}>
              <span className="wa_weekForecast_tempMax">
                {item.temperatureMax}ºc
              </span>
              <span className="wa_weekForecast_tempMin">
                {item.temperatureMin}ºc
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
