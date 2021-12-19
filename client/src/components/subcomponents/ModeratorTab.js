import React, {useEffect, useState} from 'react';
import * as api from "../../api";
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

const ModeratorTab = ({id}) => {

    const [moderator, setModerator] = useState();

    useEffect(() => {
        if(!moderator) fetchModeratorInfo(id);
    }, []);

    const fetchModeratorInfo = async (id) => {
        const {data} = await api.getUserInfo(id);

        setModerator(data.data);
    }

    return (
        <div className="moderator-tab-container">
            {!moderator ? 
                <ReactLoading type='bubbles' color='#C8C8C8' height={30} width={50} />
            : 
                <Link className="moderator-row" to={`/profile/${moderator._id}`}>
                    <img className="avatar" src={moderator.avatar_img} alt="avatar"/>
                    <p className="name">{`${moderator.first_name} ${moderator.last_name}`}</p>
                </Link>
            }
        </div>
    )
}

export default ModeratorTab;
