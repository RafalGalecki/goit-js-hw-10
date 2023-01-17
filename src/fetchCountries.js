'use strict';

import Notiflix from 'notiflix';

//variables
const countryList = document.querySelector('.country-list');
let countryListElements = countryList.children;
const countryInfo = document.querySelector('.country-info');
let countryInfoElements = countryInfo.children;

//Main fetch function to get data from server
// and errors handling
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
      Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
}

// get data to rendering country names with flags
function renderCountries(data) {
  data.forEach(el => {
    renderCountryWithFlag(el);
  });
}

// rendering 'li' element with a flag and its country name
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

  addMarkerClass(countryListElements);
};

// rendering details of the matched one country
function renderCountryDetails(data) {
  data.forEach(el => {
    const countryCapitalData = el.capital;
    const countryPopulationData = el.population.toLocaleString('pl-PL');
    const countryLanguagesData = Object.values(el.languages).join(', ');

    const countryCapitalElement = document.createElement('p');
    const countryPopulationElement = document.createElement('p');
    const countryLanguagesElement = document.createElement('p');

    countryCapitalElement.textContent = `Capital: ${countryCapitalData}`;
    countryPopulationElement.textContent = `Population: ${countryPopulationData}`;
    countryLanguagesElement.textContent = `Languages: ${countryLanguagesData}`;

    countryInfo.appendChild(countryCapitalElement);
    countryInfo.appendChild(countryPopulationElement);
    countryInfo.appendChild(countryLanguagesElement);

    addMarkerClass(countryInfoElements);
  });
}

// add marker class to elements for easy renderrefreshing
function addMarkerClass(elements) {
  for (let element of elements) {
    element.classList.add('marker');
  }
}

export { fetchCountries };
