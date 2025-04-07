import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import axios from "axios";

//  storing data in database
export const addToDB=createAsyncThunk('/addToDb',async(data,thunkAPI)=>{
    try {
        const response=await axios.post('http://localhost:4175/AddData',data,{
            headers: {
              'Content-Type': 'application/json',
            },});
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// getting all Data from DataBase
export const getallData=createAsyncThunk('/allData',async(thunkAPI)=>{
    try {
        const response=await axios.get('http://localhost:4175/todo-data')
        if (!response.data) {  
            throw new Error("No data received or invalid format");  
        }
        return response.data.completeData
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteTodo=createAsyncThunk('/deleteTodo',async(id,thunkAPI)=>{
    try {
        const response=await axios.delete(`http://localhost:4175/${id}`)
        if (!response.data) {  
            throw new Error("No data received or invalid format");  
        }
        return response.data.remainingItem
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const updateData=createAsyncThunk('/updateData',async(data,thunkAPI)=>{
    try {
        const response=await axios.put('http://localhost:4175/todo-update',data,{
            headers: {
              'Content-Type': 'application/json',
            },});
        if (!response.data) {  
            throw new Error("No data received or invalid format");  
        }
        return response.data.updatedItem
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
const initialState={
    Todo:[],
    loading:false,
    error:null,
}

const TodoSlice=createSlice(
    {
        name:'todo',
        initialState,
        extraReducers: (builder) => {
            // Cases for Adding Data to DB
            builder
            .addCase(addToDB.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(addToDB.fulfilled, (state, action) => {
              state.loading = false;
              state.Todo.push(action.payload.data)
              
            })
            .addCase(addToDB.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
            
            // cases to get All Data from Db
            builder
              .addCase(getallData.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(getallData.fulfilled, (state, action) => {
                state.loading = false;
                state.Todo=[...action.payload]
              })
              .addCase(getallData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });

              // cases to Update Data
              builder
              .addCase(updateData.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(updateData.fulfilled, (state, action) => {
                state.loading = false;
                const todoUpdate=action.payload
                const itemToUpdate=state.Todo.findIndex((item)=>item._id === todoUpdate._id)

                 if(itemToUpdate !==-1){
                    state.Todo[itemToUpdate]=action.payload
                 }
              })
              .addCase(updateData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });

              // cases to Delete Data
              builder
              .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.Todo=[...action.payload]
              })
              .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
            }
    
    }
)

export const {addTodo,updateTodo,deleteTask}=TodoSlice.actions
export default  TodoSlice.reducer