import React, {useState} from 'react';
import PasswordTextInput from './subcomponents/PasswordTextInput';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { signIn, signUp } from '../actions/authActions';
import { GoogleLogin } from 'react-google-login';

const AuthForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // Login interface initially
    const [isSignUp, setIsSignUp] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [inputData, setInputData] = useState({
        firstName: '',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        // If its signup then dispatch signup action
        // else dispatch login action
        !isSignUp ? dispatch(signIn(inputData), history) : dispatch(signUp(inputData), history);
    }

    const onPasswordVisibleChange = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const onInputChange = (e) => setInputData({...inputData, [e.target.name]:e.target.value});

    const onGoogleSuccess = (res) => {
        console.log(response);
    }

    const onGoogleFailure = (err) => {
        console.log(response);
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
                    isSignUp ? <input type={isPasswordVisible? "text" :"password"}className="auth-form-input" placeholder="Confirm Password" name="confirmPassword" onChange={onInputChange}/> : <div></div> 
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
        </div>
    )
}

export default AuthForm;
