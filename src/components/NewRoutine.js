import React, {useState} from 'react';
import axios from 'axios';
import './newroutine.css';

const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

const NewRoutine = ({currentUser, routines, setRoutines}) => {
    if (currentUser === '') {
    return (<h1>Please login.</h1>)
    }

    let token = localStorage.getItem('currentUserToken')

    async function createNewRoutine () {
        
        let newRoutine = {
                        name: document.getElementById("new-routine-name").value,
                        goal: document.getElementById("new-routine-goal").value,
                        isPublic: document.getElementById("new-routine-public").checked
                }
                console.log(newRoutine)
        try {
            let response = (await axios.post(BASE_URL+'/routines', 
            newRoutine, 
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )).data;

        console.log('here...', response)
        
        const updatedRoutines = routines.concat([response]);
        console.log('updatedroutines: ', updatedRoutines);
        setRoutines(updatedRoutines);

        } catch (error) {
            console.error(error);
        }

        
    }

    return (<div id="new-routine">
        <h1>Create New Routine</h1>
       <form id="new-routine-form" onSubmit={function(event) 
            {event.preventDefault() 
            createNewRoutine()}}>
            <div id="routine-name">
                <label htmlFor="new-routine-name">New Routine Name</label>
                <input type="text" name="new-routine-name" id="new-routine-name"></input>
            </div>
            <div id="routine-goal">
                <label htmlFor="new-routine-goal">Goal</label>
                <textarea name="new-routine-goal" id="new-routine-goal"></textarea>
            </div>
                <div id="routine-public">
                <label htmlFor="new-routine-public">Check to make this a Public Routine</label>
                <input type="checkbox" name="new-routine-public" id="new-routine-public" value="public"></input>
            </div>
            <input type="submit" id="submit-button"></input>
        </form>
    </div>)
}

export default NewRoutine;