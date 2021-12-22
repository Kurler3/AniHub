import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ReactLoading from 'react-loading';
import {getUserInfo} from '../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { dateToString} from '../utils/helper_functions';

const Profile = () => {
    const location = useLocation();

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));

        if(userInfo===null && loggedUser!==null) fetchUserInfo();
    }, [location]);

    const fetchUserInfo = async () => {
        const info = await getUserInfo(loggedUser.result._id);

        console.log(info.data.data);
        setUserInfo(info.data.data);
    }


    return (
        loggedUser!==null && userInfo!==null ? 

            <div className='profile-container'>
                <div className="upper-container">
                    <div className="user-info-container">
                        <img src={userInfo.avatarImg} alt="avatar" className='profile-avatar'/>
                        <div className="user-info">
                            <p className='user-name'>{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                            <p className="created-at">{dateToString(userInfo.createdAt)}</p>
                        </div>
                    </div>
                    <div className="settings-icon-container">
                        <FontAwesomeIcon icon={faCog} />
                    </div>
                </div>

                <div className="lower-container">

                </div>
                
            </div>
                :

            <div className="no-user-container">
                <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
                </div>
    )
}

export default Profile
