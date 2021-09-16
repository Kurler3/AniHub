import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import * as api from '../api/';
import ReactLoading from 'react-loading';
import {addAnimeToList} from '../actions/backAnimeActions';
import {useDispatch} from 'react-redux';

const AnimePage = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const animeId = params.id;

    const [anime, setAnime] = useState(null);

    const dateFormatOptions = { year: 'numeric', month: 'long'};

    const fetchAnimeData = async () => {
        const animeInfo = await api.getAnime(animeId); 
        setAnime(animeInfo.data);
    }

    useEffect(() => {
        if(anime===null) fetchAnimeData();
        
    });

    const onAddListBtnClick = () => dispatch(addAnimeToList(anime));

    return (

        anime!==null ? 
        <div className="anime-page-container">
            <div className="left-container">
                <h1 className="title">{anime.title}</h1>
                <img className="poster" src={anime.image_url} alt="Anime Poster" />
                <button onClick={onAddListBtnClick} className="add-list-btn">Add to List</button>
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
