import React, { useState, useEffect} from 'react';
import './myroutines.css';
import axios from 'axios';

import UserRoutine from './UserRoutine';
import PatchRoutine from './PatchRoutine';
import DeleteRoutine from './DeleteRoutine';


const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

async function getRoutines(currentUser) {
    const requestUrl = BASE_URL + '/users/' + currentUser + '/routines';
    let {data} = await axios.get(requestUrl);
    console.log(currentUser)
    console.log(data)
    return data;
}


const MyRoutines = ({currentUser, name, goal, isPublic }) => {
    
    const [routines, setRoutines] = useState([]);
    const [editing, setEditing] = useState(false)

    if (currentUser === '') {
        return (<h1>Please login.</h1>)
    } 


    useEffect(() => {
        // async function required for awaiting the routes
        async function getMyRoutines() {
          let data = await getRoutines(currentUser)
          console.log(data)
          setRoutines(data) // when we have the data, set it in our components variable
        }
    
        // call the inner function once to start the process
        getMyRoutines()
    
        // console.log('USE EFFECT RUNS ONCE')
      }, []) //TO DO: pass in a state that only effects once a routine is deleted

    const routineMatches = function(routine, term) {
        if (routine.creatorName.includes(term)){
            console.log(routine.creatorName)
            return true;
        } else {
            return false;
        }
    
        
    }

    const filteredRoutines = routines.filter(routine => routineMatches(routine, localStorage.getItem('currentUser')));

    return <>
    <h1>Your Routines</h1>
    {filteredRoutines.map((routine) => {
        return <>
        <UserRoutine
            id={routine.id}
            key={routine.id}
            creator={routine.creatorName}
            name={routine.name}
            goal={routine.goal}
            publicStatus={routine.isPublic}
            currentUser={currentUser}/>

            { editing ? <PatchRoutine 
                id={routine.id}
                name={routine.name}
                goal={routine.goal}
                publicStatus={routine.isPublic}/> 
                 : <>
                        <div className="routine-name">{name}</div>
                        <div className="routine-goal">{goal}</div>
                        <div className="routine-creator">{currentUser}</div>
                        <div className="routine-public-status">{isPublic ? 'Public' : 'This routine is currently private'}</div>
                    </> }
                <button onClick={e => {e.preventDefault(); setEditing(true)}}>Edit</button>
            <DeleteRoutine 
                id={routine.id}/>
            </>})
    }
    
</>

    
}

export default MyRoutines;