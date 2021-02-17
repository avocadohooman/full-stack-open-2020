import React, {useEffect} from 'react'
import axios from 'axios'

const CountryInfo = ({country, weather, setWeather}) => {

    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
            .then(response => {
                console.log('Weather fetch successful!')
				setWeather(response.data.current)
            }, [country, apiKey, setWeather])
    })
    
    if (country !== undefined) {
        return (
            <>
                <h1>{ country?.name }</h1>
                <h3>Capital:</h3> <p>{country?.capital}</p>
                <h3>Population:</h3> <p>{country?.population} people</p>
                <h3>Languages:</h3> <p>{country?.languages.map(language =>
                    <li key={language.iso639_1}>
                        {language.name}
                    </li>
                )}</p>
                <h3>National Flag: 
                    <p><img src={country.flag} style={{width: '150px'}}></img></p>
                </h3>
                <h3>Weather in {country.capital}</h3>
                <p>Temperature: {weather.temperature}</p>
                <p>Feels like: {weather.feelslike}</p>
                <p>Wind speed: {weather.wind_speed} m/s</p>
                <p>UV index: {weather.uv_index}</p>
                <p>Clouds: {weather.cloudcover}%</p>
                <p>Pressure: {weather.pressure} hPa</p>
            </>
        )
    }
    else
        return (
            <>
                Nothing
            </>
        )
}

export default CountryInfo