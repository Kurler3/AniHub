import React, {useState} from 'react';
import PasswordTextInput from './subcomponents/PasswordTextInput';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { signIn, signUp } from '../actions/authActions';
import { GoogleLogin } from 'react-google-login';
import FileBase64 from 'react-file-base64';
import {validateEmail} from '../utils/helper_functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AuthForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // Login interface initially
    const [isSignUp, setIsSignUp] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [invalidInputPopVisible, setInvalidInputPopVisible] = useState(false);

    const [inputData, setInputData] = useState({
        firstName: '',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        avatar_img:'',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        // If its signup then dispatch signup action
        // else dispatch login action
        //!isSignUp ? dispatch(signIn(inputData, history)) : dispatch(signUp(inputData, history));

        if(!isSignUp) {
            // Sign in
            // Check for valid email
            if(validateEmail(inputData.email) && inputData.password.length >= 6) {
                dispatch(signIn(inputData, history));
            }else {
                //Display little pop-up
                setInvalidInputPopVisible(true);
            }
        }else {
            // Sign up
            // Use validation function for email
            if(canSignUp()) {
                dispatch(signUp(inputData, history));
            }else {
                setInvalidInputPopVisible(true);
            }
        }
    }

    const canSignUp = () => inputData.firstName.length > 0 
                            && inputData.lastName.length > 0 
                            && validateEmail(inputData.email)
                            && inputData.password.length >= 6
                            && inputData.confirmPassword === inputData.password

    const onPasswordVisibleChange = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const onInputChange = (e) => setInputData({...inputData, [e.target.name]:e.target.value});

    const onGoogleSuccess = (res) => {
        console.log(res);
    }

    const onGoogleFailure = (err) => {
        console.log(err);
    }

    return (
        <div className="auth-form-container">
            <form className="auth-form">
                {isSignUp ? <div className="signup-name-inputs-container">
                    <input type="text" className="auth-form-input" placeholder="First Name" name="firstName" onChange={onInputChange}/>
                    <input type="text" className="auth-form-input" placeholder="Last Name" name="lastName" onChange={onInputChange}/>
                </div> 
                    : <div></div>}

                <input type="email" className="auth-form-input" placeholder="Email" name="email" onChange={onInputChange}/>
                
                <PasswordTextInput name="password" placeholder="Password" isVisible={isPasswordVisible} onVisibleChange={onPasswordVisibleChange} onInputChange={onInputChange} />

                {
                    isSignUp ?  <div className="auth-confirm-pass-container">
                        <input type={isPasswordVisible? "text" :"password"}className="auth-form-input confirm-pass-input" placeholder="Confirm Password" name="confirmPassword" onChange={onInputChange}/>
                        <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setInputData({...inputData, avatar_img:base64})}
                    />
                    </div> : <div></div> 
                }
            </form>

            <button onClick={onSubmit} className="auth-btn" type="submit">{isSignUp ? 'SignUp' : 'Login'}</button>
            
            <GoogleLogin
                className="google-auth-btn"
                clientId="1053075204516-71o9eodap7e5ckokhdrtevg757i7etbe.apps.googleusercontent.com"
                buttonText="Sign In with Google"
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
                cookiePolicy={'single_host_origin'}
            />

            <p className="switch-mode" onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Already have an account? Login!' : "Don't have an account? SignUp!"}</p>

            {invalidInputPopVisible && <div className="invalid-input-container">
                <p className="text-container">
                    Invalid Input. Please try again
                </p>
                <button onClick={() => setInvalidInputPopVisible(false)} className="close-btn">
                    <FontAwesomeIcon className="btn-icon" icon={faTimes} />
                </button>
            </div>}
        </div>
    )
}

export default AuthForm;
