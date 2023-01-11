'use strict';

export function fetchCountries({ name } = '') {
  fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
}
