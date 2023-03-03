import { createSlice } from "@reduxjs/toolkit";

export interface openUserformState{
    isUserformOpened : boolean;
}
const initialState = {isUserformOpened : false} as openUserformState;
const openUserformSlice = createSlice({name : 'openUserform', initialState, reducers: {
    toogleOpen : (state) => {
        state.isUserformOpened = !state.isUserformOpened;
    }
}});
export const {toogleOpen} = openUserformSlice.actions;
export default openUserformSlice.reducer;