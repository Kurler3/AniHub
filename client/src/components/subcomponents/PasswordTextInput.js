import { faUnlockAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const PasswordTextInput = ({name, placeholder, isVisible, onVisibleChange, onInputChange}) => {
    return (
        <div className="auth-password-input">
            <input type={isVisible ? 'text' : "password" }className="auth-form-input" placeholder={placeholder} name={name} onChange={onInputChange}/>
            <div className="hide-password-icon" onClick={onVisibleChange}>
                <FontAwesomeIcon icon={isVisible ? faLock : faUnlockAlt}/>
            </div>
        </div>
    )
}

export default PasswordTextInput
