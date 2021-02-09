import React from 'react'

const Country = ({countries}) => {
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
                    </li>
                    )}
                </h4>
            </>
        )
    } else if (countries.length === 1) {
        return (
            <>
            <h1>{ countries[0]?.name }</h1>
            <h3>Capital:</h3> <p>{countries[0]?.capital}</p>
            <h3>Population:</h3> <p>{countries[0]?.population} people</p>
            <h3>Languages:</h3> <p>{countries[0]?.languages.map(language =>
                <li key={language.iso639_1}>
                    {language.name}
                </li>
            )}</p>
            <h3>National Flag: 
                <p><img src={countries[0].flag} style={{width: '150px'}}></img></p>
            </h3>
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


export default Country