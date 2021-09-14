import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import * as api from '../api/';
import ReactLoading from 'react-loading';

const AnimePage = () => {

    const params = useParams();

    const animeId = params.id;

    const [anime, setAnime] = useState(null);

    const fetchAnimeData = async () => {
        const animeInfo = await api.getAnime(animeId);
        console.log(animeInfo.data);
        
        setAnime(animeInfo.data);
    }

    useEffect(() => {
        fetchAnimeData();
    });

    

    return (

        anime!==null ? 
        <div className="anime-page-container">
            <div className="left-container">
                <h1 className="title">{anime.title}</h1>
                <img className="poster" src={anime.image_url} alt="Anime Poster" />
                <button className="add-list-btn">Add to List</button>
            </div>
            <div className="right-container">

            </div>
        </div> : <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
    )
}

export default AnimePage;
