import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { searchCommunity } from '../actions/communityActions';
import ReactLoading from 'react-loading';
import {isObjectEmpty} from '../utils/helper_functions';

const Community = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const community = useSelector((state) => state.community['current']);

    useEffect(() => {
        if(isObjectEmpty(community) || community.title !== params.communityName) dispatch(searchCommunity(params.communityName)); 
    })

    if(isObjectEmpty(community) || community.title !== params.communityName) {
        return (
            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
        );
    }else {
        return (
            <div className="community-container">
                    <p>{community.title}</p>
                    <img src={community.avatar_img} alt="avatar" />
            </div> 
        )
    }
    
}

export default Community;
