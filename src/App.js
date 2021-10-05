import './index.css';
import React, { useState } from 'react';

const api = {
  key: "b75439d52a22a727eacd55e3c979e4f4",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('')

  const search = event => {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Dicember'];
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input className='search-bar'
            type='text'
            placeholder="Search..."
            onKeyUp={search}
            onChange={e => setQuery(e.target.value)} />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>

            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>

          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
