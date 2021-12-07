import Posts from '../models/post.js';
// import User from '../models/user.js';
// import {MEDIA_POST_FILTERS} from '../constants.js';

export const getPosts = async (req, res) => {
    let {communityTitle, communities_subscribed} = req.body;

    try {
        let posts;

        if(communityTitle!==undefined) {
            posts = await Posts.find({community_title:communityTitle}).sort({'created_at': -1});
        }

        // Media Home Page but there is an user logged in
        if(communities_subscribed!==undefined) {
            posts = await Posts.find().where('community_title').in(user.communities_subscribed).sort({'created_at':-1});
        }else {
            posts = await Posts.find().sort({'created_at':-1});
        }


        res.status(200).json({data:posts});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const createPost = async (req, res) => {
    const {inputData, userId} = req.body;

    try {

        // Create new post and add it to db
        const newPost = await Posts.create({
            created_by: userId,
            title:inputData.title,
            img:inputData.img,
            content:inputData.content,
            community_title:inputData.selected_community,
            upvoted_by:[],
            downvoted_by:[],
            viewed_by:[userId],
            comments:[],
        });


        res.status(200).json({data:newPost});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const votePost = async (req, res) => {
    const {postId, userId, isUpVote} = req.body;
    
    try {
        
        // If is upvote btn clicked then check if user is already in the upvoted_by list. 
        // If so then remove him from it
        // else add him
        
        // If is downvote then same logic as before.

        let updatedPost;

        const post = await Posts.findById(postId);

        if(isUpVote) {    
            if(post.downvoted_by.includes(userId)){
                updatedPost = await Posts.findOneAndUpdate(
                    {_id:postId},
                    {
                        upvoted_by: post.upvoted_by.includes(userId) ? post.upvoted_by.filter((id) => id!==userId) : [...post.upvoted_by, userId],
                        downvoted_by:post.downvoted_by.filter((id) => id!==userId)},
                    {new:true}
                );
            }
            else {
                updatedPost = await Posts.findOneAndUpdate(
                    {_id:postId},
                    {upvoted_by: post.upvoted_by.includes(userId) ? post.upvoted_by.filter((id) => id!==userId) : [...post.upvoted_by, userId]},
                    {new:true}
                );
            }
        }else {
            if(post.upvoted_by.includes(userId)){
                updatedPost = await Posts.findOneAndUpdate(
                    {_id:postId},
                    {
                        downvoted_by: post.downvoted_by.includes(userId) ? post.downvoted_by.filter((id) => id!==userId) : [...post.downvoted_by, userId],
                        upvoted_by:post.upvoted_by.filter((id) => id!==userId)
                    },
                    {new:true}
                );
            }else {
                updatedPost = await Posts.findOneAndUpdate(
                    {_id:postId},
                    {downvoted_by: post.downvoted_by.includes(userId) ? post.downvoted_by.filter((id) => id!==userId) : [...post.downvoted_by, userId]},
                    {new:true}
                );
            }
            
        }
        

        // Send it in the res object 
        res.status(200).json({data:updatedPost});

    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}