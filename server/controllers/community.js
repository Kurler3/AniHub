import Community from '../models/community.js';
import User from '../models/user.js';

export const createCommunity = async (req, res) => {
    const {title, description, avatar_img} = req.body;

    if(!req.userId) return res.status(400).json({message:"No User logged in."});

    try {
        // Check if there exists any community with the same name
        const existingCommunity = await Community.findOne({title: title});

        if(existingCommunity) return res.status(400).json({message:"There exists a community with this name already."});

        // Create the community

        const newCommunity = await Community.create({
            title:title,
            description:description,
            avatar_img:avatar_img,
            admins:[req.userId],
            moderators:[],
            members:[req.userId],
            blocked_users:[],
            discord_link:'',
        });

        // Update user's subscribed communities list in database
        const currentUser = await User.findById(req.userId);

        // Add the title in the array because its unique
        // and won't need to search for community in back-end by id 
        // when creating a post 
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
        
        // Have to limit otherwise they will be too many.
        const communities = await Community.find()
            .sort({created_at:-1})
            .limit(20);

        res.status(200).json({data:communities});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const updateSubUnsubCommunity = async (req, res) => {
    
    const {userId, communityTitle, isUnSub} = req.body;
    
    try {
        
        const community = await Community.findOne({title:communityTitle});

        let updatedCommunity;
        // If is sub then just find community by title and add user id to members array
        // If unsub then check if user id is in the moderators array. If so, then remove it from there and 
        // also from the members array 

        // If not unsubbing then add user to members.
        if(!isUnSub) {

            if(community.blocked_users.includes(userId)) res.status(403).json({message:"This user is blocked from this community"});

            updatedCommunity = await Community.findOneAndUpdate(
                {title:communityTitle},
                {members:[...community.members, userId]},
                {new:true},
            );

        }
        else {

            // If this user is a moderator then remove it from the moderators list as well
            if(community.moderators.includes(userId)){
                updatedCommunity = await Community.findOneAndUpdate(
                    {title:communityTitle},
                    {
                        members:community.members.filter((id) => id!==userId), 
                        moderators: community.moderators.filter((id) => id!==userId),
                    },
                    {new:true},
                );
            } 
            else {
                updatedCommunity = await Community.findOneAndUpdate(
                    {title:communityTitle},
                    {
                        members:community.members.filter((id) => id!==userId), 
                    },
                    {new:true}
                );
            } 
        }

        // Return updated community object
        res.status(200).json({data:updatedCommunity});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const removeMember = async (req, res) => {

    const {communityTitle, memberId} = req.body;

    try {
        
        // Find community in db
        // Check if this user is also moderator
        // Remove him entirely from this object's array

        const community = await Community.findOne({title:communityTitle});

        const updatedCommunity = await Community.findOneAndUpdate(
            {title:communityTitle},
            {
                members:community.members.filter((id) => id!==memberId),
                moderators: community.moderators.includes(memberId) ? community.moderators.filter((id) => id!==memberId) : community.moderators,
            },
            {new:true}
        );
        
        res.status(200).json({data:updatedCommunity});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const blockMember = async (req, res) => {
    
    const {communityTitle, memberId} = req.body;
    
    try {
        
        const community = await Community.findOne({title:communityTitle});

        const updatedCommunity = await Community.findOneAndUpdate(
            {title:communityTitle},
            {
                members:community.members.filter((id) => id!==memberId),
                moderators:community.moderators.includes(memberId) ? community.moderators.filter((id) => id!==memberId) : community.moderators,
                blocked_users: [...community.blocked_users, memberId]
            },
            {new:true}
        );

        res.status(200).json({data:updatedCommunity});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }   
}

export const addAdmin = async (req, res) => {

    const {communityTitle, memberId} = req.body;

    try {
        
        const community = await Community.findOne({title:communityTitle});

        const updatedCommunity = await Community.findOneAndUpdate(
            {title:communityTitle},
            {admins:[...community.admins, memberId]},
            {new:true}
        );


        res.status(200).json({data:updatedCommunity});
    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}