import Comment from "../models/comment.js";

export const getComments = async (req, res) => {

    const {postId} = req.body;

    try {
        const comments = await Comment.find({post_id: postId, isSubComment:false});

        res.status(200).json({data:comments});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const createComment = async (req, res) => {
    
    const {createdBy, postId, content, isSubComment} = req.body;
    
    try {
        
        const comment = await Comment.create({
            created_by:createdBy,
            post_id:postId,
            text:content,
            upvoted_by:[],
            downvoted_by:[],
            is_sub_comment:isSubComment,
            sub_comments:[]
        });

        res.status(200).json({data:comment});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

