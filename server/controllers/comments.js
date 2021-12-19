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
        res.status(200).json({data:{reply, updatedPost}});
    } catch (error) {
        res.status(500).json({message:"Server error..."});
    }
}
