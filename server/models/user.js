import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    avatar_img: {
        type:String,
        default:''
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
    saved_animes: [{
        id:String,
        added_at:{
            type:Date,
            default: Date.now()
        },
        current_episode: {
            type:Number,
            default:1
        }
    }],
    communities_subscribed: [String],
});

const User = mongoose.model('User', UserSchema);

export default User;