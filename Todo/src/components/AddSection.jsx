import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDB, addTodo, getallData, updateData, updateTodo } from '../store/slices/TodoSlice';
import { dateConversion } from '../utils/dateConversion';
const AddSection = () => {
      //states for input boxes
      const [content,setContent]=useState('');
      const [taskDate,setTaskDate]=useState('');
       
      // selector to select from Redux slices/store and disptach
      const itemUpdate=useSelector((state)=>state.todoUpdate)
      const dispatch=useDispatch()
      
      // Sending Data functionality
      const dataHandler =(e) => {
        e.preventDefault()
        const localTodo={content,taskDate}
  
        // saving data to database and returning response

        // checking if there any edit to todo then send it to other action
        if (itemUpdate) {
        const toUpdate={content,taskDate,id:itemUpdate._id}
         // adding edit one
        dispatch(updateData(toUpdate))
          .then((resultAction) => {
        if (addToDB.fulfilled.match(resultAction)) {
            console.log("Todo saved successfully:", resultAction.payload);
        } else {
            console.error("Failed to save todo:", resultAction.error);
        }
    });
          // adding to
        } else {
          dispatch(addToDB(localTodo))
          .then((resultAction) => {
        if (addToDB.fulfilled.match(resultAction)) {
            console.log("Todo saved successfully:", resultAction.payload);
        } else {
            console.error("Failed to save todo:", resultAction.error);
        }
    });
        }       
      }; 

  
// useeffect will update ui if todo exist
      useEffect(() => {
        if (itemUpdate) {
          const newdate=itemUpdate.taskDate.split('T')[0]
          setContent(itemUpdate.content);
          setTaskDate(newdate);
          
        }
      }, [itemUpdate]);

  return (
    <>
<div className='flex justify-center items-center  w-full'>
      <div className='grid grid-cols-4  gap-10  w-full max-w-2xl px-3'>

          <input type="text" 
          placeholder='Enter to do '
          className='border p-2 rounded col-span-2 '
          onChange={(e)=>setContent(e.target.value)}
          value={content}
          />
          <input type="date" onChange={(e)=>setTaskDate(e.target.value)} 
          value={taskDate}/>
          <button disabled={!(content && taskDate)} 
          className={`px-4  text-white font-bold rounded-lg 
            ${(content && taskDate ? 'bg-slate-500' :'bg-slate-500 bg-opacity-50 cursor-not-allowed')}`}
          onClick={dataHandler}
          >
            {itemUpdate ? 'Upate' :'Add'}
            </button>

      </div>
      </div>
    </>
  )
}

export default AddSection
