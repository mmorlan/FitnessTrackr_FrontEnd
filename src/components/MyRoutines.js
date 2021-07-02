import React, { useState, useEffect} from 'react';
import './myroutines.css';
import axios from 'axios';

import UserRoutine from './UserRoutine';
import NewRoutine from './NewRoutine';

const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

async function getRoutines(currentUser) {
    const requestUrl = BASE_URL + '/users/' + currentUser + '/routines';
    let {data} = await axios.get(requestUrl);
    console.log(currentUser)
    console.log(data)
    return data;
}


const MyRoutines = ({currentUser }) => {
    
    const [routines, setRoutines] = useState([]);

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
        return <UserRoutine
            id={routine.id}
            key={routine.id}
            creator={routine.creatorName}
            name={routine.name}
            goal={routine.goal}
            publicStatus={routine.isPublic}
            currentUser={currentUser}
            onDeleteCallback={async () => {
                console.log('routine was deleted');
                async function getMyRoutines() {
                    let data = await getRoutines(currentUser)
                    console.log(data)
                    setRoutines(data) // when we have the data, set it in our components variable
                  }
                getMyRoutines();
            }}
        />})
    }
    
</>

    
}

export default MyRoutines;