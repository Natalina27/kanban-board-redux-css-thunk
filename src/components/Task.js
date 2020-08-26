import React, {useState} from 'react';
import {Draggable} from "react-beautiful-dnd";
import EditTaskForm from "./EditTaskForm";
import DeleteTask from "./DeleteTask";
import {v4 as uuidv4} from 'uuid';


function Task(props) {
    const {index} = props
    const {element} = props
    const {_id, name, description, priority, done} = element

    const [isEditTaskMode, setEditTaskMode] = useState(false);
    const [isDeleteTaskMode, setDeleteTaskMode] = useState(false);

    const setCSSPriorityColor = () => {
        let titleClassName = 'rounded-sm text-black font-weight-bold text-center m-0 p-1 ';
        switch (priority) {
            case 1:
                titleClassName += 'alert-danger'
                break
            case 2:
                titleClassName += 'alert-warning'
                break
            case 3:
                titleClassName += 'alert-success'
                break
            default:
                break
        }
        return titleClassName
    }
    const onEditTaskClick = () => {
        setEditTaskMode(true);
    }

    const onDeleteTaskClick = () => {
        setDeleteTaskMode(true);
    }

    return (
        <>
            <EditTaskForm isEditTaskMode={isEditTaskMode} setEditTaskMode={setEditTaskMode} element={element}/>
            <DeleteTask isDeleteTaskMode={isDeleteTaskMode} setDeleteTaskMode={setDeleteTaskMode} element={element}/>
            <Draggable key={uuidv4()} draggableId={_id} index={index}>
                {provided => {
                    return (
                        <div key={_id}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             ref={provided.innerRef}
                             className="shadow rounded-sm task">
                            <div className={setCSSPriorityColor()}> {name}</div>
                            {done === false ? <div className="text-left p-2 font-weight-light">{description}</div> :
                                <div className="text-left p-2">
                                    <strike className=" font-weight-light ">{description}</strike>
                                </div>

                            }

                            <div className="text-secondary p-2 row">
                                <div className="col-7 text-left">Priority: {priority}</div>
                                <div className="col-5 text-right">
                                    <i className="fa fa-pencil rounded-sm icon" onClick={onEditTaskClick}/>
                                    <i className="fa fa-trash rounded-sm icon" onClick={onDeleteTaskClick}/>
                                </div>
                            </div>

                        </div>
                    )
                }
                }
            </Draggable>
        </>
    );
}

export default Task;