import React, { useState, useEffect} from 'react';


const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

const DeleteRoutine = ({
    id
}) => {

    async function deleteRoutine(id) {
        let response = await axios.delete(BASE_URL + '/routines/' + id,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

    }

    return (
        <button className="delete-routine-button"
            onClick={() => {deleteRoutine(id)}}>Delete Routine</button> 
    )

}

export default DeleteRoutine