import React from 'react'

const Weather = ({ weather }) => {
  if (weather === null) {
    return null
  }

  const style = {
    width: '100px',
    height: '100px'
  }
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p><b>temperature: </b>{weather.current.temperature} Celius</p>
      <img 
        src={weather.current.weather_icons[0]}
        alt={weather.current.weather_descriptions[0]}
        style={style}
      />
      <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather