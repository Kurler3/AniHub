import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FileBase64 from 'react-file-base64';
import {useDispatch} from 'react-redux';
import { createCommunity } from '../../actions/communityActions';

const CreateCommunityPopUp = ({setCreateCommunityVisible}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const [isInvalidDataPopUpShow, setIsInvalidDataPopUpShow] = useState(false);

    const maxInputLength = {
        title:17,
        description:80,
    }
    const [inputCharLength, setInputCharLength] = useState({
        title:17,
        description:80,
    })

    const [inputData, setInputData] = useState({
        title:'',
        description:'',
        avatar_img:'',
    });
    
    const onInputChange = (e) => {
        // Check if user can still input data
        if(maxInputLength[e.target.name]-e.target.value.length>=0){
            setInputData({...inputData, [e.target.name]:e.target.value});

            setInputCharLength({...inputCharLength, [e.target.name]: maxInputLength[e.target.name] - e.target.value.length});
        }else e.preventDefault();
    }

    const onSubmitData = () => {
        if(inputData['title'].length > 0 && inputData['description'].length > 0 && inputData['avatar_img'].length > 0) {

            // Dispatch action with this data
            dispatch(createCommunity(inputData, history));
        }
        else {
            // Show a snackbar
            setIsInvalidDataPopUpShow(true);
        }
    }

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
                                <input onChange={onInputChange} placeholder="Title" type="text" name="title" className="input" maxLength={maxInputLength['title']}/>
                                <p className="char-counter">{inputCharLength['title']} characters remaining</p>
                            </div>
                        </div>
                        
                        <div className="description-input-section">
                            <p className="title">Description</p>
                            <textarea onChange={onInputChange}  placeholder="Small description" type="text" name="description" className="description-input" maxLength={maxInputLength['description']}/>
                            <p className="char-counter">{inputCharLength['description']} chars remaining</p>
                        </div>

                        <div className="avatar-img-section">
                            <p className="title">Community Avatar</p>
                            <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setInputData({...inputData, avatar_img:base64})}
                            />
                        </div>

                        <div className="btns-container">
                            <button onClick={() => setCreateCommunityVisible(false)} className="cancel-btn">
                                Cancel
                            </button>
                            <button onClick={onSubmitData} className="create-btn">
                                Create Community
                            </button>
                        </div>


                        {isInvalidDataPopUpShow &&
                    
                        <div className="invalid-data-container">
                            <p className="message">Please fill all the fields!</p>
                            <button onClick={() => setIsInvalidDataPopUpShow(false)} className="close-btn">
                                Close
                            </button>
                        </div>
                        }
                    </div>
                </div>
    )
}

export default CreateCommunityPopUp;
