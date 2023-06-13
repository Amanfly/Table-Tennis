import {remove_localStorage, get_localStorage} from './localstorage.js';

export const logoutUser = () =>{
    if(get_localStorage('token')){
        remove_localStorage('token');
        return true;
    } else {
        return false;
    }
}