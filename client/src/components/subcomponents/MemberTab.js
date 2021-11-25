import React, {useState, useEffect} from 'react';
import * as api from '../../api';

const MemberTab = ({id, currentCommunity,currentUserId}) => {

    const [member, setMember] = useState(null);
    
    useEffect(() => {
        if(member===null) fetchMemberInfo();
    }, []);

    const fetchMemberInfo = async () => {
        const memberInfo = await api.getUserInfo(id);

        setMember(memberInfo);
    }

    return (
        <div className="member-tab-container">
           <p>{id}</p>
        </div>
    )
}

export default MemberTab;
