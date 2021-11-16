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

export const searchAnime = (input) => axios.get(`${JIKAN_URL}/search/anime?q=${input}`);

// Auth 
export const signIn = (formData) => API.post('/user/signIn', formData);

export const signUp = (formData) => API.post('/user/signUp', formData);

// Back Anime Requests

export const getAnimeList = () => API.get('/anime');

export const removeAnimeFromList = (anime) => API.put('/anime/remove', anime); 

export const addAnimeToList = (anime) => API.put('/anime/add', anime);

export const updateAnimeEpisode = (id, episode) => API.put('/anime/updateEpisode', {id, episode});

// Media

export const getMediaHomePosts = (filter) => API.get('/media/posts', filter);

// Community

export const createCommunity = (inputData) => API.post('/community/create', inputData);

// Change to POST request because GET requests shouldn't have a body
export const searchCommunities = (communityName) => API.post('/community/searchList', {communityName});

export const searchCommunity = (communityName) => API.post('/community/searchSingle', {communityName});

export const getAllCommunities = () => API.get('/community/all');

// Users

export const getUserInfo = (id) => API.get('/user/getInfo', {params:{id}});

export const subUnSubCommunity = (userId, communityTitle, isUnSub) => API.post('/user/sub', {userId, communityTitle, isUnSub}); 

