import {JIKAN_URL} from '../utils/apis';
import axios from 'axios';

export const getTopAnime = () => axios.get(`${JIKAN_URL}/top/anime/1/airing`);

export const getSeasonAnime = (season) => axios.get(`${JIKAN_URL}/season/${new Date().getFullYear()}/${season}`);