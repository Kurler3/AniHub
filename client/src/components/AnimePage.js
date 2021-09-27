import React, {useEffect, useState} from 'react';
import { useParams, useLocation} from 'react-router';
import * as api from '../api/';
import ReactLoading from 'react-loading';
import {addAnimeToList, removeAnimeFromList} from '../actions/backAnimeActions';
import {useDispatch, useSelector} from 'react-redux';

const AnimePage = () => {

    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const savedAnimeList = useSelector(state => state.backAnimes);

    const animeId = params.id;

    const [anime, setAnime] = useState(null);

    const dateFormatOptions = { year: 'numeric', month: 'long'};

    const fetchAnimeData = async () => {
        const animeInfo = await api.getAnime(animeId); 
        setAnime(animeInfo.data);
    }

    useEffect(() => {
        if(anime===null) fetchAnimeData();

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location, anime, savedAnimeList]);

    const onAddListBtnClick = () => dispatch(addAnimeToList(anime));

    const onRemoveBtnClick = () => dispatch(removeAnimeFromList(anime));

    const isAnimeInUsersFavList = () => {
        // If user is null then just return true,
        // so that the add button will be disabled
        if(user===null) return true;
        
        let animeExistsInList;

        user.result.saved_animes.forEach((savedAnime) => {
            if(savedAnime.id === anime.mal_id.toString()){
                animeExistsInList = true;
                return;
            }
        });

        return animeExistsInList;
    }

    return (

        anime!==null ? 
        <div className="anime-page-container">
            <div className="left-container">
                <h1 className="title">{anime.title}</h1>
                <img className="poster" src={anime.image_url} alt="Anime Poster" />

                <button disabled={user===null || isAnimeInUsersFavList()} onClick={onAddListBtnClick} 
                className={`${user===null || isAnimeInUsersFavList() ? 'disabled-add-btn' : 'add-list-btn'}`}
                >Add to List</button>
                
                {user!==null ? <button disabled={!isAnimeInUsersFavList()} onClick={onRemoveBtnClick} className={`${isAnimeInUsersFavList() ? 'active-remove-btn ' : 'disabled-remove-btn'}`}>
                    Remove                    
                </button> : ''}
            </div>
            <div className="right-container">
                <div className="top-part">
                    <div className="stats-container">
                        <div className="score-container">
                            <p className="score-title">
                                SCORE
                            </p>
                            <p className="score">{anime.score}</p>
                        </div>
                        <div className="stats-container-right-part">
                            <div className="top-container">
                                <p className="rank">Ranked <span className="bold">#{anime.rank}</span></p>
                                <p className="popularity">Popularity <span className="bold">#{anime.popularity}</span></p>
                                <p className="members">Members <span className="bold">{anime.members}</span></p>
                            </div>
                            <div className="bottom-container">
                                <p className="aired-from">{new Date(anime.aired.from).toLocaleDateString('en-US', dateFormatOptions)}</p>
                                <p className="type">{anime.type}</p>
                                {anime.producers.length > 0 ? <p className="producer">{anime.producers[0].name}</p> : <p></p>}
                            </div>
                        </div>
                    </div>
                    <div className="trailer-container">
                        <iframe style={{border:'none', height:"100%"}} src={anime.trailer_url}></iframe>
                    </div>
                </div>

                <div className="synopsis-container">
                    <p className="title">Synopsis</p>
                    <p className="synopsis">{anime.synopsis}</p>
                </div>

            </div>
        </div> : <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
    )
}

export default AnimePage;
