
import * as types from '../actions/actionTypes';

const initialState = {

    users:[]
};

let addressReducer = (state=initialState, action) => {

    switch (action.type) {

        case types.kUserList:

            for (var i = 0;i < action.data.users.length;i++){

                state.users.push(action.data.users[i])
            }
            return {

                ...state
            }

        default:
            return state;
    }
};

export default addressReducer;