import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    created_by:{
        type:String,
        required:true,
    },
    text:{
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
    sub_comments:[
        {
            type:String,
        }
    ],
    created_at:{
        type:Date,
        default:Date.now(),
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;