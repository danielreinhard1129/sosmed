import axios from "axios"
import { API_URL } from "../helper"

export const loginAction = (data) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const logoutAction = () => {
    localStorage.removeItem('socio_login')
    return {
        type: 'LOGOUT'
    }
}

export const mwKeepLogin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('socio_login'); //di broswer -> storage -> localstorage namanya socio_login
            // mau simpen di localStorage mmg bawaan, getItem dia function
            if (token) {
                let response = await axios.get(`${API_URL}/user?id=${token}`); // jika ada ambil data 
                localStorage.setItem('socio_login', response.data[0].id); // dia akan memperbarui localStorage

                dispatch({
                    type: "LOGIN_SUCCESS", //line 6
                    payload: response.data[0] //line 7
                }); // menyimpan ulang ke reducer
            }
        } catch (error) {
            console.log(error);
        }
    }
}