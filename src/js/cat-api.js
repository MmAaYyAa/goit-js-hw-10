import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_I1rFZRGaKLZ8cjwQ9Yz3xUwt5pl07kuFVHqNJZA2obhnqIM006iCldHYJn5TbcSH';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  
   return axios.get(`${BASE_URL}breeds`)
       .then(resp => { 
    
           if (resp.status !== 200) {
               throw new Error(resp.status)
           }
           return resp.data;
         
       })

}

