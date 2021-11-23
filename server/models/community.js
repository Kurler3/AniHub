import mongoose from 'mongoose';

const CommunitySchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    avatar_img:{
        type:String,
        default:''
    },
    admins:[
        {
            type:String,
            required:true
        }
    ],
    moderators:[
        {
            type:String,
            required:true
        }
    ],
    members:[
        {
            type:String
        }
    ],
    blocked_users:[
        {
            type:String
        }, 
        
    ],
    description:{
        type:String,
        required:true
    },
    discord_link:{
        type:String,
        default:''
    },
    created_at:{
        type:Date,
        default:Date.now(),
    }
});

const Community = mongoose.model('Community', CommunitySchema);

export default Community;