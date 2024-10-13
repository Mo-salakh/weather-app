import { useEffect, useState } from "react";
import { WeatherInfo } from "./components/Weather-info";
import { WeatherForm } from "./components/Weather-form";
import { API_KEY } from "./config";

function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality ] = useState(null);
  const [weatherDaysData, setWetherDaysData] = useState([])

  useEffect(() => {
    const fetchWeatherByLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
          getAirData(latitude, longitude);
          getDaysData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    };
    
    fetchWeatherByLocation();

  }, []);

  function getDaysData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const dailyData = data.list.filter((item, index) => {
        return index > 7 && (index - 8) % 8 === 0;
      });
      return setWetherDaysData(dailyData);
    })
  }

  const fetchWeatherData = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Weather data response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData({
          nameCity: data.name,
          cityId: data.id,
          cityMain: data.main,
          citySky: data.weather,
          cityWind: data.wind.speed,
          citySunRise: data.sys.sunrise,
          citySunSet: data.sys.sunset,
          dt: data.dt,
          timezone: data.timezone,
          visibility: data.visibility
        })
        setLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setLoading(false);
      });
  };

  const getLatLon = (cityName) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?appid=${API_KEY}&q=${cityName}&limit=1`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const lat = data[0].lat; 
          const lon = data[0].lon;
          fetchWeatherData(lat, lon);
          getAirData(lat, lon);
          getDaysData(lat, lon);
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  const getAirData = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setAirQuality(data.list[0].main))
    .catch(err => console.error(err.name, err.stack))
  }


  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="App">
      <WeatherInfo weatherData={weatherData} weatherDaysData={weatherDaysData} />
      <WeatherForm getCurrentCityWeather={getLatLon} weatherData={weatherData} airQuality={airQuality} />
    </div>
  );

}

export default App;
