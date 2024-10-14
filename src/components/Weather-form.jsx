import mapI from '../img/map-i.png'
import searchI from '../img/search-i.png'
import timeI from '../img/time-i.png'
import aitI from '../img/circle.png'
import { useEffect, useState } from 'react'

function WeatherForm(props) {
    const { getCurrentCityWeather, weatherData} = props
    const [value, setValue] = useState('')
    const currentData = weatherData;
    const { citySunRise, citySunSet, timezone, visibility, name } = currentData

    useEffect(() => {
        setValue(name)
    }, [name])

    if(!currentData) {
        return (
            <h1 className="weather_title" style={{'marginLeft': '0.9375rem','fontSize': '48px',transform: 'translate(50%, -50%}' }}>
              Загрузка...
            </h1>
        );
    }

    const formattedRiseTime = new Date(citySunRise * 1000 + timezone * 1000).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });

    const formattedSetTime = new Date(citySunSet * 1000 + timezone * 1000).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });
    
   

    function handleClick() {
        getCurrentCityWeather(value)
    }

    function getGoldenTime() {
        const sunrise = citySunRise * 1000 + timezone * 1000;
        const morningGoldenStart = new Date(sunrise - 30 * 60 * 1000);
        const morningGoldenEnd = new Date(sunrise + 60 * 60 * 1000);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };

        return {
            morning: {
                start: morningGoldenStart.toLocaleTimeString('ru-RU', options),
                end: morningGoldenEnd.toLocaleTimeString('ru-RU', options)
            }
        }

    }

    function categorizeVisibility() {
        if (visibility >= 10000) return "Отличная";
        if (visibility >= 5000) return "Хорошая";
        if (visibility >= 2000) return "Умеренная";
        if (visibility >= 1000) return "Плохая";
        return "Очень плохая";
    }

    // function airQualityRating() {
    //     if (airQuality.aqi <= 1) return 'Хороший';
    //     if (airQuality.aqi === 2) return 'Умеренный';
    //     if (airQuality.aqi === 3) return 'пагубный';
    //     if (airQuality.aqi === 4) return 'Вредный';
    //     if (airQuality.aqi >= 5) return 'Опасный';
    // }

    return (
        <div className="weather-f_content">
            <div className='weather_nav'>
                <img src={mapI} alt="location-icon" className='location-i' />
                <input type="text" placeholder='Название города' value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={e => e.key === 'Enter' ? handleClick() : null} />
                <button className='btn-search' onClick={handleClick}><img src={searchI} alt="search-icon" /></button>
            </div>
            <div className="weather_sun">
                <div className="weather_card">
                   <h4>Восход</h4>
                    <div className="weather_time">
                        <img src={timeI} alt="time-icon" className='time-i' />
                        <dl>
                           <dt>{formattedRiseTime}</dt>
                           <dd>{formattedRiseTime}</dd> 
                        </dl>
                    </div>
                </div>
                <div className="weather_card">
                   <h4>Золотое время</h4>
                    <div className="weather_time">
                        <img src={timeI} alt="time-icon" className='time-i' />
                        <dl>
                           <dt>{getGoldenTime().morning.start}</dt>
                           <dd>{getGoldenTime().morning.end}</dd> 
                        </dl>
                    </div>
                </div>
                <div className="weather_card">
                   <h4>Закат</h4>
                    <div className="weather_time">
                        <img src={timeI} alt="time-icon" className='time-i' />
                        <dl>
                           <dt>{formattedSetTime}</dt>
                           <dd>{formattedSetTime}</dd> 
                        </dl>
                    </div>
                </div>
            </div>
            <hr /> <span>i</span>
            <div className="weather_air">
                <div className="air_info">
                    <h5 className='air_title'>Качество воздуха</h5>
                    <img src={aitI} alt="air-info-i" className='air_img' />
                    <dl>
                        <dd>1/5</dd>
                        <dt>хороший</dt>
                    </dl>
                </div>
                <div className="air_info">
                    <h5 className='air_title'>Видимость</h5>
                    <img src={aitI} alt="air-info-i" className='air_img' />
                    <dl>
                        <dd>{visibility / 1000} km</dd>
                        <dt>{categorizeVisibility()}</dt>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export {  WeatherForm }