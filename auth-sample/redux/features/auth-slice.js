import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuthenticated: false,
        username: null,
        accessToken: null,
        roll: null
    }
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        login: (state, action) => {
            return {
                value: {
                    isAuthenticated: true,
                    username: action.payload.username,
                    accessToken: action.payload.accessToken,
                    roll: action.payload.roll
                }
            }
        } 
    }
});

export const {login, logout} = auth.actions;
export default auth.reducer;