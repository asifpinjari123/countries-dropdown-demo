import React, { useState } from 'react';
import CountriesData from '../src/CountriesData.json';

const { countries } = CountriesData;

const Countries = () => {
  const [selectCountry, setSelectCountry] = useState('');
  const [selectState, setSelectState] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [answers, setAnswers] = useState('');

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectCountry(country);
    setSelectState('');
    setSelectCity('');
    setAnswers('');
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectState(state);
    setSelectCity('');
    setAnswers('');
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectCity(city);
    setAnswers(`Selected: ${selectCountry}, ${selectState}, ${city}`);
  };

  return (
    <div className="container">
      <label>Select Country</label>
      <select className="dropdown" value={selectCountry} onChange={handleCountryChange}>
        <option value="" disabled>Select Country Options</option>
        {countries.map((country, index) => (
          <option key={index} value={country.name}>{country.name}</option>
        ))}
      </select>

      {selectCountry && (
        <>
          <label>Select State</label>
          <select className="dropdown" value={selectState} onChange={handleStateChange}>
            <option value="" disabled>Select State Options</option>
            {countries.find((country) => country.name === selectCountry)?.states.map((state, index) => (
              <option key={index} value={state.name}>{state.name}</option>
            ))}
          </select>
        </>
      )}

      {selectState && (
        <>
          <label>Select City</label>
          <select className="dropdown" value={selectCity} onChange={handleCityChange}>
            <option value="" disabled>Select City Options</option>
            {countries
              .find((country) => country.name === selectCountry)
              ?.states.find((state) => state.name === selectState)
              ?.cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
          </select>
        </>
      )}

      {answers && (
        <div className="result">
          <h2>{answers}</h2>
        </div>
      )}
    </div>
  );
};

export default Countries;
