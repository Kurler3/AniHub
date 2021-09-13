import { BACK_API } from "../utils/apis";
import axios from 'axios';

export const signIn = (formData) => axios.post(`${BACK_API}/user/signIn`, formData);

export const signUp = (formData) => axios.post(`${BACK_API}/user/signUp`, formData);