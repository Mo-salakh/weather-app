import { useEffect, useState } from 'react';
import WeatherList from './WeatherList';
import WeatherDate from './WeatherDate';
import WeatherMain from './WeatherMain';
import WeatherAirInfo from './WeatherAirInfo';

function WeatherInfo(props) {
  const { weatherData, weatherDaysData } = props;
  const currentData = weatherData;

  const [time, setTime] = useState(null)
  const [isDay, setDay] = useState(true);





  // ------------------ UseEffects >>>

  // ОБНОВЛЕНИЕ ВРЕМЕНИ ЧЕРЕЗ 1 МИНУТУ
  useEffect(() => {
    const updateLocalTime = () => {
        const currentTime = new Date();
        setTime(currentTime);
    };
    updateLocalTime();
    setInterval(updateLocalTime, 60000);
  }, [weatherData]);
  const formattedTime = time ? new Date(time).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }) : '';

  //ЯВЛЯЕТСЯ ЛИ СЕЙЧАС ДЕНЬ ИЛИ НОЧЬ
  useEffect(() => {
    if (formattedTime) {
      const [hours] = formattedTime.split(':');
      const numHours = parseInt(hours, 10);
      if (numHours >= 4 && numHours < 20) {
        setDay(true);
      } else {
        setDay(false);
      }
    }
  }, [formattedTime]);
  

  // ------------------ <<< useEffects

  if (!currentData) {
    return (
      <h1 className="weather_title" style={{'marginLeft': '0.9375rem','fontSize': '48px',transform: 'translate(50%, -50%}' }}>
        Загрузка...
      </h1>
    );
  }

  return (
    <div className="weather_content">
      
      <WeatherMain weatherData={weatherData} isDay={isDay} />
      <WeatherDate time={time} />
      <WeatherAirInfo weatherData={weatherData} />
      <WeatherList weatherDaysData={weatherDaysData} />
    </div>
  );
}

export { WeatherInfo }