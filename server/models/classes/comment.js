import { v4 as uuidv4 } from 'uuid';
class Comment {
    constructor(createdBy, content, upvotedBy, downVotedBy, subComments) {
        this.id = uuidv4();
        this.content = content;
        this.upvotedBy = upvotedBy;
        this.downVotedBy = downVotedBy;
        this.subComments = subComments;
        this.createdAt = Date.now();
    }
    
}