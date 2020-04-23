import React, { useState } from 'react';

const api = {
  key: "8ab7982656d9c2c93296f02ac3f36a0f",
  base: "https://api.openweathermap.org/data/2.5/"
}
export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = () => {
    let d = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  
  const getTime = () => {
    let d = new Date()
    let h = d.getHours()
    return h
  }

  return (

<div id="app">
  
<main className={getTime() > 7 ? 'night' : ''}>
<div className="search-box">
  <input type="text" 
  name="search" 
  className="search-bar" 
  placeholder="Enter a place..."
  onChange={e => setQuery(e.target.value)}
  value={query}
  onKeyPress={search}
   />
</div>
{(typeof weather.main != "undefined") ? (
        <div>
<div className="weather-holder">
  <div className="location">{weather.name}</div>
  <div className="date"> {dateBuilder()}</div>
  <div className="temperature">{Math.round(weather.main.temp)}°C</div>
 <div className="temperature-sub">
 {Math.round(weather.main.temp_min)} Min.-°C 
   | 
   {Math.round(weather.main.temp_max)} Max.-°C
 </div>
<div className="conditions">{weather.weather[0].description}</div>
</div>
</div>
) : ('')}
</main>
</div>
  );
}
