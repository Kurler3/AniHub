import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { searchCommunity } from '../actions/communityActions';
import ReactLoading from 'react-loading';
import {dateToString, isObjectEmpty} from '../utils/helper_functions';
import CreateMediaPost from './subcomponents/CreateMediaPost';
import PostList from './PostList';
import ModeratorTab from './subcomponents/ModeratorTab';

const Community = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();

    const community = useSelector((state) => state.community['current']);

    useEffect(() => {
        if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));

        if(isObjectEmpty(community) || community.title !== params.communityName) dispatch(searchCommunity(params.communityName)); 
    }, [location])

    // Send dispatch and update on localStorage users subscribed communities
    const onSubscribe = () => {

    }


    if(isObjectEmpty(community) || community.title !== params.communityName) {
        return (
            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
        );
    }else {
        return (
            <div className="community-container">
                    
                    <div className="upper-container">
                        <div className="content-container">
                            <img className="avatar" src={community.avatar_img} alt="avatar" />
                            <div className="title-container">
                                <p className="title">{community.title}</p>
                                <p className="secondary-title">{`r/${community.title}`}</p>
                            </div>
                            <button onClick={onSubscribe} className="subscribe-btn">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="lower-container">
                        
                        <div className="left-container">
                            {user!==null && <CreateMediaPost user={user.result}/>}

                            <PostList />
                        </div>

                        <div className="right-container">

                                <div className="about-container">
                                    <p className="title">About Community</p>
                                    <p className="description">
                                        {community.description}
                                    </p>
                                    <div className="total-members">
                                        <p className="number">
                                            {community.members.length}
                                        </p>
                                        <p className="members">
                                            # Members
                                        </p>
                                    </div>
                                    <p className="created-at">Created at {dateToString(community.created_at)}</p>
                                </div>
                                
                                <div className="moderators-container">
                                    <p className="title">Moderators</p>
                                    <div className="moderator-list">
                                        {
                                            community.moderators.map((moderatorId) => <ModeratorTab key={moderatorId} id={moderatorId}
                                            />)
                                        }
                                    </div>
                                </div>
                        </div>
                    </div>
            </div> 
        )
    }
    
}

export default Community;
