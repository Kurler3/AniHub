import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import BackAnime from './BackAnime';
import { useLocation } from 'react-router-dom';

const MyList = () => {
    // Converts from json to js object if there is a user logged in
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // Retrieves back anime list (updates automatically when user adds or removes anime from/to list)
    const backAnimeIdList = useSelector((state) => state.backAnimes);

    const location = useLocation();

    // Navbar will react everytime user moves from /auth to /, for example
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    },
    [location]);

    return (
        user!=null ? <div className="my-anime-list-container">
            {
                backAnimeIdList.length > 0 ? 
                    <div className="list-container">
                        {
                            backAnimeIdList.map((anime) => <BackAnime id={anime.id} addedAt={anime.added_at} currentEpisode={anime.current_episode} key={anime.id}/>)
                        }
                    </div> 
                : 
                    <div className="empty-list-container">Your Favorite Anime List is Empty</div>
            }
        </div> : 
        <div className="my-list-no-user-container">You need to login in order to have a list</div>
    )
}

export default MyList;
