'use strict';

import Notiflix from 'notiflix';

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
      console.log('Typ danych:', typeof dataLength);
      console.log('Data length:', dataLength, 'Data is:', data);
      if (dataLength > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      console.log('Error happens:', error);
      Notiflix.Notify.failure('Oops, there is no country with that name.');
      
    });
}

export { fetchCountries };
