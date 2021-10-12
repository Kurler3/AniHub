import Posts from '../models/post.js';
import User from '../models/user.js';
import {MEDIA_POST_FILTERS} from '../constants.js';


export const getMediaHomePosts = async (req, res) => {
    const filter = req.body;

    try {

        let sort_object;

        if(filter === MEDIA_POST_FILTERS[0]) sort_object = {'viewed_by_length' : -1};
        else if (filter === MEDIA_POST_FILTERS[1]) sort_object = {'created_at': -1};
        else sort_object = {'total_votes':-1};

        // Popular (most viewed first)
        let posts;

        // Check if there's any user logged in
        if(req.userId){
            // Only posts from communities subscribed by user are shown    
            const user = await User.findById(req.userId);

            posts = await Posts.find().
                                where('community_id').in(user.communities_subscribed)
                                .limit(5)
                                .sort(sort_object);
        }else {
            // Any post is shown
            posts = await Posts.find()
                            .limit(5)
                            .sort(sort_object);
        }

        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}