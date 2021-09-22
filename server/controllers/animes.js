import User from '../models/user.js';


export const getAnime = async (req, res) => {
    if(!req.userId) return res.status(400).json({message:"No User logged in."});

    try {
        
        const existingUser = await User.findById(req.userId);

        return res.status(200).json({data:existingUser.saved_animes});
    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}

export const addAnime = async (req, res) => {
    const anime = req.body;

    if(!req.userId) return res.status(400).json({message:"No User logged in."});

    try {
        
        const existingUser = await User.findById(req.userId);

        // Check if this animes id is already in the users list
        let animeExistsInList;

        existingUser.saved_animes.forEach((savedAnime) => {
            if(savedAnime.id === anime.mal_id){
                animeExistsInList = true;
                return;
            }
        });

        if(animeExistsInList) return res.status(400).json({message:"This anime is already on this user's list."});

        // If I don't store this in a variable it will throw an error.

        const updatedUser = await User.findOneAndUpdate({_id: existingUser._id}, { saved_animes:[...existingUser.saved_animes, {id:anime.mal_id, added_at:Date.now()}]},{new:true});

        // Return the new anime id to the front-end so that it can be updated in the store
        res.status(200).json({data:anime.mal_id});    
    } catch (error) {
        res.status(500).json({message:"Server error..."});   
    }
}

