import React from 'react';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {getList} from "../redux/createAction";
import {connect} from "react-redux";


function DeleteTask(props) {
    const {isDeleteTaskMode, setDeleteTaskMode, element} = props
    const {name} = element
    const onHide = () => {
        setDeleteTaskMode(false);
    }
    const deleteItem = async () => {
        await axios({
            url: `http://localhost:5000/todo/${element._id}`,
            method: 'DELETE',

        })
            .then(res => {
                props.getFullList()
                props.updateIndices(element._id, element.column)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <Modal show={isDeleteTaskMode} onHide={onHide} centered>
            <div className="p-3">
                <h4>Delete Task</h4>
                <p>Are you sure you want to delete this task: '{name}'?</p>
                <button onClick={onHide} className="btn btn-secondary float-right ml-2">Cancel</button>
                <button onClick={deleteItem} className="btn btn-primary float-right">Delete</button>
            </div>
        </Modal>

    );
}

const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList()),
    updateIndices: (_id, column) => dispatch({type: 'UPDATE_INDICES_DELETE_ITEM', payload: {_id: _id, column: column}})

});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteTask);