import React, {useState} from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const Post = () => {

    const params = useParams();

    const postId = params.postId;

    // Get post id from headers
    // Search for post object in state's post array.
    const fullPost = useSelector(state => state.posts.find(post => post._id===postId));


    return (
        fullPost ? 
            <div>{fullPost.title}</div> 
            : 
            <div>Not yet here bois</div>
    )
}

export default Post
