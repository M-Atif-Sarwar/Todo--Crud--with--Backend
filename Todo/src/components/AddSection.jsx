import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../store/slices/TodoSlice';
const AddSection = () => {
     const [content,setContent]=useState('');
      const [taskDate,setTaskDate]=useState('');

       // Todo contain todo that need to be updated
      const Todo=useSelector((state)=>state.todoUpdate)
      console.log(Todo)

      const dispatch=useDispatch()
      const dataHandler = (e) => {
        if(Todo){
            // it update existing todo
            dispatch(updateTodo({ id: Todo.id, content, taskDate }));
        }
        else{
            // it add new add todo item
            dispatch(addTodo({content,taskDate}));
        } 
        
        setContent('')
        setTaskDate('')
      };

// useeffect will update ui if todo exist
      useEffect(() => {
        if (Todo && Todo.id) {
          setContent(Todo.content);
          setTaskDate(Todo.taskDate);
        }
      }, [Todo]);

      
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
          >{Todo ? 'Upate' :'Add'}</button>

      </div>
      </div>
    </>
  )
}

export default AddSection
