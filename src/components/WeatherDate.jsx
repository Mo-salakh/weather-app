

export default function WeatherDate(props) {

    const {time} = props

    const currentDate = new Date();
    const localTime = time ? time.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }) : '';

    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dayNames = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота',];
    const dayOfWeek = currentDate.getDay();
    

    return (
        <div className="weather_date">
        <p>
          {day} {month} {year}
        </p>
        <pre>
          {dayNames[dayOfWeek]} | {localTime}
        </pre>
      </div>
    )
}