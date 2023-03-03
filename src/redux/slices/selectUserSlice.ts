import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface selectUserState{
    selectedUser? : User
}

const initialState = {selectedUser : undefined} as selectUserState;
const selectUserSlice = createSlice({name : 'selectUser', initialState, reducers : {
    selectUser : (state,action) => {state.selectedUser = action.payload.user}
}})

export const {selectUser} = selectUserSlice.actions;
export default selectUserSlice.reducer;