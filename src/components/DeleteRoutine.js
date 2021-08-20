const DeleteRoutine = ({
    id, onDeleteCallback
}) => {

    async function deleteRoutine(id) {
        let response = await axios.delete(BASE_URL + '/routines/' + id,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

    }