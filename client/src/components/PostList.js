import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

const PostList = () => {

    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <div className="posts-list-container">
            Post List
        </div>
    )
}

export default PostList;
