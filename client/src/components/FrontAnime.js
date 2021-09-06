import React from 'react'

const FrontAnime = ({anime}) => {

    // console.log(anime);

    return (
        <div className="front-anime-container">
            {anime.title}
        </div>
    )
}

export default FrontAnime;
