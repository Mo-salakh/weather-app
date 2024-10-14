export default function WeatherDate(props) {

    const {formattedTime, formattedDate} = props
    const dayNames = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота',];
    const dayOfWeek = new Date().getDay();
    

    return (
        <div className="weather_date">
        <p>
          {formattedDate}
        </p>
        <pre>
          {dayNames[dayOfWeek]} | {formattedTime}
        </pre>
      </div>
    )
}