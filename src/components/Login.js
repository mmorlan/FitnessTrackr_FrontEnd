import React, { useState, useEffect } from 'react'
import axios from 'axios';


const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

const Login = ({currentUser, setCurrentUser}) => {
    let [inputUsername, setInputUsername] = useState('');
    let [inputPassword, setInputPassword] = useState('');
    let [loginMessage, setLoginMessage] = useState('');

    async function login () {
        let inputUser = {username: inputUsername, password: inputPassword}

        try {
            let response = (await axios.post(BASE_URL+'/users/login', inputUser)).data;
            localStorage.setItem('currentUserToken', response.token)
            console.log(response)
            console.log(response.user.username)
            console.log('updating with', response.user.username);
            setCurrentUser(response.user.username);
            localStorage.setItem('currentUser', response.user.username);
            setLoginMessage("You are now logged in as " + response.user.username);
        
        } catch (error) {
            setLoginMessage("Sorry, we do not recognize that username and password combination");
        }
    }

    return(
        <div id='login-form'>
       {!currentUser ? <>
    <h1>Please enter your  username and password</h1>
            <div>
                <label htmlFor="username-input"></label>
                <input 
                    type="text" 
                    id="username-input"
                    name="username-input" 
                    placeholder="Username"
                    onChange={(event) => {
                        setInputUsername(event.target.value);
                        console.log(event.target.value)
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
                    onChange={(event) =>{
                        setInputPassword(event.target.value);
                        console.log(event.target.value);
                        
                    }}
                    ></input>
            </div>
            <button type='submit'
            onClick={() => {
                login();
            }}>Submit</button>
        <p>{loginMessage}</p>
        </> : <><p>{loginMessage}</p></> }
        </div>
    )
}

export default Login

/*  <input 
      placeholder='Enter a todo' 
      value={Todo}
      onChange={(event) => {
          let value = event.target.value
          setTodo(value)
      }}/>
    <button type='submit'>Submit</button>*/