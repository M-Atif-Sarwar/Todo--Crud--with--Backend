import { createSlice, nanoid } from "@reduxjs/toolkit"

const storeInLocalStorage=(state)=>{
    localStorage.setItem("Todo",JSON.stringify(state))
}

const getDataFromLocalStorage=(state)=>{
    const data=localStorage.getItem('Todo');
    return data ? JSON.parse(data) :[]
}

const initialState=getDataFromLocalStorage();

const TodoSlice=createSlice(
    {
        name:'todo',
        initialState,
        reducers:{
            addTodo:{
                reducer(state,action){
                   state.push(action.payload)
                   storeInLocalStorage(state)
                },
                prepare({content,taskDate}){
                    return{
                        payload:{
                            id:nanoid(),
                            content,
                            taskDate,
                        }
                    }
                }
            },
            updateTodo:(state,action)=>{
                const {id,content,taskDate}=action.payload;
                console.log(id)
                const toUpadate=state.findIndex((item)=> item.id === id);

                if(toUpadate !== -1){
                    state[toUpadate]={id,content,taskDate}
                    storeInLocalStorage([...state])
                }
                

                
            },
            deleteTask:(state,action)=>{
                const {id}=action.payload;
                const afterDelete=state.filter((item)=>item.id !== id)
                if(afterDelete){
                    storeInLocalStorage(afterDelete)

                    return afterDelete
                }

            }
        }
    }
)

export const {addTodo,updateTodo,deleteTask}=TodoSlice.actions
export default  TodoSlice.reducer