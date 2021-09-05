import React, {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { getAnime } from '../actions/frontAnimeActions';
import {ANIME_SEASON_FILTERS} from '../utils/constants';


const Homepage = () => {

    const [currentFilterSelected, setCurrentFilterSelected] = useState(ANIME_SEASON_FILTERS[0]);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAnime('airing'));
    }, []);

    const onFilterClick = (e) => {
        setCurrentFilterSelected(e.target.textContent);

        dispatch(getAnime(e.target.textContent.toLowerCase()));
    }

    return (
        <div className="homepage-container">
            <div className="anime-filters-container">
                <p className={`anime-filter ${currentFilterSelected===ANIME_SEASON_FILTERS[0] ? 'selected-filter':''}`} onClick={onFilterClick}>Airing</p>
                <p className="separator">|</p>
                <p className={`anime-filter ${currentFilterSelected===ANIME_SEASON_FILTERS[1] ? 'selected-filter':''}`} onClick={onFilterClick}>Spring</p>
                <p className="separator">|</p>
                <p className={`anime-filter ${currentFilterSelected===ANIME_SEASON_FILTERS[2] ? 'selected-filter':''}`} onClick={onFilterClick}>Summer</p>
                <p className="separator">|</p>
                <p className={`anime-filter ${currentFilterSelected===ANIME_SEASON_FILTERS[3] ? 'selected-filter':''}`} onClick={onFilterClick}>Fall</p>
                <p className="separator">|</p>
                <p className={`anime-filter ${currentFilterSelected===ANIME_SEASON_FILTERS[4] ? 'selected-filter':''}`} onClick={onFilterClick}>Winter</p>
            </div>

            
        </div>
    )
}

export default Homepage;
