import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './userroutine.css';
import axios from 'axios';

import Activity from './Activity'


const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';



const UserRoutine = ({
    id, creator, publicStatus, name, goal
}) => {

    // let [editable, setEditable] = useState(false);

    let token = localStorage.getItem('currentUserToken')

    // async function deleteRoutine(id) {
    //     let response = await axios.delete(BASE_URL + '/routines/' + id,
    //     {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     });

    // }

    // function editRoutine(id) {
    //     newRoutine = {
    //             name: newName,
    //             goal: newGoal,
    //             isPublic: newPublicStatus
    //     }
    //     const requestUrl = BASE_URL + "/routines/" + id;
    //     console.log({requestUrl})
    //     axios.patch(requestUrl, 
    //         newRoutine,
    //         {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem('currentUserToken')
    //             }
    //         });
    //     setEditable(false);
    // }

    // const [newName, setNewName] = useState('')
    // const [newGoal, setNewGoal] = useState('')
    // const [newPublicStatus, setNewPublicStatus] = useState(false)

    // let newRoutine = {};

    return <div className="user-routine">
                
                    <div className="routine-name">{name}</div>
                    <div className="routine-goal">{goal}</div>
                    <div className="routine-creator">{creator}</div>
                    <div className="routine-public-status">{publicStatus ? 'Public' : 'This routine is currently private'}</div>
              
        </div>

}

export default UserRoutine;