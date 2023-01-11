'use strict';

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
      console.log('Data downloaded:', data);
    })
    .catch(error => {
      console.log('Error happens:', error);
    });
}

export { fetchCountries };
