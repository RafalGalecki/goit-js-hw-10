'use strict';

import Notiflix from 'notiflix';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      let dataLength = data.flatMap(el => el.name).length;
      console.log('Typ danych:', typeof data);
      console.log('Data length:', dataLength, 'Data is:', data);
      if (dataLength > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (dataLength <= 10) {
        renderCountries(data);
        if (dataLength === 1) {
          renderCountryDetails(data);
        }
      }
    })
    .catch(error => {
      console.log('Error happens:', error);
      Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
}

const renderCountryWithFlag = singleCountryData => {
  const countryListElement = document.createElement('li');
  const countryFlag = document.createElement('img');
  const countryName = document.createElement('p');
  countryFlag.setAttribute('src', singleCountryData.flags.png);
  countryFlag.setAttribute('alt', singleCountryData.name.official);
  countryName.textContent = singleCountryData.name.official;
  countryList.appendChild(countryListElement);
  countryListElement.appendChild(countryFlag);
  countryListElement.appendChild(countryName);
};

function renderCountries(data) {
  data.forEach(el => {
    console.log(el.flags.svg);
    console.log(el.name.official);
    renderCountryWithFlag(el);
  });
}

function renderCountryDetails(data) {
  data.forEach(el => {
    const countryCapitalData = el.capital;
    const countryPopulationData = el.population.toLocaleString('pl-PL', {
      useGrouping: 'true',
      // minimumFractionDigits: '2',
      // maximumFractionDigits: '2',
    });;
    const countryLanguagesData = Object.values(el.languages).join(", ");
    const countryCapitalElement = document.createElement('p');
    countryCapitalElement.textContent = `Capital: ${countryCapitalData}`;
    const countryPopulationElement = document.createElement('p');
    countryPopulationElement.textContent = `Population: ${countryPopulationData}`;
    const countryLanguagesElement = document.createElement('p');
    countryLanguagesElement.textContent = `Languages: ${countryLanguagesData}`;
    countryInfo.appendChild(countryCapitalElement);
    countryInfo.appendChild(countryPopulationElement);
    countryInfo.appendChild(countryLanguagesElement);
  });
}

export { fetchCountries };
