'use strict';

import Notiflix from 'notiflix';

const countryList = document.querySelector('.country-list');
let countryListElements = countryList.children;
const countryInfo = document.querySelector('.country-info');
let countryInfoElements = countryInfo.children;

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
        //refreshRendering();
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
  for (element of countryListElements) {
    element.classList.add('marker');
  }
  // countryListElements.forEach((el) => {
  //   countryListElement[el].classList.add('.marker');
  // });
};

function renderCountries(data) {
  refreshRendering();
  data.forEach(el => {
    console.log(el.flags.svg);
    console.log(el.name.official);
    renderCountryWithFlag(el);
  });
}

function renderCountryDetails(data) {
  refreshRendering();
  data.forEach(el => {
    const countryCapitalData = el.capital;
    const countryPopulationData = el.population.toLocaleString('pl-PL', {
      useGrouping: 'true',
      // minimumFractionDigits: '2',
      // maximumFractionDigits: '2',
    });
    const countryLanguagesData = Object.values(el.languages).join(', ');
    const countryCapitalElement = document.createElement('p');
    //countryCapitalElement.classList.add(".marker");
    countryCapitalElement.textContent = `Capital: ${countryCapitalData}`;
    const countryPopulationElement = document.createElement('p');
    //countryPopulationElement.classList.add('.marker');
    countryPopulationElement.textContent = `Population: ${countryPopulationData}`;
    const countryLanguagesElement = document.createElement('p');
    //countryLanguagesElement.classList.add('.marker');
    countryLanguagesElement.textContent = `Languages: ${countryLanguagesData}`;
    countryInfo.appendChild(countryCapitalElement);
    countryInfo.appendChild(countryPopulationElement);
    countryInfo.appendChild(countryLanguagesElement);
    console.log(countryInfoElements);
    for (element of countryInfoElements) {
      element.classList.add('marker');
    }
    // countryInfoElements.forEach(el => {
    //   el.classList.add('.marker');
    // });
  });
}

function refreshRendering() {
  elementToRemove = document.querySelectorAll('.marker');

  if (elementToRemove.length > 1) {
    for (let i = 0; i < elementToRemove.length; i++) {
      elementToRemove[i].remove();
    }
  }
}

export { fetchCountries };
