import React, {useState, useEffect} from 'react';
import CreateMediaPost from './subcomponents/CreateMediaPost';
import { useLocation } from 'react-router-dom';
import PostList from './PostList';

const Media = () => {

    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // Everytime location is changed look for a user login
    useEffect(() => {
        if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));
    },
    [location]);

    return (
        <div className="media-container">
            <div className="left-container">
                
                {// If there's an user logged in then he can create posts 
                }
                {user!==null && <CreateMediaPost user={user.result}/>}
                
                <PostList />
            </div>
            <div className="right-container">

            </div>
        </div>
    )
}

export default Media;