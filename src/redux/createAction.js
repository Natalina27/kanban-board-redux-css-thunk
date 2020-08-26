import axios from 'axios';

export function getList  () {
    return (dispatch) => {
        axios({
            url: 'https://pensive-tesla-f010b1.netlify.app/todo',
            method: 'GET'
        })
            .then(res => {
                dispatch({
                    type: 'GET_LIST_FROM_SERVER', payload: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}