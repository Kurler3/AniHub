import React, {useState, useEffect} from 'react';
import * as api from '../api/';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { removeAnimeFromList, updateAnimeEpisode } from '../actions/backAnimeActions';

const BackAnime = ({id, addedAt, currentEpisode}) => {

    const dispatch = useDispatch();

    const [anime, setAnime] = useState(null);
    const [episodeCounter, setEpisodeCounter] = useState(currentEpisode);

    // If the current episode is not 1 then it can still be decreased
    const [episodeCanDecrease, setEpisodeCanDecrease] = useState(currentEpisode!==1);

    // Will set the real initial value of this when the whole anime info is fetched
    const [episodeCanIncrease, setEpisodeCanIncrease] = useState(true);

    const dateFormatOptions = { year: 'numeric', month: 'long'};

    useEffect(() => {
        if(anime===null) fetchAnimeData();
    }, [episodeCanDecrease, episodeCanIncrease]);

    const fetchAnimeData = async () => {
        const animeInfo = await api.getAnime(id); 

        setAnime(animeInfo.data);

        // If the anime has max episodes then if the current episode is
        // smaller than the max then user can still increase current episode, other wise he can't
        // If there are no max episodes (still airing) then the user can increase current episode
        setEpisodeCanIncrease(animeInfo.data.episodes !== null ? currentEpisode < animeInfo.data.episodes ? true: false : true);
    }

    const onDecreaseEpisodeClick = () => {
        if(episodeCanDecrease) {
            setEpisodeCounter(episodeCounter-1);

            dispatch(updateAnimeEpisode(anime.mal_id, episodeCounter-1));

            setEpisodeCanDecrease(canEpisodeCounterDecrease(episodeCounter-1));
        }
    }

    const onIncreaseEpisodeClick = () => {
        if(episodeCanIncrease) {
            // Increase internal state of current episode
            setEpisodeCounter(episodeCounter+1);
            // Dispatch action to back end reducer (just need to send the anime's id and currentEpisode)
            dispatch(updateAnimeEpisode(anime.mal_id, episodeCounter+1));
            // Action makes call to backend and updates the specific user's list entry
            // Update internal state of can increase episode
            setEpisodeCanIncrease(canEpisodeCounterIncrease(episodeCounter+1));
            setEpisodeCanDecrease(canEpisodeCounterDecrease(episodeCounter+1));
        }
    }

    const onRemoveAnimeClick = () => dispatch(removeAnimeFromList(anime));

    const canEpisodeCounterIncrease = (counter) => anime.episodes !== null ? counter < anime.episodes ? true: false : true;

    const canEpisodeCounterDecrease = (counter) => counter>1;

    return (
        anime !== null ? 
            <div className="back-anime-container">
                <Link to={`/anime/${anime.mal_id}`}>
                    <img className="poster" src={anime.image_url} alt="anime_poster" />
                </Link>
                <div className="middle-container">
                    <p className="title">{anime.title}</p>
                    <p className="added-at"><span style={{fontWeight:'bold'}}>Added at:</span> {new Date(addedAt).toLocaleDateString('en-US', dateFormatOptions)}</p>
                </div>
                <div className="current-episode-container">
                    <p className="title">Current Episode</p>
                    <p className="episode-counter">
                        <span style={{fontWeight:'bold'}}>{episodeCounter}</span>{anime.episodes!==null ? `/${anime.episodes}` : ''}
                    </p>
                    <div className="current-episode-controller-container">
                        <div onClick={onDecreaseEpisodeClick} className={`arrow-controller ${!episodeCanDecrease ? 'disabled' : ''}`}><FontAwesomeIcon icon={faArrowLeft}/></div>
                        <div onClick={onIncreaseEpisodeClick} className={`arrow-controller ${!episodeCanIncrease ? 'disabled' : ''}`}>
                        <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </div>
                <div className="remove-button-container">
                    <button onClick={onRemoveAnimeClick} className="remove-button">Remove</button>
                </div>
            </div>

            :    
    
            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
    )
}

export default BackAnime
