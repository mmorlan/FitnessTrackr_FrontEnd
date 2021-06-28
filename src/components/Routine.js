import React from 'react';
import Activity from './Activity';

const Routine = ({ routine }) => {
    const activities = routine.activities
  
    // same thing as mapping routines but for activities
    let displayActivities = activities.map((a, idx) => {
      return <Activity key={idx} activity={a} />
    })
  
    return (
      <div className='routine'>
        <h1>{routine.name}</h1>
        <h2>Creator: {routine.creatorName}</h2>
        <h3>Goal: {routine.goal}</h3>
        <ul>{displayActivities}</ul>
      </div>
    )
  }

export default Routine