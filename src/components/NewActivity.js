import React from 'react';
import axios from 'axios';
import './newroutine.css';

const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

const NewActivity = ({currentUser}) => {
    if (currentUser === '') {
        return (<h1>Please login.</h1>)
        }
    
        let token = localStorage.getItem('currentUserToken')
    
        async function createNewActivity () {
            
            let newActivity = {
                            name: document.getElementById("new-activity-name").value,
                            description: document.getElementById("new-activity-description").value,
                    }
                    console.log(newActivity)
            try {
                let response = (await axios.post(BASE_URL+'/activities', 
                newActivity, 
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            )).data;
    
            console.log(response)
    
            } catch (error) {
                console.error(error);
            }
    
        }
    
        return (<div id="new-activity">
            <h1>Create New Activity</h1>
            <form id="new-activity-form" onSubmit={function(event) 
                {event.preventDefault() 
                createNewActivity()}}>
                <div id="activity-name">
                    <label htmlFor="new-activity-name">New Activity Name</label>
                    <input type="text" name="new-activity-name" id="new-activity-name" placeholder="New Activity Name"></input>
                </div>
                <div id="activity-description">
                    <label htmlFor="new-activity-description">Activity Description</label>
                    <textarea name="new-activity-description" id="new-activity-description" placeholder="Description"></textarea>
                </div>
                <input type="submit" id="submit-button"></input>
            </form>
        </div>)
    }

export default NewActivity