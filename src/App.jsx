import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import {
  BsFillCloudMoonFill,
  BsCloudyFill,
  BsCloudsFill,
  BsCloudFog2,
} from "react-icons/bs";
import { IoIosRainy } from "react-icons/io";
import { FaCloudSunRain, FaSnowflake } from "react-icons/fa";
import { FiCloudLightning } from "react-icons/fi";

const weatherIcon = {
  "01": {
    textColor: "text-yellow-500",
    icon: <MdOutlineWbSunny size={120} />,
  },
  "02": {
    textColor: "text-orang-500",
    icon: <BsFillCloudMoonFill size={120} />,
  },
  "03": {
    textColor: "text-gray-500",
    icon: <BsCloudyFill size={120} />,
  },
  "04": {
    textColor: "text-green-700",
    icon: <BsCloudsFill size={120} />,
  },
  "09": {
    textColor: "text-red-200",
    icon: <IoIosRainy size={120} />,
  },
  10: {
    textColor: "text-blue-500",
    icon: <FaCloudSunRain size={120} />,
  },
  11: {
    textColor: "text-cyan-500",
    icon: <FiCloudLightning size={120} />,
  },
  13: {
    textColor: "text-green-300",
    icon: <FaSnowflake size={120} />,
  },
  50: {
    textColor: "text-brown-500",
    icon: <BsCloudFog2 size={120} />,
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
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

  useEffect(() => {
    console.log(process.env.REACT_APP_WEATHER_KEY);
  }, []);

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
