import React, {useState, useEffect} from 'react';
import axios from 'axios';

const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

async function editRoutine(event) {

    const requestUrl = BASE_URL + "/routines/" + id;

    event.preventDefault()
    window.console.log({requestUrl})
    const [name, goal, isPublic] = event.target
    
    try {
        const {data: patchedRoutine} = await axios({
            method: 'PATCH',
            url: `${requestUrl}`,
            data: {
                'name': name.value,
                'goal': goal.value,
                'isPublic': isPublic.checked
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        window.location.reload();
        window.console.log('Updated routine:', patchedRoutine)
    } catch (error) {
        window.console.error(error);
    }
    
}

const PatchRoutine = ({routine}) => {

const [name, setName] = useState('')
const [goal, setGoal] = useState('')
const [isPublic, setIsPublic] = useState(false)

useEffect (() => {

    setName(routine.name)
    setGoal(routine.goal)
    setIsPublic(routine.isPublic)

}, [])

    return (
   
        <form className="routine-labels" onSubmit={event => editRoutine(event)}>               
        <input type="text" value={name} onChange={async (e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={goal} onChange={async (e) => setGoal(e.target.value)} placeholder="Goal" />
        <label htmlFor="new-routine-privacy">Want to make this routine public?</label>
        <input type="checkbox" value={isPublic} onChange={async (e) => setIsPublic(e.target.value)} placeholder="Public Status" />
        <button type="submit">Save Changes</button>
        </form>
            
    )
}


export default PatchRoutine