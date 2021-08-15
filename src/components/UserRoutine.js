import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './userroutine.css';
import axios from 'axios';

import Activity from './Activity'


const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';



const UserRoutine = ({
    id, creator, publicStatus, name, goal, onDeleteCallback
}) => {

    let [editable, setEditable] = useState(false);

    let token = localStorage.getItem('currentUserToken')

    async function deleteRoutine(id) {
        let response = await axios.delete(BASE_URL + '/routines/' + id,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

    }

    function editRoutine(id) {
        newRoutine = {
                name: newName,
                goal: newGoal,
                isPublic: newPublicStatus
        }
        const requestUrl = BASE_URL + "/routines/" + id;
        console.log({requestUrl})
        axios.patch(requestUrl, 
            newRoutine,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('currentUserToken')
                }
            });
        setEditable(false);
    }

    const [newName, setNewName] = useState('')
    const [newGoal, setNewGoal] = useState('')
    const [newPublicStatus, setNewPublicStatus] = useState(false)

    let newRoutine = {};

    return <><div className="user-routine">
                <div className="routine-labels">
                { editable ? <> 
                        <div id="routine-title">
                            <label htmlFor="new-routine-title">New Routine Name</label>
                            <input type="text" name="new-routine-name" id="input-routine-name" 
                            onChange={async (e) => setNewName(e.target.value)}></input>
                        </div>
                        <div id="routine-goal">
                            <label htmlFor="new-routine-goal">New Goal</label>
                            <input type="text" name="new-routine-goal" id="input-routine-goal" 
                            onChange={async (e) => setNewGoal(e.target.value)}></input>
                        </div>
                        <div id="privacy-box">
                            <label htmlFor="new-routine-privacy">Want to make this routine public?</label>
                            <input type="checkbox" name="new-routine-privacy" id="input-routine-privacy" value="Public"
                            onChange={async (e) => setNewPublicStatus(e.target.value)}></input>
                        </div>
                </> : <>
                
                    <div className="routine-name">{name}</div>
                    <div className="routine-goal">{goal}</div>
                    <div className="routine-creator">{creator}</div>
                    <div className="routine-public-status">{publicStatus ? 'Public' : 'This routine is currently private'}</div>
                </> }
                </div>
        </div>
        <div className="routine-buttons">
            {localStorage.getItem("currentUser") ?
                <>
                { (localStorage.getItem("currentUser") === creator) ? 
                    <>
                        {editable ? 
                            <><button className="edit-routine-button" 
                                onClick={() => {
                                    editRoutine(id);
                                }}>Save Changes</button>
                            <button className="edit-routine-button" onClick={() => {setEditable(false)}}>Cancel Changes</button>
                            </> : 
                            <button className="edit-routine-button" 
                                onClick={() => {setEditable(true)}}>Edit Routine</button>
                        }
                        
                        <button className="delete-routine-button"
                            onClick={() => {
                                deleteRoutine(id);
                                onDeleteCallback();
                            }} >Delete Routine</button> 
                    </> :
                    '' 
                }
                </> : ''
            }
        </div>
    </>

}

export default UserRoutine;