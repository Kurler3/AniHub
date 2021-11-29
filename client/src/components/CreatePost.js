import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import FileBase64 from 'react-file-base64';

const CreatePost = () => {

    const params = useParams();

    const communityName = params.communityName !== undefined ? params.communityName : null;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [inputData, setInputData] = useState({
        selected_community: communityName!==null ? communityName :'Choose a community',
        title:"",
        content:"",
        img:"",
    });

    useEffect(() => {
       if(user===null) setUser(JSON.parse(localStorage.getItem('profile')));
    },[]);

    const onInputDataChange = (e) => setInputData({...inputData,[e.target.name]:e.target.value});

    return (
        <div className="create-post-page-container">

            <div className="create-post-container">

                <p className="title">Create a post</p>

                <form className="create-post-form">
                    <select name="selected_community" className="select-community-input" onChange={onInputDataChange} value={inputData.selected_community}>
                            {user.result.communities_subscribed.map((title) => <option className="select-option" value={title}>{title}</option>)}
                    </select>
                    <input className="title-input" placeholder="Title..." onChange={onInputDataChange} name="title" maxLength="300"/>
                    <textarea className="content-input" placeholder="Content..." onChange={onInputDataChange} name="content"/>
                    <div className="img-input-container">
                        <p className="title">Choose an image</p>
                        <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setInputData({...inputData, img:base64})}
                        />
                    </div>
                    <div className="post-btn-container">
                        <button className="post-btn">
                            POST
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default CreatePost;
