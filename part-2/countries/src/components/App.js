import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Filter from '../components/filter';
import Country from './countries';

const App = (props) => {
    const [countries, setCountries] = useState([]);
    const [countryFilter, searchCountry] = useState('');

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

    const handleFilterChanges = (event) => {
        return (
            searchCountry(event.target.value),
            dataHook()
        )
    }

    return (
        <div>
            <h3>Filter</h3>
            <Filter text="search for countries: " filter={countryFilter} onChanges={handleFilterChanges} />
            <Country countries={countries} />
        </div>
    )
}

export default App;
