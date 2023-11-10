import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [weatherData, setWeatherData] = useState();

  const getWeather = async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=37.5101776&lon=127.1220981&appid=c23ac157367173e0b9ea81cc4288a2a3"
    );

    setWeatherData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="bg-red-100">
      {weatherData ? (
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        />
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
