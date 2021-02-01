import React, {useState, useEffect} from 'react';
import axios from 'axios'


const App = (props) => {
    const [countries, setCountries] = useState([]);
    const [countryFilter, searchCountry] = useState('GE');

    const dataHook = () => {
        console.log('effect hook called');
        axios
            .get(`https://restcountries.eu/rest/v2/name/${countryFilter}`)
            .then (response => {
                console.log('promise fullfilled', response.data);
                setCountries(response.data);
            })
    }

    useEffect(dataHook, []);

    return (
        <div>
            <h1>{countries.map(country => 
                <li key={country.id}>
                    {country.name}
                </li>
                )}
            </h1>
        </div>
    )
}


export default App;
