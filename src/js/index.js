import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_I1rFZRGaKLZ8cjwQ9Yz3xUwt5pl07kuFVHqNJZA2obhnqIM006iCldHYJn5TbcSH';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener("change", onSelectChange)



function createBreedList() {

    loader.classList.remove('is-hidden');
    breedSelect.classList.add('is-hidden');
error.classList.add('is-hidden');

  fetchBreeds()
        .then(data => {
             loader.classList.replace('loader', 'is-hidden');

            const optionsList = data.map(({ id, name }) => `<option value="${id}">${name}</option>`)
                .join("");
            breedSelect.innerHTML = optionsList;

             new SlimSelect({
                select: breedSelect,
             })
            
            loader.classList.add('is-hidden');
            breedSelect.classList.remove('is-hidden')
        })
      .catch(error => {
            Notify.failure('Oops! Something went wrong! Try reloading the page!')
        });
}


createBreedList()

function onSelectChange(event) {

    loader.classList.remove('is-hidden');
    catInfo.classList.add('is-hidden');

    const selectedBreedId = event.currentTarget.value;

    fetchCatByBreed(selectedBreedId)
        .then(data => {

            renderMarkupCatInfo(data);
            
             loader.classList.add('is-hidden');
            catInfo.classList.remove('is-hidden');
        })
        .catch(error => {
            loader.classList.add('is-hidden');
            Notify.failure('Oops! Something went wrong! Try reloading the page!')
        });

}

    function renderMarkupCatInfo(data) {
        const { breeds, url } = data[0];
        const { name, temperament, description } = breeds[0];
        const breedCard = `<img class="photo-cat" width = "300px" src="${url}" alt="${name}">
    <div class="text-part">
  <h2 class="name-cat">${name}</h2>
  <p class="descr-cat">${description}</p>
  <p class="temperament-cat"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;

        catInfo.innerHTML = breedCard;

    }
