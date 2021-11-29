import React, {useState, useEffect} from 'react';
import * as api from '../../api';
import ReactLoading from 'react-loading';
import {useDispatch} from 'react-redux';
import { addAdmin, addRemoveMod, blockMember, removeMember } from '../../actions/communityActions';


// currentCommunity is an object with the community's title, mod list and admin list.
// When this component mounts it will check if the logged user is admin or moderator for this community.

const MemberTab = ({id, currentCommunity,currentUserId}) => {

    const dispatch = useDispatch();

    const [member, setMember] = useState(null);
    
    const [showAddAdminPopUp, setShowAddAdminPopUp] = useState(false);
    const [memberIsAdmin, setMemberIsAdmin] = useState(currentCommunity.admins.includes(id));
    const [memberIsMod, setMemberIsMod] = useState(currentCommunity.moderators.includes(id));

    const checkMod = () => currentUserId!==null ? currentCommunity.moderators.includes(currentUserId) : false;

    const checkAdmin = () => currentUserId!==null ? currentCommunity.admins.includes(currentUserId) : false;

    const isAdmin = checkAdmin();
    const isMod = checkMod();

    useEffect(async () => {
        if(member===null) {
            const memberInfo = await api.getUserInfo(id);
            setMember(memberInfo.data.data);
        }
    }, [member]);

    const onRemoveMember = () => {
        // When this gets called, it means user is either admin and this member is not an admin, or
        // user is a mod and this member is just a member
        // Dispatch removing member action, checking in the back-end if user is also moderator or not. 
        dispatch(removeMember(currentCommunity.title, id));
    }

    const onBlockMember = () => {
        // Same thing as in onRemoveMember, but this time also include this member's id to the blocked_users list
        dispatch(blockMember(currentCommunity.title, id));
    }

    // Show a pop up asking if user is sure to add admin, since once added it cannot be removed.
    const onAddAdmin = () => setShowAddAdminPopUp(true);


    // Here need to use an if statement with the memberIsMod local state
    // If he is a mod, then user is trying to remove his privileges
    // Else user is trying to add member as mod.
    const onAddRemoveMod = () => dispatch(addRemoveMod(currentCommunity.title, id, memberIsMod));

    // Simply hide the pop-up
    const onCancelAddAdminClick = () => setShowAddAdminPopUp(false); 

    // Dispatch action to add this member as an admin and then hide the pop-up
    const onConfirmAddAdminClick = () => {
        dispatch(addAdmin(currentCommunity.title, id));

        setShowAddAdminPopUp(false);
    }

    return (
           member===null ? 

            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />

               :

            <div className='member-tab-container'>
                <div className="left-container">
                    <img className="avatar-img" src={member.avatar_img} alt="profile_img"/>
                    <p className="username">{`${member.first_name} ${member.last_name}`}</p>
                </div>

                {
                    // The next section is for mods and admins only
                }
                
                {
                    currentUserId!==null && 
                    
                    <div className="privileged-features-container">
                        {
                            // If current user is an admin and member is not an admin, or if he is a mod and this member is not
                            // a moderator or an admin, then the current user can remove or block this member
                            // from the community
                        }
                        {
                            
                            (
                                (
                                    (isAdmin && !currentCommunity.admins.includes(id))  || 
                                    (isMod && !currentCommunity.admins.includes(id) && !currentCommunity.moderators.includes(id))
                                ) 
                                    && id!==currentUserId
                                    &&
                                    
                                    <div className="btns-container">
                                        {
                                            // If logged user is admin then he can add other users as admin or as moderators, 
                                            // as well as remove moderators from being moderators.
                                        }
                                        {
                                            isAdmin 
                                                &&
                                                <div className="admin-btns-container">
                                                    <button onClick={onAddAdmin} className={`btn ${memberIsAdmin ? "disabled-admin-btn" : "admin-btn"}`}
                                                    disabled={memberIsAdmin}
                                                    > 
                                                        {`${memberIsAdmin ? "Already Admin" : "Add Admin"}`}
                                                    </button>
                                                
                                                    <button onClick={onAddRemoveMod} className={`btn ${memberIsMod ? 'remove-mod-btn' : 'mod-btn'}`}>
                                                        {memberIsMod ? 'Remove Mod' : 'Add Mod'}
                                                    </button>
                                                </div>                                            
                                        }

                                        <button onClick={onRemoveMember} className="btn remove-btn">
                                            Remove
                                        </button>

                                        <button onClick={onBlockMember} className="btn block-btn">
                                            Block
                                        </button>

                                    </div>
                            )
                        }

                    </div>
                }
                

                {
                    // Show if admin wants to add this member as admin
                }

                {
                    showAddAdminPopUp && 
                    
                    <div className="add-admin-pop-up-container">
                        <div className="add-admin-pop-up">
                            <p className="alert-text">Are you sure you want to add this member as admin?</p>
                            <p className="alert-text-secondary">Once done can't be undone</p>

                            <div className="btns-container">
                                <button onClick={onCancelAddAdminClick} className="btn cancel-btn">
                                    Cancel
                                </button>

                                <button onClick={onConfirmAddAdminClick} className="btn confirm-btn">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
    )
}

export default MemberTab;
