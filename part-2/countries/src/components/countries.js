import {React, useState} from 'react'
import CountryInfo from './country_info'

const Countries = ({countries, weather, setWeather}) => {
    const [state, setState] = useState('show more')
    const [countryInfo, setInfo] = useState('')

    const showCountryInfo = (e, country) => {
        e.preventDefault()
        console.log('EVENT', country);
        if (state === 'show more')
        {
            return (
                setState('show less'),
                setInfo(country)
            )
        }
        else
            return (
                setState('show more')
            ) 
    }

    if (countries.length > 10) {
        return (
            <>
                <h4>Too many matches, specify another filter.</h4>
            </>
        )
    } else if (countries.length > 1 && countries.length <= 10) {
        return (
            <>
                <h4>{countries.map(country => 
                    <li key={country.alpha2Code}>
                        {country.name}
                        {state === 'show more' && <button value={country} onClick={((e) => showCountryInfo(e, country))}>show</button>}
                        {state === 'show less' && <button value={country} onClick={((e) => showCountryInfo(e, country))}>show less</button>}
                    </li>
                    )}
                </h4>
                {state === 'show less' && <CountryInfo country={countryInfo} weather={weather} setWeather={setWeather}/>}
            </>
        )
    } else if (countries.length === 1) {
        return (
            <>
                <CountryInfo country={countries[0]} weather={weather} setWeather={setWeather}/>
            </>
        )
    } else {
        return (
            <>
            <h4>Please specifiy a filter</h4>
            </>
        )
    }
}


export default Countries