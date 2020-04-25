import React from 'react'

const Weather = ({ weather, city }) => {
  console.log(weather)
  if (!weather) {
    return null
  }

  const style = {
    width: '100px',
    height: '100px'
  }
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p><b>temperature: </b>{weather.temperature} Celius</p>
      <img 
        src={weather.weather_icons[0]}
        alt={weather.weather_descriptions[0]}
        style={style}
      />
      <p><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather