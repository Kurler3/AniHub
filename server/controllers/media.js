import Posts from '../models/post.js';
// import User from '../models/user.js';
// import {MEDIA_POST_FILTERS} from '../constants.js';

export const getPosts = async (req, res) => {
    const {communityTitle, communities_subscribed} = req.body;

    try {
        let posts;

        if(communityTitle!==null) {
            posts = await Posts.find({community_title:communityTitle}).sort({'created_at': -1});
        }

        // Media Home Page but there is an user logged in
        if(communities_subscribed!==null) {
            posts = await Posts.find().where('community_title').in(user.communities_subscribed).sort({'created_at':-1});
        }else {
            posts = await Posts.find().sort({'created_at':-1});
        }

        console.log(posts);

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



// export const getPosts = async (req, res) => {
//     const filter = req.body;

//     try {

//         let sort_object;

//         if(filter === MEDIA_POST_FILTERS[0]) sort_object = {'viewed_by_length' : -1};
//         else if (filter === MEDIA_POST_FILTERS[1]) sort_object = {'created_at': -1};
//         else sort_object = {'total_votes':-1};

//         // Popular (most viewed first)
//         let posts;

//         // Check if there's any user logged in
//         if(req.userId){
//             // Only posts from communities subscribed by user are shown    
//             const user = await User.findById(req.userId);

//             posts = await Posts.find().
//                                 where('community_id').in(user.communities_subscribed)
//                                 .limit(5)
//                                 .sort(sort_object);
//         }else {
//             // Any post is shown
//             posts = await Posts.find()
//                             .limit(5)
//                             .sort(sort_object);
//         }

//         return res.status(200).json(posts);
//     } catch (error) {
//         res.status(500).json({message:"Server error..."});   
//     }
// }