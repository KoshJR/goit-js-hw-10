import { fetchBreeds, fetchCatByBreed } from './catApi';
const selectBreed = document.querySelector('.breed-select');
selectBreed.style.display = 'none';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
fetchBreeds(BASE_URL).then(res => {
  const markup = res.data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  selectBreed.innerHTML = `<option data-placeholder="true"></option>${markup}`;
  new SlimSelect({
    select: selectBreed,
    settings: {
      placeholderText: 'Please select your cat breed',
    },
  });
});

selectBreed.addEventListener('change', fetchCatByBreed);
