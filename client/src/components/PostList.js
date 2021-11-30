import React, {useState, useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import MediaFilters from './subcomponents/MediaFilters';
import PostCard from './PostCard';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/mediaActions';


const PostList = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();

    const [didInitialFetch, setDidInitialFetch] = useState(false);

    const communityTitle = params.communityName === undefined ? null : params.communityName;

    const posts = useSelector(state => state.posts);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    useEffect(() => {
        if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));

        // Going to handle the null values in the back-end
        if(!didInitialFetch) {
            dispatch(getPosts(communityTitle, user !==null ? user.result.communities_subscribed : null));
            setDidInitialFetch(true);
        }
    }, [location, posts]);

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
