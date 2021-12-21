import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ReactLoading from 'react-loading';

const Profile = () => {
    const location = useLocation();

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        if(loggedUser===null) setLoggedUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        loggedUser!==null ? 

            <div className='profile-container'>
                {loggedUser.result._id}
            </div>
                :

            <div className="no-user-container">
                <ReactLoading type='bars' color='#FFBC1E' height={200} width={200} />
                </div>
    )
}

export default Profile
