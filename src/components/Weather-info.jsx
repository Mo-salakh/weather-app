import { useEffect, useState } from 'react';
import humI from '../img/hum.png';
import rainI from '../img/rain.png';
import windI from '../img/wind.png';
import union from '../img/Union.png';
import clearI from '../img/clear-day.png';
import cloudsI from '../img/clouds-over.png';
import rainIc from '../img/rain-light.png';
import drizzleI from '../img/drizzle-light.png';
import thunderstormI from '../img/thunderstorm.png';
import snowI from '../img/snow-light.png';
import mistI from '../img/mist.png';
import hazeI from '../img/haze.png';
import fogI from '../img/fog.png';
function WeatherInfo(props) {

  const [time, setTime] = useState(null)
  const { weatherData } = props;
  const currentData = weatherData;

  

  useEffect(() => {

    const updateLocalTime = () => {
        const currentTime = new Date();
        setTime(currentTime);
    };

    updateLocalTime();

    setInterval(updateLocalTime, 1000);
   
  }, [weatherData]);
  
  if (!currentData) {
    return (
      <h1 className="weather_title" style={{'marginLeft': '0.9375rem','fontSize': '48px',transform: 'translate(50%, -50%}' }}>
        Загрузка...
      </h1>
    );
  }

  const { citySky, cityMain, cityWind } = currentData;
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const dayNames = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота',];
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedTime = time ? new Date(time).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }) : '';

  function setWeatherIcon() {
    switch (citySky[0].main) {
      case 'Clear':
        return clearI;
      case 'Clouds':
        return cloudsI;
      case 'Rain':
        return rainIc;
      case 'Drizzle':
        return drizzleI;
      case 'Thunderstorm':
        return thunderstormI;
      case 'Snow':
        return snowI;
      case 'Mist':
        return mistI;
      case 'Haze':
        return hazeI;
      case 'Fog':
        return fogI;
      default:
        return '';
    }
  }


  

  return (
    <div className="weather_content">
      <img src={setWeatherIcon()} alt="Weather Icon" className="weather_icon"/>
      <h1 className="weather_title">
        {cityMain.temp} <sup>°C</sup>
      </h1>
      <div className="weather_date">
        <p>
          {day} {month} {year}
        </p>
        <pre>
          {dayNames[dayOfWeek]} | {formattedTime}
        </pre>
      </div>
      <div className="weather_info">
        <div className="weather_wind">
          <p className="wind">
            <img
              src={windI}
              alt="Wind"
              className="wind-i"
            />
            Ветер
          </p>
          <span>{cityWind} km/h</span>
        </div>
        <div className="weather_hum">
          <p className="hum">
            <img
              src={humI}
              alt="Humidity"
              className="hum-i"
            />
            Влажность
          </p>
          <span>{cityMain.humidity} %</span>
        </div>
      </div>
      <ul className="weather_list">
        <li className="weather_item">
          <p>
            24<sup>°c</sup>
          </p>
          <img
            src={union}
            alt="weathet-i"
          />
          <span>Fri</span>
        </li>
        <li className="weather_item">
          <p>
            24<sup>°c</sup>
          </p>
          <img
            src={union}
            alt="weathet-i"
          />
          <span>Sat</span>
        </li>
        <li className="weather_item">
          <p>
            24<sup>°c</sup>
          </p>
          <img
            src={union}
            alt="weathet-i"
          />
          <span>Sun</span>
        </li>
        <li className="weather_item">
          <p>
            24<sup>°c</sup>
          </p>
          <img
            src={union}
            alt="weathet-i"
          />
          <span>Sun</span>
        </li>
        <li className="weather_item">
          <p>
            24<sup>°c</sup>
          </p>
          <img
            src={union}
            alt="weathet-i"
          />
          <span>Sun</span>
        </li>
      </ul>
    </div>
  );
}

export { WeatherInfo }