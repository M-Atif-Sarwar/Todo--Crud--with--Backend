import { createSlice } from "@reduxjs/toolkit";


const TodoUpdateSlice=createSlice(
    {
        name:'todoUpdate',
        initialState:null,
        reducers:{
        editTodo:(state,action)=>{
         return  action.payload
        }
        }
    }
)
export const {editTodo}=TodoUpdateSlice.actions
export default TodoUpdateSlice.reducer