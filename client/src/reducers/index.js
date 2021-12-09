import { combineReducers } from "redux";
import frontAnimeReducer from './frontAnimeReducer';
import authReducer from './authReducer';
import backAnimeReducer from "./backAnimeReducer";
import postsReducer from "./postsReducer";
import communityReducer from "./communityReducer";
import commentsReducer from "./commentsReducer";

export default combineReducers({
    frontAnimes: frontAnimeReducer,
    auth: authReducer,
    backAnimes: backAnimeReducer,
    posts:postsReducer,
    community:communityReducer,
    comments:commentsReducer,
});