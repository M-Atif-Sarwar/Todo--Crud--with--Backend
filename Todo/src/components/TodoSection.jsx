import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { editTodo } from '../store/slices/TodoUpdateSlice';
import { deleteTask } from '../store/slices/TodoSlice';
const TodoSection = () => {
    const selector=useSelector((state)=>state.todo);
    const dispatch=useDispatch()
    // console.log(selector)
    
    const editHandler=(id)=>{
        const itemToUpdate = selector.find((item) => item.id === id);
        console.log(itemToUpdate)
        if (itemToUpdate) {
            dispatch(editTodo(itemToUpdate)); 
        }
      }

      const deleteHandler=(id)=>{
        dispatch(deleteTask({id}))
      }
  return (
   <>
   
   { 

   selector && selector.map((item)=>{
      return  <div className='flex justify-center items-center w-full ' key={item.id}>
         
      <div 
      className='grid mt-8   grid-cols-4  gap-5  w-full max-w-2xl px-3'>

      <input type="text"
       className='h-10 col-span-2 rounded-md px-3'
       value={item.content}
       />

       <input type="text" 
       className='h-10 rounded-lg px-3'
       value={item.taskDate}
       />
        
        <div className='flex justify-center items-center gap-8 col-span-1  '>
          <button onClick={()=>{editHandler(item.id)}} > <FontAwesomeIcon icon={faEdit} className='text-md fa-xl '/></button>
          <button onClick={()=>deleteHandler(item.id)}><FontAwesomeIcon icon={faTrash} color='red' 
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
