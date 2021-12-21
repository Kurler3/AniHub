import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const getComments = async (req, res) => {

    const {postId} = req.body;

    try {
        const comments = await Comment.find({post_id: postId})
            .sort({created_at:-1});

        res.status(200).json({data:comments});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const createComment = async (req, res) => {
    
    const {createdBy, postId, content, isSubComment} = req.body;
    
    try {

        // Add new comment to db
        const comment = await Comment.create({
            created_by:createdBy,
            post_id:postId,
            text:content,
            upvoted_by:[],
            downvoted_by:[],
            is_sub_comment:isSubComment,
            sub_comments:[]
        });

        const post = await Post.findById(postId);
        // Update Post object
        const updatedPost = await Post.findOneAndUpdate(
            {_id:postId},
            {comments:[comment._id, ...post.comments]},
            {new:true}
        );
    
        res.status(200).json({newComment:comment, updatedPost:updatedPost});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

// export const getSubComments = async (req, res) => {
//     const {subCommentsIds} = req.body;
    
//     try {
//         const subComments = await Comment.find()
//             .where('_id').in(subCommentsIds).sort({'created_at':-1});

//         res.status(200).json({data:subComments});
//     } catch (error) {
//         res.status(500).json({message:"Server error..."});
//     }
// }

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

        // Update Post too

        const post = await Post.findById(postId);

        const updatedPost = await Post.findOneAndUpdate(
            {_id:postId},
            {comments:[reply._id, ... post.comments]},
            {new:true}
        );

        // No need to return update posts state. 
        res.status(200).json({data:{reply, updatedComment}});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}

export const voteComment = async (req, res) => {
    const {isUpVoting, userId, commentId} = req.body;
    
    try {
        let updatedComment;
        // Find Comment
        const comment = await Comment.findById(commentId);
        // Check if user is already in either array

        // If upvoting and user is in array then remove him from it.
        // If not in array then check if he is in down_voted array. 

        if(isUpVoting) {
            if(comment.upvoted_by.includes(userId)) {
                updatedComment = await Comment.findOneAndUpdate(
                    {_id:commentId},
                    {upvoted_by:comment.upvoted_by.filter((id) => id!==userId)},
                    {new:true}
                );
            }
            else if(comment.downvoted_by.includes(userId)) {
                // Add to upvoted_by and remove from downvoted_by
                updatedComment = await Comment.findOneAndUpdate(
                    {_id:commentId},
                    {
                        upvoted_by: [...comment.upvoted_by, userId],
                        downvoted_by:comment.downvoted_by.filter((id) => id!==userId),
                    },
                    {new:true},
                );
            }else {
                // Just add to upvoted_by
                updatedComment = await Comment.findOneAndUpdate(
                    {_id:commentId},
                    {upvoted_by:[...comment.upvoted_by, userId]},
                    {new:true}
                );
            }
        }else {
            if(comment.downvoted_by.includes(userId)){
                updatedComment = await Comment.findOneAndUpdate(
                    {_id:commentId},
                    {downvoted_by:comment.downvoted_by.filter((id) => id!==userId)},
                    {new:true}
                );
            }else if (comment.upvoted_by.includes(userId)){
                updatedComment = await Comment.findOneAndUpdate(
                    {_id:commentId},
                    {
                        downvoted_by: [...comment.downvoted_by, userId],
                        upvoted_by:comment.upvoted_by.filter((id) => id!==userId),
                    },
                    {new:true},
                );
            }else {
                updatedComment = await Comment.findOneAndUpdate(
                    {_id:commentId},
                    {downvoted_by:[...comment.downvoted_by, userId]},
                    {new:true}
                );
            }
        }

        res.status(200).json({data:updatedComment});
    } catch (error) {
        res.status(500).json({message:'Server error...'});
    }
}