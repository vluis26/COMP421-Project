import { useState } from 'react';
import './Login.css';

function Login() {
    const [isEmployee, setIsEmployee] = useState(false);
    const toggleEmployee = () => {
        setIsEmployee(!isEmployee);
    };

    const [isClosing, setClose] = useState(false);
    const closeLogin = () => {
        setClose(!isClosing);
    };

    return(
        <>
        {isClosing ? null :
            <div id='loginBox'>
                <div>
                    <button className='bExit' onClick={closeLogin}>X</button>
                </div>
                <div>
                    <h2>Customer Login</h2>
                </div>
                <div className='entryField'>
                    <div id='efA'>
                        <label>Username </label>
                        <input type='text' id='userNameEntry'/>
                    </div>
                    <div id = 'efB'>
                        <label>Password </label>
                        <input type='password' id='passwordEntry'/>
                    </div>
                </div>
                <div id='userTabs'>
                    <label className='tab'>Customer</label>
                    <label className='tab'>New Account</label>
                    <label className='tab'>Employee</label>
                </div>
            </div>
            }
        </>
    );
}

export default Login;