import Community from '../models/community.js';
import User from '../models/user.js';

export const createCommunity = async (req, res) => {
    const {title, description, avatar_img} = req.body;

    if(!req.userId) return res.status(400).json({message:"No User logged in."});

    try {
        // Check if there exists any community with the same name as the data['title']

        const existingCommunity = await Community.findOne({title: title});

        if(existingCommunity) return res.status(400).json({message:"There exists a community with this name already."});

        // Create the community

        const newCommunity = await Community.create({
            title:title,
            description:description,
            avatar_img:avatar_img,
            admins:[req.userId],
            moderators:[req.userId],
            members:[req.userId],
            blocked_users:[],
            discord_link:'',
        });

        // Update user's subscribed communities list in database
        const currentUser = await User.findById(req.userId);

        const updatedUser = await User.updateOne(
            {_id:req.userId},
            {communities_subscribed:[...currentUser.communities_subscribed, newCommunity.title]}
        );

        // Send the whole object 
        res.status(200).json({data:newCommunity});

    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}

export const searchCommunities = async (req, res) => {
    const {communityName} = req.body;

    try {
        // Search for communities that start this name
        const communities = await Community
                                    .find({'title': {$regex: '^' + communityName, $options: 'i' }})
                                    .sort({created_at:-1});
        // Send the communities array
        res.status(200).json({data:communities});
    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}

export const searchCommunity = async (req, res) => {
    const {communityName} = req.body;

    try {
        const communitySearched = await Community.findOne({title:communityName});

        res.status(200).json({data:communitySearched});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const getAllCommunities = async (req, res) => {
    try {
        
        const communities = await Community.find()
            .sort({created_at:-1})
            .limit(20);

        res.status(200).json({data:communities});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}