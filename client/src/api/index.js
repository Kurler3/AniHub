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

export const getPosts = (communityTitle, communities_subscribed) => API.post('/media/posts', {communityTitle, communities_subscribed});

export const createPost = (inputData, userId) => API.post('/media/createPost', {inputData, userId}); 

export const votePost = (postId, userId, isUpVote) => API.post('/media/votePost', {postId, userId, isUpVote});

export const deletePost = (postId) => API.post('/media/deletePost', {postId});

// Community

export const createCommunity = (inputData) => API.post('/community/create', inputData);

// Change to POST request because GET requests shouldn't have a body
export const searchCommunities = (communityName) => API.post('/community/searchList', {communityName});

export const searchCommunity = (communityName) => API.post('/community/searchSingle', {communityName});

export const getAllCommunities = () => API.get('/community/all');

export const updateSubUnsubCommunity = (userId, communityTitle, isUnSub) => API.post('/community/updateSubUnsub', {userId, communityTitle, isUnSub}); 

export const removeMember = (communityTitle, memberId) => API.post('/community/removeMember', {communityTitle, memberId});

export const blockMember = (communityTitle, memberId) => API.post('/community/block', {communityTitle, memberId});

export const addAdmin = (communityTitle, memberId) => API.post('/community/addAdmin', {communityTitle, memberId});

export const addRemoveMod = (communityTitle, memberId, isRemove) => API.post('/community/addRemoveMod', {communityTitle, memberId, isRemove});

// Users

export const getUserInfo = (id) => API.get('/user/getInfo', {params:{id}});

export const subUnSubCommunity = (userId, communityTitle, isUnSub) => API.post('/user/sub', {userId, communityTitle, isUnSub}); 

// Comments

export const getComments = (postId) => API.post('/comments', {postId});

export const createComment = (createdBy, postId, content, isSubComment) => API.post('/comments/create', {createdBy, postId, content, isSubComment});

export const getSubComments = (subCommentsIds) => API.post('/comments/sub', {subCommentsIds});

export const replyComment = (commentId, userId, postId, input) => API.post('/comments/reply', {commentId, userId, postId, input});

export const voteComment = (isUpVoting, userId, commentId) => API.post('/comments/vote', {isUpVoting, userId, commentId});


