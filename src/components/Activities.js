import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './activities.css'

async function getActivities() {
    let { data } = await axios.get(
      'http://fitnesstrac-kr.herokuapp.com/api/activities'
    )
    console.log(data)
    return data
  }

const Activities = () => {
    const [activities, setActivities] = useState([])

    const [page, setPage] = useState(0) // load 10 per page

    useEffect(() => {
        // async function required for awaiting the routes
        async function getAllActivities() {
          let data = await getActivities()
          setActivities(data) // when we have the data, set it in our components variable
        }
    
        // call the inner function once to start the process
        getAllActivities()
      }, [])

    let limitedActivities = activities.slice(0 + page * 10, page * 10 + 10)

    // Creates a <SingleRoutine /> component for every routine in our arrray
  let displayActivities = limitedActivities.map((a, idx) => {
    return <SingleActivity key={idx} activity={a} />
  })

  return (
    <div className='activities'>
      {displayActivities}
      <button onClick={() => setPage(page + 1)}>Next 10</button>
      
    </div>
  )
}

const SingleActivity = ({ activity }) => {

  return (
    <div className='activity'>
      <h1>{activity.name}</h1>
      <h2>Description: {activity.description}</h2>
    </div>
  )
}

export default Activities
export {getActivities}