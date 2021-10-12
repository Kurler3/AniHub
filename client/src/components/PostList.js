import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import MediaFilters from './subcomponents/MediaFilters';
import PostCard from './PostCard';
import ReactLoading from 'react-loading';

const PostList = () => {

    const location = useLocation();

    const posts = useSelector(state => state.mediaHomePosts);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    useEffect(() => {
        if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <div className="posts-list-container">
            
            <MediaFilters />

            {
                posts.length > 0 ? 
                
                <div className="posts-container">
                    {posts.map((post) => <PostCard post={post} key={post._id}/>)}
                </div>
                
                    :
                
                <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
            }
        </div>
    )
}

export default PostList;
