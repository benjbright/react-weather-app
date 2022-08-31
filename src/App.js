import { useState } from "react"
import "./App.css"
import Search from "./components/search/Search"
import CurrentWeather from "./components/current-weather/CurrentWeather"
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api"

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
    const [lat, lon] = searchData.value.split(" ")
    console.log(lat, lon)

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    )
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    )

    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json()
      const forecastResponse = await response[1].json()

      setCurrentWeather(weatherResponse)
      setForecast(forecastResponse)
    })
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
  )
}

export default App
