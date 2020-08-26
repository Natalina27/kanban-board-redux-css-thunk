import axios from 'axios';

export function getList  () {
    return (dispatch) => {
        axios({
            url: 'https://todo-server-viktor.herokuapp.com/todo',
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