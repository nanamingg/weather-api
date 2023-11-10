import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";

const weatherIcon = {
  "01": {
    textColor: "text-red-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  "02": {
    textColor: "text-orang-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  "03": {
    textColor: "text-gray-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  "04": {
    textColor: "text-gray-700",
    icon: <MdOutlineWbSunny size={120} />,
  },
  "09": {
    textColor: "text-red-200",
    icon: <MdOutlineWbSunny size={120} />,
  },
  10: {
    textColor: "text-blue-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  11: {
    textColor: "text-cyan-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  13: {
    textColor: "text-green-300",
    icon: <MdOutlineWbSunny size={120} />,
  },
  50: {
    textColor: "text-brown-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
};

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f9cd232dbbb4ca1f4cf80eb8468af216&units=metric`
    );

    setWeatherData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;

    getWeather();
  }, [latitude, longitude]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-2xl">
      {weatherData ? (
        <div
          className={`flex flex-col items-center gap-8 ${
            weatherIcon[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div>
            {weatherData.name}, {weatherData.main.temp}
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
