'use strict';

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

let name;
let elementToRemove;

const DEBOUNCE_DELAY = 3000;

const searchBoxInput = document.querySelector('#search-box');

const getValueFromInput = debounce(function (el) {
  refreshRendering();
  console.log(el.target.value);
  name = el.target.value.trim();
  console.log('Name is:', name);
  fetchCountries(name);
}, DEBOUNCE_DELAY);

searchBoxInput.addEventListener('input', getValueFromInput);



function refreshRendering() {
  elementToRemove = document.querySelectorAll('.marker');

  if (elementToRemove.length > 1) {
    for (let i = 0; i < elementToRemove.length; i++) {
      elementToRemove[i].remove();
    }
  }
}

//searchBoxInput.addEventListener('change', refreshRendering);

// for test:
// const fetchPokemonData = async () => {
//   return await fetch(
//     'https://api.pokemontcg.io/v2/cards?' +
//       new URLSearchParams({
//         pageSize: 50,
//       })
//   )
//     .then(response => response.JSON())
//     .then(data => console.log(data));
// };

// fetchPokemonData();

// for test:
// const fetchCountries = async () => {
//   return await fetch('https://restcountries.com/v3.1/name/{name}')
//     .then(response => response.JSON())
//     .then(data => console.log(data));
// };
// function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}`);
// }
// fetchCountries(argen);
