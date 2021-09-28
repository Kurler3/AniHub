import React, {useState, useEffect} from 'react';
import * as api from '../api/';
import ReactLoading from 'react-loading';

const BackAnime = ({id, addedAt, currentEpisode}) => {

    const [anime, setAnime] = useState(null);

    useEffect(() => {
        if(anime===null) fetchAnimeData();
    }, []);

    const fetchAnimeData = async () => {
        const animeInfo = await api.getAnime(id); 

        console.log(animeInfo.data);

        setAnime(animeInfo.data);
    }

    return (
        anime !== null ? 
            <div className="back-anime-container">
                <img className="poster" src={anime.image_url} alt="anime_poster" />
                <div className="middle-container">
                    <p className="title">{anime.title}</p>
                    <p className="added-at">{addedAt}</p>
                </div>
            </div>

            :    
    
            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
    )
}

export default BackAnime
