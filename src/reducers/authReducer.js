const INITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    status: '',
    imgprofile: '',
    role: null,
    imgbanner: ''
}

export const authReducer = (state = INITIAL_STATE, action) => {
    console.log("Data from action :", action);
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("Data from action.payload :", action.payload);
            console.log("Data from state :", state);
            console.log("Data from combine :", { ...state, ...action.payload });
            return { ...state, ...action.payload };
            // state ditimpa sama action.payload
        case "LOGOUT":
            return INITIAL_STATE; // mereset ulang reducer
        default:
            return state;
    }
}