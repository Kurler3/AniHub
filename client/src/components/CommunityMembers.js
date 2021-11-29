import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberTab from './subcomponents/MemberTab';
import {useParams} from 'react-router-dom';
import {isObjectEmpty} from '../utils/helper_functions';
import { searchCommunity } from '../actions/communityActions';
import ReactLoading from 'react-loading';

const CommunityMembers = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // const [isBlurOn, setIsBlurOn] = useState(false);

    const community = useSelector(state => state.community['current']);

    useEffect(() => {
       if(user===null) setUser(JSON.parse(localStorage.getItem('profile'))); 

       if(isObjectEmpty(community) || community.title !== params.communityName){
            dispatch(searchCommunity(params.communityName)); 
       } 
    }, [community]);

    // const changeBlur = (isSetOn) => setIsBlurOn(isSetOn);
    
    if(isObjectEmpty(community) || community.title !== params.communityName) {
        return (
            <div className="loading-container">
                <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
            </div>
        );
    }else {
        return (
            <div className='community-members-container'>
                {
                    // No need to check for array to be empty
                    // bcz it will always have at least 1 member
                    // (the owner)
                }
                {   
                    community.members.map(
                        (id) => <MemberTab key={id} id={id} currentCommunity={
                            {
                                title:community.title,
                                moderators:community.moderators,
                                admins:community.admins,
                                // setIsBlurOn:changeBlur(),
                            }
                        } 
                        currentUserId={user!==null? user.result._id : null} />
                    ) 
                }
                
            </div>
        )
    }
}

export default CommunityMembers;
