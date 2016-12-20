import {xListUsers} from "./urls";


import * as types from "../actions/actionTypes"

export let getUserList = () => {

    let url = xListUsers;
    let fetchOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    return (dispatch)=>{
        fetch(url, fetchOptions)
            .then((response) => {
                console.log(response);
                return response.text();})
            .then((responseText) => {

            console.log(responseText)
                var res = JSON.parse(responseText);
                dispatch({type:types.kUserList,data:res})
            })
            .catch((err) => {
                console.log(err);
            });
    }
};