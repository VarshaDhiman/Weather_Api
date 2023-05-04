import { useState } from 'react';
import Search from './components/search/search';
import CurrentWeather from "./components/current_weather/current_weather";
import Forecast from './components/forecast/forecast';
import { WEATHER_API_KEY,WEATHER_API_URL } from "./api";
import './App.css';

function App() {
  const [currentWeather , setCurrenetWeather ] = useState(null);
  const [forecast , setForecast] = useState(null);
  const handleOnSearchChange = (searchData) =>{
    const [lat , lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units= metric`
    );
    const forecastFetch = fetch (
      `${WEATHER_API_URL}/forecast?lat =${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units = metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async(response) =>{
      const  weatherResponse = await response[0].json();
      const forecastResponse = await response[0].json();
      
      setCurrenetWeather({city: searchData.label, ...weatherResponse});
      setForecast ({ city: searchData.label, ...forecastResponse});
    })
    .catch(console.log);

  }
  return ( 
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      
    </div>
  );
}

export default App;
