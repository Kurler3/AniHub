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
    createdAt: {
        type:Date,
        default: Date.now()
    },
    saved_animes: [{
        id:String,
        added_at:{
            type:Date,
            default: Date.now()
        }
    }],
    currently_watching: [{
            id: {
                type:String,
                required:true
            },
            current_episode: {
                type:String,
                default:"1"
            }
        }
    ],
    done_watching: [String]
});

const User = mongoose.model('User', UserSchema);

export default User;