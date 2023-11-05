import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_NildWIgGizqRwVbU1R15xJNStZnyNYAAnkf4KABlL7F16HzvbajtmgiCiEcW30dH';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
function errorReq() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center',
    timeout: 5000,
    width: '400px',
    fontSize: '24px',
  });
}
const selectBreed = document.querySelector('.breed-select');

const boxCatInfo = document.querySelector('.cat-info');
const loaderBox = document.querySelector('.loader');

const fetchBreeds = urlCat => {
  return axios
    .get(urlCat)
    .then(res => {
      loaderBox.style.display = 'none';
      selectBreed.style.display = 'flex';
      return res;
    })
    .catch(() => {
      errorReq();
      loaderBox.style.display = 'none';
      selectBreed.style.display = 'none';
      boxCatInfo.style.display = 'none';
    });
};

const fetchCatByBreed = event => {
  event.preventDefault();
  const breedId = event.target.value;
  boxCatInfo.style.display = 'none';
  loaderBox.style.display = 'block';
  const BASE_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(BASE_URL)
    .then(res => {
      boxCatInfo.style.display = 'flex';
      loaderBox.style.display = 'none';
      const dataCat = res.data[0].breeds[0];
      boxCatInfo.innerHTML = `<img src="${res.data[0].url}" alt="${dataCat.name}" width='300' style="margin-top: 20px; margin-right: 20px;">
      <div>
        <h1>${dataCat.name}</h1>
        <p>${dataCat.description}</p>
        <p><span style="font-weight: bold;">Temperament: </span>${dataCat.temperament}</p>
      </div>`;
    })
    .catch(() => {
      errorReq();
      boxCatInfo.style.display = 'none';
      loaderBox.style.display = 'none';
      selectBreed.style.display = 'none';
    });
};
export { fetchBreeds, fetchCatByBreed };
