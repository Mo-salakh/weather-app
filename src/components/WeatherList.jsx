import { useEffect, useState, useCallback } from "react";
import clearIcon from '../img/clear-day.png';
import cloudsIcon from '../img/clouds.png';
import rainIcon from '../img/rain-light.png';
import drizzleIcon from '../img/drizzle-light.png';
import thunderstormIcon from '../img/thunderstorm.png';
import snowIcon from '../img/snow-light.png';
import hazeIcon from '../img/haze.png';
import fogIcon from '../img/fog.png';

export default function WeatherList(props) {

    const { weatherDaysData } = props;
    const [icons, setIcons] = useState([])

    const getIcon = useCallback((sky) => {
        switch (sky) {
          case 'Clear':
            return clearIcon;
          case 'Clouds':
            return cloudsIcon;
          case 'Rain':
            return rainIcon;
          case 'Drizzle':
            return drizzleIcon;
          case 'Thunderstorm':
            return thunderstormIcon;
          case 'Snow':
            return snowIcon;
          case 'Haze':
            return hazeIcon;
          case 'Fog':
            return fogIcon;
          default:
            return '';
        }
      }, [])


    useEffect(() => {
        const icons = weatherDaysData.map((day, index) => {
            return getIcon(day.weather[0].main)
        })
        setIcons(icons)
    }, [weatherDaysData, getIcon])


    const daysList = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота',];

    function getDayName(day , index) {
        const dayIndex = new Date(day).getDay()
        return daysList[dayIndex]
    }

    return (
        <ul className="weather_list">
        {weatherDaysData.map((day, index) => {
          const dayName = index === 0 ? 'Завтра' : getDayName(day.dt * 1000);

          return (
            <li className="weather_item" key={index}>
            <p>
              {day.main.temp}<sup>°c</sup>
            </p>
            <img src={icons[index]} alt="weathet-i"/>
            <span>{dayName}</span>
            </li>
          )
        } )}
      </ul>
    )
}