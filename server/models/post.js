import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    created_by:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    content:{
        type:String,
        required:true
    },
    community_title: {
        type:String,
        required:true,
    },
    upvoted_by:[
        {
            type:String,
        }
    ],
    downvoted_by:[
        {
            type:String,
        }
    ],
    // Whenever user clicks on post and launches this posts page it updates the database collection
    viewed_by:[
        {
            type:String
        }
    ],
    created_at:{
        type:Date,
        default:Date.now(),
    },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;