import { useEffect, useState } from 'react';
import AddSection from './components/AddSection';
import TodoSection from './components/TodoSection';
import { useDispatch } from 'react-redux';
import { getallData } from './store/slices/TodoSlice';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(getallData())
  },[dispatch])
  return (
    <>
     <div className='w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-200 '>
      <h3 className='text-2xl font-bold mb-4 '>Todo List </h3>

        <AddSection/>   
        <TodoSection/>
     </div>
    </>
  )
}

export default App
