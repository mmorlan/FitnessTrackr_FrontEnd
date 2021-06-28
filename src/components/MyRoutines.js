import React, { useState, useEffect} from 'react';
import './myroutines.css';
import axios from 'axios';
import UserRoutine from './UserRoutine';

import Routine from './Routine'

const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

async function getRoutines() {
    let {data} = await axios.get(BASE_URL + '/routines')
    return data;
}

const MyRoutines = ({currentUser}) => {
    
    const [routines, setRoutines] = useState([]);

    if (currentUser === '') {
        return (<h1>Please login.</h1>)
        } 


    useEffect(() => {
        // async function required for awaiting the routes
        async function getAllRoutines() {
          let data = await getRoutines()
          console.log(data)
          setRoutines(data) // when we have the data, set it in our components variable
        }
    
        // call the inner function once to start the process
        getAllRoutines()
    
        // console.log('USE EFFECT RUNS ONCE')
      }, [])

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
    {filteredRoutines.map((routine) => {
        return <UserRoutine
            id={routine.id}
            key={routine.id}
            creator={routine.creatorName}
            name={routine.name}
            goal={routine.goal}
            publicStatus={routine.isPublic}
            currentUser={currentUser}
        />})
    }
</>
    
}

export default MyRoutines;