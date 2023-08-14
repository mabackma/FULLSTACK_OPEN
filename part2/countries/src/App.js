import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Filter = ({filter, setFilter, setSelectedCountry}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <>
      find countries <input value={filter} onChange={handleFilterChange} />
    </>
  );
}

const Country = ({ country, setSelectedCountry }) => {
  const displayCountry = () => {
    setSelectedCountry(country)
  }

  return (
    <>
      <div>
        {country.name.common}&nbsp;
        <button onClick={displayCountry}>show</button>
      </div>
    </>
  )
}

const Language = ({ language }) => {
  return (
    <li>{language}</li>
  )
}

// List of languages
const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.keys(languages).map(key => (
        <Language key={key} language={languages[key]} />
      ))}
    </ul>
  )
}

// Weather from openweathermap.org
const Weather = ({ country }) => {
  // States for temperature, wind, and weather icon.
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [icon, setIcon] = useState(null)

  // Url for getting weather with API key
  const apiKey = process.env.REACT_APP_API_KEY
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}`

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setTemperature(data.main.temp - 273.15)
        setWind(data.wind['speed'])
        setIcon(`https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [apiUrl])
  
  return (
    <>
      <h2>Weather in {country.capital[0]}</h2>
      {temperature !== null ? (
        <div>temperature {temperature.toFixed(2)} Celsius</div>
      ) : (
        <div>Loading weather data...</div>
      )}
      {icon !== null ? (
        <img src={icon}></img>
      ) : (
        <div>Loading weather data...</div>
      )}
      {wind !== null ? (
        <div>wind {wind.toFixed(2)} m/s</div>
      ) : (
        <div>Loading weather data...</div>
      )}
    </>
  )
}

// Details of one country
const CountryDetails = ({ country }) => {
  if (!country) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <br/>
      <b>languages:</b>
      <Languages languages={country.languages} />
      <img src={country.flags['png']}></img>
      <Weather country={country} />
    </div>
  )
}

// Shows either the details of one country or a list of countrynames.
const Countries = ({ countries, filter, setAlert, setSelectedCountry }) => {
  const filterCountries = (countries) => {
    return countries.filter(country => country.name.common.includes(filter))
  }

  // Shows nothing if the filter is not specific enough (more than 10 countries in list).
  if(filterCountries(countries).length > 10) {
    setAlert("Too many matches, specify another filter")
    return []
  }

  setAlert(null)
  if(filterCountries(countries).length === 1) {
    setSelectedCountry(filterCountries(countries)[0])
    return []
  }

  return (
    <div>
      {filterCountries(countries).map((country, index) => (
        <Country key={index} country={country} setSelectedCountry={setSelectedCountry} />
      ))}
    </div>
  )
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [newAlert, setNewAlert] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Get countries from REST API
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  return (
    <>
      <Filter filter={newFilter} setFilter={setNewFilter} setSelectedCountry={setSelectedCountry }/>
      <div>{newAlert}</div>
      <CountryDetails country={selectedCountry} />
      <Countries countries={countries} filter={newFilter} setAlert={setNewAlert} setSelectedCountry={setSelectedCountry} />
    </>
  )
}

export default App
