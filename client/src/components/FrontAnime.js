import React, {useEffect} from 'react';

const FrontAnime = ({anime}) => {

    // console.log(anime);
    
    // Get more info about the anime with another request to the api
    useEffect(() => {
        
    }, [])

    return (
        <div className="front-anime-container">
            <div className="anime-image-container">
                <img src={anime.image_url} alt="Poster Image" />
            </div>
            <div className="anime-genres-container">
                {}
            </div>
            <p className="anime-title">
                {anime.title}
            </p>
            <div className="anime-stars-container">
                <p>x reviews</p>
            </div>
            <div className="anime-watching-episodes-container">

            </div>
        </div>
    )
}

export default FrontAnime;
