import React from 'react';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import BackAnime from './BackAnime';

const MyList = () => {

    // Retrieves back anime list (updates automatically when user adds or removes anime from/to list)
    const backAnimeIdList = useSelector((state) => state.backAnimes);

    return (
        backAnimeIdList!==null ? <div className="my-anime-list-container">
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
        <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
    )
}

export default MyList;
