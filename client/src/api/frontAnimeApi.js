import {JIKAN_URL} from '../utils/apis';
import axios from 'axios';

export const getAnime = (filter) =>{
    if(filter==='airing') return axios.get(`${JIKAN_URL}/top/${filter}`);
    else return axios.get(`${JIKAN_URL}/${filter}`);
} 