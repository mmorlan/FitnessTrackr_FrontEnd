import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

const Register = () => {
    let [newUsername, setNewUsername] = useState('')
    let [newPassword, setNewPassword] = useState('')
    let [currentUser, setCurrentUser] = useState('');
    let [message, setMessage] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    async function register() {
        let newUser = {username: newUsername, password: newPassword}

        try {
            let response = (await axios.post(BASE_URL+'/users/register', newUser)).data;
            console.log(response)
            localStorage.setItem('currentUserToken', response.token)
    
            localStorage.setItem('currentUser', newUsername)
            setCurrentUser(newUser.username);
            setMessage("You are currently logged in as " + currentUser)
         
        } catch (error) {
            console.error(error);
            console.log("invalid entry")
            setErrorMessage("Invalid username and password combination. Please try again.");

        }

    }

    return(
        <div id='registration-form'>
            { !currentUser ? 
            <>
    <h1>Please enter your new username and password</h1>
        <form onSubmit={(event) => {
                event.preventDefault();
                register()
                
            }}>  
                <div>
                    <label htmlFor="username-input"></label>
                    <input 
                        type="text" 
                        id="username-input"
                        name="username-input" 
                        placeholder="Username"
                        onChange={(event) => {
                            setNewUsername(event.target.value)
                        }}
                        ></input>
                </div>
                <div>
                    <label htmlFor="password-input"></label>
                    <input 
                        // type="password" 
                        id="password-input"
                        name="password-input" 
                        placeholder="Password"
                        onChange={(event) => {
                            setNewPassword(event.target.value)
                        }}
                        ></input>
                    </div>
                <button type='submit'>Submit</button>
            </form>
        <h1>{errorMessage}</h1>
        </> : <><h1>{message}</h1></> }
        </div>
    )
}

export default Register