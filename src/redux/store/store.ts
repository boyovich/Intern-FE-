import { configureStore } from "@reduxjs/toolkit";
import openUserformReducer from "../slices/openUserformSlice";
import selectUserReducer from "../slices/selectUserSlice"

export const store = configureStore({reducer :{ openUserform : openUserformReducer, selectUser : selectUserReducer}});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


