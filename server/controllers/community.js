import Community from '../models/community.js';

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


        // console.log(newCommunity);

        // Send the whole object 
        res.status(200).json({data:newCommunity});

    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}

export const searchCommunities = async (req, res) => {
    const communityTitle = req.body;

    try {
        // Search for communities that match this name
        

        // Send the communities array

    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}