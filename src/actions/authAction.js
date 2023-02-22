import axios from "axios"
import { API_URL } from "../helper"

export const loginUserAction = (data) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const logoutUserAction = () => {
    localStorage.removeItem('sosmed_login')
    return {
        type: 'LOGOUT'
    }
}

export const mwKeepLogin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('sosmed_login'); //di broswer -> storage -> localstorage namanya twotter_login
            console.log("ini adalah tokennya", token); //ini tokennya uda kluar baru lanjut step berikutnya
            // mau simpen di localStorage mmg bawaan, getItem dia function
            if (token) {
                let response = await axios.get(`${API_URL}/user/keeplogin`, {
                    headers: {
                        // jika ada ambil data , pake headers (parameter ke 2)
                        'Authorization': `Bearer ${token}`
                    }
                }); 
                console.log("ini respon untuk keep login : ", response.data);
                localStorage.setItem('sosmed_token', response.data.token); // dia akan memperbarui localStorage masukin ulang token (2 parameter!)
                dispatch({
                    type: "LOGIN_SUCCESS", //line 6
                    payload: response.data //line 7 , gausah array ke 0 krn berupa objek
                }); // menyimpan ulang ke reducer
            }
        } catch (error) {
            console.log(error);
        }
    }
}