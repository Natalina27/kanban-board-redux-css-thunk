import axios from "axios";


const initialState = {
    0: [],
    1: [],
    2: [],
    3: [],

};

const todo = (state = initialState, action) => {
    const update = (obj) => {
        for (let i = 0; i < 4; ++i) {
            // eslint-disable-next-line array-callback-return
            obj[i].map(function (el, index) {
                el.index = index
                el.column = i
            })
        }
    }
    switch (action.type) {
        case 'DRAG_END_SAME_COLUMN':
            console.log("Before Change", state[action.payload.column])
            console.log("Index to remove", action.payload.indexToRemove)
            console.log("Index to insert", action.payload.indexToInsert)
            const [removed] = state[action.payload.column].splice(action.payload.indexToRemove, 1)
            state[action.payload.column].splice(action.payload.indexToInsert, 0, removed)
            console.log("After change", state[action.payload.column])
            update(state)
            state[action.payload.column].map(async function (element, index) {
                await axios({
                    url: `https://todo-server-viktor.herokuapp.com/todo/${element._id}`,
                    method: 'PATCH',
                    data: {index: index},
                })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
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
            console.log("After change", state[action.payload.column])
            update(state)
            state[action.payload.sourceColumn].map(async function (element, index) {
                await axios({
                    url: `https://todo-server-viktor.herokuapp.com/todo/${element._id}`,
                    method: 'PATCH',
                    data: {index: index, column: element.column},
                })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
            state[action.payload.destColumn].map(async function (element, index) {
                await axios({
                    url: `https://todo-server-viktor.herokuapp.com/todo/${element._id}`,
                    method: 'PATCH',
                    data: {index: index, column: element.column},
                })
                    .catch(function (error) {
                        console.log(error)
                    })
            })

            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
            }
        case 'GET_LIST_FROM_SERVER':
            for (let column = 0; column < 4; ++column) {
                let columnArr = action.payload.filter(el => el.column === column)

                columnArr.sort(function (a, b) {
                    if (a.index > b.index) {
                        return 1
                    } else {
                        return -1
                    }
                })
                state[column] = columnArr

            }
            update(state)

            console.log("LIST FORM SERVER", state)

            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
            }
        case "UPDATE_INDICES_DELETE_ITEM":
            const indexToDelete = state[action.payload.column].findIndex(el => el._id === action.payload._id)
            state[action.payload.column].splice(indexToDelete, 1)
            update(state)
            state[action.payload.column].map(async function (element, index) {
                await axios({
                    url: `https://todo-server-viktor.herokuapp.com/todo/${element._id}`,
                    method: 'PATCH',
                    data: {index: index},
                })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
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