'use strict';

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

//variables
let name;
let elementToRemove;
const DEBOUNCE_DELAY = 300;
const searchBoxInput = document.querySelector('#search-box');

// Get input data written by user
const getValueFromInput = debounce(function (el) {
  refreshRendering();
  console.log(el.target.value);
  name = el.target.value.trim();
  console.log('Name is:', name);
  fetchCountries(name);
}, DEBOUNCE_DELAY);

// Input listener
searchBoxInput.addEventListener('input', getValueFromInput);

// Refresh rendered elements (if any)
function refreshRendering() {
  elementToRemove = document.querySelectorAll('.marker');

  if (elementToRemove.length > 1) {
    for (let i = 0; i < elementToRemove.length; i++) {
      elementToRemove[i].remove();
    }
  }
}
