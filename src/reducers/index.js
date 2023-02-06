// 1. Config store
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import reduxThunk from 'redux-thunk';

export const globalStore = configureStore({
    reducer: {
        // Mendefine reducer yang dimiliki
        auth : authReducer
    }
}, applyMiddleware(reduxThunk));