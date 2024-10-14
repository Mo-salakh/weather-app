import { useEffect, useState } from 'react';
import WeatherList from './WeatherList';
import WeatherDate from './WeatherDate';
import WeatherMain from './WeatherMain';
import WeatherAirInfo from './WeatherAirInfo';

function WeatherInfo(props) {
  const { weatherData, weatherDaysData } = props;
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [isDay, setDay] = useState(true);
  const { dt, timezone } = weatherData;



  useEffect(() => {
    const currentTime = new Date(dt * 1000 + timezone * 1000);
    const currentDate = new Date(dt * 1000);
    setTime(currentTime);
    setDate(currentDate);
  }, [dt, timezone])



  const formattedTime = time ? new Date(time).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }) : '';
  
  const formattedDate = date ? new Date(date).toLocaleDateString('ru-Ru', {
    timeZone: 'UTC'
  }) : ''

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
  

  if (!weatherData) {
    return (
      <h1 className="weather_title" style={{'marginLeft': '0.9375rem','fontSize': '48px',transform: 'translate(50%, -50%}' }}>
        Загрузка...
      </h1>
    );
  }

  

  return (
    <div className="weather_content">
      
      <WeatherMain weatherData={weatherData} isDay={isDay} />
      <WeatherDate formattedTime={formattedTime} formattedDate={formattedDate} />
      <WeatherAirInfo weatherData={weatherData} />
      <WeatherList weatherDaysData={weatherDaysData} />
      
    </div>
  );
}

export { WeatherInfo }