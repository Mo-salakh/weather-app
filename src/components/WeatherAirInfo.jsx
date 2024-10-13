import humIcon from '../img/hum.png';
import windI from '../img/wind.png';

export default function WeatherAirInfo(props) {
    const {weatherData} = props
    const { cityWind, cityMain } = weatherData

    return (
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
                  src={humIcon}
                  alt="Humidity"
                  className="hum-i"
                />
                Влажность
              </p>
              <span>{cityMain.humidity} %</span>
            </div>
        </div>
    )
}