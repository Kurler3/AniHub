import React, {useState, useEffect} from 'react';
import * as api from '../../api';
import ReactLoading from 'react-loading';


// currentCommunity is an object with the community's title, mod list and admin list.
// When this component mounts it will check if the logged user is admin or moderator for this community.

const MemberTab = ({id, currentCommunity,currentUserId}) => {

    const [member, setMember] = useState(null);
    
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

    }

    const onBlockMember = () => {

    }

    const onAddAdmin = () => {
        // Show a pop up asking if user is sure to add admin, since once added it cannot be removed.
    }

    const onAddRemoveMod = () => {
        
        
    }

    return (
           member===null ? 

            <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />

               :

            <div className="member-tab-container">
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
                            // If current user is an admin or if he is a mod and this member is not
                            // a moderator or an admin, then the current user can remove or block this member
                            // from the community
                        }
                        {
                            
                            (
                                (
                                    isAdmin || 
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
                                            isAdmin && 
                                            
                                                <button onClick={onAddAdmin} className="btn admin-btn" 
                                                disabled={memberIsAdmin}
                                                >
                                                    Add Admin
                                                </button>
                                                &&
                                                <button onClick={onAddRemoveMod} className="btn mod-btn">
                                                    {memberIsMod ? 'Remove Mod' : 'Add Mod'}
                                                </button>
                                            
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

            </div>
    )
}

export default MemberTab;
