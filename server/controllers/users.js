import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res) => {

    const {email, password} = req.body;

    try {
        // Check if exists user with this email on the database
        const existingUser = await User.findOne({email: email});

        if(!existingUser) return res.status(400).json({message: 'User with this email not found in the database.'}); 

        // Check if the password inputted matches the password in the database
        const passwordsMatch = await bcryptjs.compare(password, existingUser.password);

        if(!passwordsMatch) return res.status(400).json({message: "Invalid credentials."});

        // Create the JWT token
        const token = jwt.sign({email:existingUser.email, id:existingUser._id, saved_animes:existingUser.saved_animes}, 'test', {expiresIn:'1h'});

        // Set req headers

        // return the data with res.json
        res.status(200).json({result: existingUser, token});    

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went wrong with the server... :('});        
    }

}

export const signUp = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword, avatar_img} = req.body;
    
    try {
        // Check if there exists an user with this email already
        const existingUser = await User.findOne({email:email});

        if(existingUser) return res.status(400).json({message:'There already exists an user with this email.'});

        // Check if password and confirmPassword match
        if(password!==confirmPassword) return res.status(400).json({message:"Passwords don't match."});

        // Encrypt the password

        const encryptedPassword = await bcryptjs.hash(password, 7);
        
        // Save to user to database
        const newUser = await User.create({
            first_name:firstName,
            last_name:lastName,
            email:email,
            password:encryptedPassword,
            saved_animes:[],
            avatar_img: avatar_img,
        });

        const token = jwt.sign({email:newUser.email, id:newUser._id,saved_animes:[]}, 'test', {expiresIn:'1h'});

        res.status(200).json({result:newUser, token:token});

    } catch (error) {
        res.status(500).json({message:"Something went wrong with the server... :("});
    }
}

export const getUserInfo = async (req, res) => {
    const {id} = req.query;
    
    try {
        
        const user = await User.findById(id);

        res.status(200).json({data:{
            id:user._id,
            firstName:user.first_name,
            lastName:user.last_name,
            avatarImg:user.avatar_img,
            email:user.email,
            createdAt:user.createdAt,
            savedAnimes:user.saved_animes,
            communitiesSubscribed:user.communities_subscribed,
            }
        });
    } catch (error) {
        res.status(500).json({message:"Something went wrong with the server..."});
    }
}

export const subUnSub = async (req, res) => {
    const {userId, communityTitle, isUnSub} = req.body;
    
    try {
        const user = await User.findById(userId);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                communities_subscribed: isUnSub ? user.communities_subscribed.filter((title) => title!==communityTitle) 
                    :
                        [...user.communities_subscribed, communityTitle]

            },
            {new:true},
        );

        res.status(200).json({data:updatedUser.communities_subscribed});
    } catch (error) {
        res.status(500).json({message:"Something went wrong with the server..."});
    }
}