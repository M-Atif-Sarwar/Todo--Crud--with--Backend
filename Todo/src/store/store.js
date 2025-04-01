import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../store/slices/TodoSlice'
import TodoUpdate from '../store/slices/TodoUpdateSlice'
export const store=configureStore(
    {
        reducer:{
          todo:todoReducer,
          todoUpdate:TodoUpdate
        },
    }
)