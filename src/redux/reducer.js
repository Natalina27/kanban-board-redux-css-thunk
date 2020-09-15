import axios from "axios";


const initialState = {
    0: [],
    1: [],
    2: [],
    3: [],

};
const deleteItem = async (id, columnNumber) => {
    await axios({
        url: "https://kanban-server-dnd.herokuapp.com/todo/delete",
        method: 'DELETE',
        data: {
            id: id,
            column: columnNumber,

        },
    })
        .catch(function (error) {
            console.log(error)
        })

}
const insertItem = async (removed, columnNumber, indexToInsert) => {
    await axios({
        url: "https://kanban-server-dnd.herokuapp.com/todo/changePosition",
        method: 'PATCH',
        data: {
            index: indexToInsert,
            id: removed.id,
            column: columnNumber,
            name: removed.name,
            done: removed.done,
            description: removed.description,
            priority: removed.priority,
            shrink: removed.shrink
        },
    })
        .catch(function (error) {
            console.log(error)
        })

}
const todo = (state = initialState, action) => {
    switch (action.type) {
        case 'DRAG_END_SAME_COLUMN':
            console.log("Index to remove", action.payload.indexToRemove)
            console.log("Index to insert", action.payload.indexToInsert)
            const [removed] = state[action.payload.column].splice(action.payload.indexToRemove, 1)
            state[action.payload.column].splice(action.payload.indexToInsert, 0, removed)
            let columnNumber = Number(action.payload.column) + 1
            console.log(columnNumber)
            columnNumber = "column" + columnNumber
            console.log("ID", removed.id)
            console.log("COlumnNumber", columnNumber)
            deleteItem(removed.id, columnNumber).then(r => console.log('Success'))
            insertItem(removed, columnNumber, action.payload.indexToInsert).then(r => console.log('Success'))

            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
            }
        case 'DRAG_END_DIFFERENT_COLUMN':

            const [removedSource] = state[action.payload.sourceColumn].splice(action.payload.sourceIndex, 1)
            state[action.payload.destColumn].splice(action.payload.destIndex, 0, removedSource)
            console.log("removedSource", removedSource)
            let sourceColumn = Number(action.payload.sourceColumn) + 1
            sourceColumn = "column" + sourceColumn
            let destColumn = Number(action.payload.destColumn) + 1
            destColumn = "column" + destColumn
            deleteItem(removedSource.id, sourceColumn).then(r => console.log('Success'))
            insertItem(removedSource, destColumn, action.payload.destIndex).then(r => console.log('Success'))
            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
            }
        case 'GET_LIST_FROM_SERVER':
            for (let column = 0; column < 4; ++column) {
                console.log(action.payload)


            }

            state['0'] = action.payload['0']['tasks']
            state['1'] = action.payload['1']['tasks']
            state['2'] = action.payload['2']['tasks']
            state['3'] = action.payload['3']['tasks']
            console.log(state)
            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
            }



        default:
            return state


    }

}

export default todo