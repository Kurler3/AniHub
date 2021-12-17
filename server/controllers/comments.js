import Comment from "../models/comment.js";

export const getComments = async (req, res) => {

    const {postId} = req.body;

    try {
        const comments = await Comment.find({post_id: postId, isSubComment:false})
            .sort({created_at:-1});

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

export const getSubComments = async (req, res) => {
    const {subCommentsIds} = req.body;
    
    try {
        const subComments = await Comment.find()
            .where('_id').in(subCommentsIds).sort({'created_at':-1});

        res.status(200).json({data:subComments});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const replyComment = async (req, res) => {
    const {commentId, userId, postId, input} = req.body;

    try {
        const comment = await Comment.findById(commentId);

        const reply = await Comment.create({
            created_by:userId,
            post_id:postId,
            text:input,
            upvoted_by:[],
            downvoted_by:[],
            is_sub_comment:true,
            sub_comments:[]
        });

        const updatedComment = await Comment.findOneAndUpdate(
          {_id:commentId},
          {sub_comments:[reply._id, ...comment.sub_comments]},
          {new:true}  
        );

        res.status(200).json({data:updatedComment});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}
