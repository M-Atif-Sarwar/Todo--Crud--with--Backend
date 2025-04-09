import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { editTodo } from '../store/slices/TodoUpdateSlice';
import { deleteTodo } from '../store/slices/TodoSlice';
import { dateConversion } from '../utils/dateConversion';

const TodoSection = () => {
    const todo=useSelector((state)=>state.todo);
    const dispatch=useDispatch()
    
    // sending selected items for editing to input boxes
    const editHandler=(id)=>{
        const itemToUpdate = todo.Todo.find((item) => item._id === id);
        if (itemToUpdate) {
            dispatch(editTodo(itemToUpdate)); 
        }
      }

      const deleteHandler=(id)=>{
        dispatch(deleteTodo(id))
      }

  return (
   <>
   
   { 
  
   todo && todo.Todo.map((item)=>{
     
      return  <div className='flex justify-center items-center w-full ' key={item._id}>
         
      <div 
      className='grid mt-8   grid-cols-4  gap-5  w-full max-w-2xl px-3'>

      <input type="text"
       className='h-10 col-span-2 rounded-md px-3'
       value={item.content}
       />

       <input type="text" 
       className='h-10 rounded-lg px-3'
       value={dateConversion(item.taskDate)}
       />
        
        <div className='flex justify-center items-center gap-8 col-span-1  '>
          <button onClick={()=>{editHandler(item._id)}} > <FontAwesomeIcon icon={faEdit} className='text-md fa-xl '/></button>
          <button onClick={()=>deleteHandler(item._id)}><FontAwesomeIcon icon={faTrash} color='red' 
          className=' text-md fa-xl'/></button>
        </div>
         
      </div>
    </div>
     
   })
   

}
   </>
  )
}

export default TodoSection
