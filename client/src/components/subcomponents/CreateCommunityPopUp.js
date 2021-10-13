import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CreateCommunityPopUp = ({setCreateCommunityVisible}) => {
    
    const [inputData, setInputData] = useState({
        title:'',
        description:'',
        avatar_img:'',
    });
    
    return (
        <div className="overlay">
                    <div className="create-community-container">
                        <div className="title-container">
                            <p className="title">
                                Create a community
                            </p>
                            <FontAwesomeIcon onClick={() => setCreateCommunityVisible(false)} className="icon" icon={faTimes} />
                        </div>
                        <div className="title-input-section">
                            <div className="title-text">
                                <p className="title">Title</p>
                                <p className="small-text">Community names cannot be changed later.</p>
                            </div>

                            <div className="title-input-container">
                                <input placeholder="Title" type="text" className="input" />
                                <p className="char-counter">17 characters remaining</p>
                            </div>
                        </div>
                        
                        <div className="description-input-section">
                            
                        </div>

                        <div className="btns-container">
                            <button onClick={() => setCreateCommunityVisible(false)} className="cancel-btn">
                                Cancel
                            </button>
                            <button className="create-btn">
                                Create Community
                            </button>
                        </div>
                    </div>
                </div>
    )
}

export default CreateCommunityPopUp;
