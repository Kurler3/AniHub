import axios from 'axios';
import { BACK_URL } from "../utils/apis";
import {JIKAN_URL} from '../utils/apis';

// Back End API
const API = axios.create({ baseURL: BACK_URL });

// Middleware cannot work without this
// This is a function that will happen before every single request
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    // Have to return the request.
    return req;
});

// Front Anime Requests
export const getTopAnime = () => axios.get(`${JIKAN_URL}/top/anime/1/airing`);

export const getSeasonAnime = (season) => axios.get(`${JIKAN_URL}/season/${new Date().getFullYear()}/${season}`);

export const getAnime = (id) => axios.get(`${JIKAN_URL}/anime/${id}`);

// Auth 
export const signIn = (formData) => API.post('/user/signIn', formData);

export const signUp = (formData) => API.post('/user/signUp', formData);

// Back Anime Requests

export const getAnimeList = () => API.get('/anime');

export const addAnimeToList = (anime) => API.put('/anime/add', anime);
