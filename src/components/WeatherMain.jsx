import clearIcon from '../img/clear-day.png';
import clearIconNight from '../img/clear-night.png';

import cloudsIcon from '../img/clouds.png';
import cloudsOvercastIcon from '../img/clouds-overcast.png';
import cloudBrokenDay from '../img/clouds-broken-day.png';
import cloudBrokenNight from '../img/clouds-broken-night.png';

import rainIconDay from '../img/rain-day.png'
import rainIconNight from '../img/rain-night.png'
import moderateRainDay from '../img/moderateRainDay.png'
import moderateRainNight from '../img/moderateRainNight.png'
import heavyRainDay from '../img/heavyRainDay.png'
import heavyRainNight from '../img/heavyRainNight.png'


import drizzleIconDay from '../img/drizzle-day.png'
import drizzleIconNight from '../img/drizzle-night.png'
import heavyDrizzleDay from '../img/heavyDrizzleDay.png'
import heavyDrizzleNight from '../img/heavyDrizzleNight.png'


import thunderstormIconDay from '../img/thunderstorm-day.png';
import thunderstormIconNight from '../img/thunderstorm-night.png';
import thunderstormRainDay from '../img/thunderstormRainDay.png';
import thunderstormRainNight from '../img/thunderstormRainNight.png';

import snowIcon from '../img/snow-light.png';
import snowIconDay from '../img/snow-day.png';
import snowIconNight from '../img/snow-night.png';
import heavySnowDay from '../img/heavySnowDay.png';
import heavySnowNight from '../img/heavySnowNight.png';


import hazeIconDay from '../img/haze-day.png';
import hazeIconNight from '../img/haze-night.png';

import fogIconDay from '../img/fog-day.png';
import fogIconNight from '../img/fog-night.png';
import { useEffect, useState } from 'react';


export default function WeatherMain(props) {

    const { weatherData, isDay } = props

    const { citySky, cityMain } = weatherData;


    const [currentWeatherIcon, setCurrentWeatherIcon] = useState(null)

    const setWeatherIcon = (weather, description, isDay) => {
        switch(weather) {
          case 'Clear': 
            return isDay ? clearIcon : clearIconNight;
          case 'Clouds':
            switch(description.toLowerCase()) {
              case 'broken clouds':
                return isDay ? cloudsIcon : cloudsIcon;
              case 'overcast clouds':
                return isDay ? cloudsOvercastIcon : cloudsOvercastIcon;
              default:
                return isDay ? cloudBrokenDay : cloudBrokenNight;
            }
          case 'Rain':
            switch(description.toLowerCase()) {
              case 'moderate rain':
                return isDay ? moderateRainDay : moderateRainNight;
              case 'heavy intensity rain':
                return isDay ? heavyRainDay : heavyRainNight;
              default:
                return isDay ? rainIconDay : rainIconNight;
            }
          case 'Drizzle':
            switch(description.toLowerCase()) {
              case 'heavy intensity drizzle':
                return isDay ? heavyDrizzleDay : heavyDrizzleNight;
              default:
                return isDay ? drizzleIconDay : drizzleIconNight;
            }
      
          case 'Thunderstorm':
            switch(description.toLowerCase()) {
              case 'thunderstorm with rain':
                return isDay ? thunderstormRainDay : thunderstormRainNight;
              default:
                return isDay ? thunderstormIconDay : thunderstormIconNight;
            }
      
          case 'Snow':
            switch(description.toLowerCase()) {
              case 'snow':
                return isDay ? snowIcon : snowIcon;
              case 'heavy snow':
                return isDay ? heavySnowDay : heavySnowNight;
              default:
                return isDay ? snowIconDay : snowIconNight;
            }
      
          case 'Haze':
            return isDay ? hazeIconDay : hazeIconNight;
      
          case 'Fog':
            return isDay ? fogIconDay : fogIconNight;
          default:
            return '';
        }
    }

    useEffect(() => {
        if (citySky && citySky.length > 0) {
          const mainWeather = citySky[0].main;
          const weatherDescription = citySky[0].description;
          const icon = setWeatherIcon(mainWeather, weatherDescription, isDay);
          setCurrentWeatherIcon(icon);
        }
      }, [isDay, citySky])

    return (
        <div className="weather_main">
            <img src={currentWeatherIcon} alt="Weather Icon" className="weather_icon"/>
            <h1 className="weather_title">
              {cityMain.temp} <sup>°C</sup>
            </h1>
        </div>
    )
}