import React from 'react';
import {useSelector} from 'react-redux';
import { PROFILE_FILTERS } from '../../utils/constants';
import MyList from '../MyList';
import PostCard from '../PostCard';
import ProfileCommentCard from '../ProfileCommentCard';
import SearchCommunities from '../SearchCommunities';

const ProfileList = ({userInfo}) => {
    
    const profileState = useSelector(state => state.profile);

    const isDataPosts = () => 
        profileState.type === PROFILE_FILTERS[2] || 
        profileState.type === PROFILE_FILTERS[4] || 
        profileState.type === PROFILE_FILTERS[5];

    return (
        <div className='profile-list-container'>
            {
                profileState.type === PROFILE_FILTERS[0] && 

                <MyList />
            }        

            {
                profileState.type === PROFILE_FILTERS[1] &&

                <SearchCommunities />
            }

            {
                isDataPosts() && 
                <div className='list-container'>
                    {
                        profileState.data.length > 0 ?
                        
                        profileState.data.map((post) => <PostCard key={post._id} post={post}/>)
                        : 
                        <div className='no-data-container'>There doesn't seem to be any posts here...</div>
                    }
                </div>
            }

            {
                profileState.type === PROFILE_FILTERS[3] && 
                <div className='comment-list-container'>
                    {
                        profileState.data.length > 0 ? profileState.data.map((comment) => <ProfileCommentCard commentingUser={userInfo} comment={comment} key={comment._id}/>) : <div>You haven't made any comments yet</div>
                    }
                </div>
            }


        </div>
    )
}

export default ProfileList;
