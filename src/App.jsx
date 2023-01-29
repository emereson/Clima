import axios from 'axios'
import { useEffect,useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat : pos.coords.latitude,
        lon : pos.coords.longitude
      }
      setCoords(obj);
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

useEffect(() => {
    if(coords){
      const APIKey = 'd993d119ca66d0a611399e0a7acadf4a'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit:((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }
          setTemperature(obj)
        })
        .catch(err => console.log(err))
        .finally(() =>setisLoading(false))
    }
  }, [coords])
  

  console.log(weather);

  return (
    <div className="App">
      {
        isLoading ?
        <nav class="loader">
        <div class="preLoader">
            <samp class="loading">Loading ...</samp>
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        </div>
    </nav> 
        :
      <WeatherCard 
      weather={weather}
      temperature = {temperature}
    />
      }
    </div>
  )
}

export default App
