import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { VOTE_STATES } from '../../utils/constants';
import { useLocation } from 'react-router-dom';

const VotingContainer = ({item,onUpVoteClicked, onDownVoteClicked}) => {

    const location = useLocation();

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [totalVotes, setTotalVotes] = useState(item.upvoted_by !== undefined ? item.upvoted_by.length - item.downvoted_by.length : 0);

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    const checkVoteState = () => {
        if(loggedUser!==null && item.upvoted_by !== undefined) {
            if(item.upvoted_by.includes(loggedUser.result._id)) return VOTE_STATES[0];
            else if(item.downvoted_by.includes(loggedUser.result._id)) return VOTE_STATES[1];
            else return VOTE_STATES[2];
        }
        return VOTE_STATES[2];
    }

    const [voteState, setVoteState] = useState(checkVoteState());

    const setNewVoteState = (isUpVoting) => {
        let newState;
        let newVoteCount;

        switch(voteState) {
            // If current state is upvoted and user clicked in upvote again then he wants to remove his upvote
            case VOTE_STATES[0]:
                newState = isUpVoting ? VOTE_STATES[2] : VOTE_STATES[1];
                newVoteCount = isUpVoting ? totalVotes - 1 : totalVotes - 2;
                break;
            case VOTE_STATES[1]:
                newState = isUpVoting ? VOTE_STATES[0] : VOTE_STATES[2];
                newVoteCount = isUpVoting ? totalVotes + 2 : totalVotes - 1;
                break;
            case VOTE_STATES[2]:
                newState = isUpVoting ? VOTE_STATES[0] : VOTE_STATES[1];
                newVoteCount = isUpVoting ? totalVotes + 1 : totalVotes - 1;
                break;
        }

        setVoteState(newState);

        setTotalVotes(newVoteCount);
    }

    const onUpVoteClick = () => {
        onUpVoteClicked();
        setNewVoteState(true);
    }

    const onDownVoteClick = () => {
        onDownVoteClicked();
        setNewVoteState(false);
    }

    return (
        <div className="voting-container">
                <div id="up-vote" onClick={onUpVoteClick} className={`vote-icon up ${voteState===VOTE_STATES[0] ? 'upvoted' : ''}`}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </div>
                <p className="total-votes">{totalVotes}</p>
                <div id="down-vote" onClick={onDownVoteClick} className={`vote-icon down ${voteState===VOTE_STATES[1] ? 'downvoted' : ''}`}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
        </div>
    )
}

export default VotingContainer;
