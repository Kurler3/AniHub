import React from 'react';
import { useSelector } from 'react-redux';
import FrontAnime from './FrontAnime';
import Loader from "react-loader-spinner";

const FrontAnimes = () => {

    const animes = useSelector((state) => state.frontAnimes);

    return (
        animes.length===0 ? <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} 
        /> : 
        <div className="front-animes-container">
            {
                animes[0].map((anime, index) => 
                    <FrontAnime key={index} anime={anime}/>
                )
            }
        </div>
    )
}

export default FrontAnimes;
