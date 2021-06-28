const Activity = ({ activity }) => {
    return (
      <li className='activity'>
        <h3>{activity.name}</h3>
        <h3>{activity.description}</h3>
      </li>
    )
  }

export default Activity