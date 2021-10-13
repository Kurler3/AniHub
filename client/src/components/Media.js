import React, {useState, useEffect} from 'react';
import CreateMediaPost from './subcomponents/CreateMediaPost';
import { useLocation } from 'react-router-dom';
import PostList from './PostList';
import {Link} from 'react-router-dom';
import CreateCommunityPopUp from './subcomponents/CreateCommunityPopUp';

const Media = () => {

    const location = useLocation();

    const [createCommunityVisible, setCreateCommunityVisible] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    // Everytime location is changed look for a user login
    useEffect(() => {
        if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));
    },
    [location]);

    return (
        <div className='media-container'>
            <div className="left-container">
                
                {// If there's an user logged in then he can create posts 
                }
                {user!==null && <CreateMediaPost user={user.result}/>}
                
                <PostList />
            </div>
            <div className="right-container">
                <div className="create-post-community-container">
                    <p className="title">Hello{user!==null ? `, ${user.result.first_name}` : ''}!</p>
                    <p className="intro">Your personal AniHub page. Here you'll find the newest posts from your favorite communities!</p>
                    <Link to="/media/submit/post" style={{textDecoration:'none', width:'100%'}}>
                        <button className="create-post-btn">
                            Create Post
                        </button>
                    </Link>
                    
                    <button onClick={() => setCreateCommunityVisible(true)} className="create-community-btn">
                        Create Community
                    </button>
                </div>
            </div>

            {createCommunityVisible && 
                <CreateCommunityPopUp setCreateCommunityVisible={setCreateCommunityVisible}/>
            }
        </div>
    )
}

export default Media;