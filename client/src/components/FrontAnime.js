import React from 'react';
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';

const FrontAnime = ({anime}) => {

    return (
        <Link to={`/anime/${anime.mal_id}`} className="front-anime-container">
            <div className="anime-image-container">
                <img src={anime.image_url} alt="Poster" />
            </div>
            <p className="anime-title">
                {anime.title}
            </p>
            <ReactStars
                classNames="anime-stars-container"
                count={5}
                size={18}
                isHalf={true}
                activeColor="#ffd700"
                edit={false}
                value={anime.score/2}
            />
            <div className="anime-members-container">
                <p className="members-number">
                {anime.members}
                </p>
                <p className="members-title">Members</p>
            </div>
        </Link>
    )
}

export default FrontAnime;
