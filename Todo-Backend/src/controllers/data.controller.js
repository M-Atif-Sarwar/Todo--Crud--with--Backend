import { asyncHandler } from '../utils/asyncHandler.js'
import { Todo } from '../models/todo.model.js'
import mongoose from 'mongoose';
const AddData=asyncHandler(
    async(req,res)=>{
        const {content,taskDate}=req.body;
        console.log(content)
        console.log(taskDate)
        if(!content || !taskDate){
            throw new Error('both fields are required')
        }

       const todo =await Todo.findOne({ content })
        if(todo){
            throw new Error('todo Already exist')
        }
       
     const addData= await Todo.create(
        {
            content,
            taskDate
        }
       )

       return res
       .status(200).json({
        success:true,
        message:'Data Added Successfully',
        data:addData,
       })
    }
)


const getAllData=asyncHandler(
    async(req,res)=>{
       const completeData= await Todo.find({})
       if(!completeData){
        throw new Error('Data not found')
       }

       return res.status(200).json({
        success:true,
        message:'data found successfully',
        completeData,
       })
    }
)


const updateTodo=asyncHandler(
    async(req,res)=>{
        const {content,taskDate,id}=req.body;
        console.log(content,taskDate,id)
        if(!id || !content || !taskDate){
            throw new Error('all fields are required')
        }

        const updatedItem=await Todo.findByIdAndUpdate(
          id,
          {content:content,taskDate:taskDate},
          {new:true}
        )

       return res
       .status(200).json({
        success:true,
        message:'Data updated Successfull',
        updatedItem,
       })
    }
)

const deleteItem=asyncHandler(async (req,res)=>{
     const {id}=req.params;
     if(!id){
        throw new Error('id is required')
     }

     const itemRemoved= await Todo.findByIdAndDelete(id)
     console.log('item === ',itemRemoved)
     if(!itemRemoved){
        throw new Error('unable to delete item')
     }

    const remainingItem =await Todo.find({})
    if(!remainingItem){
        throw new Error('no item found in Todos')
    }

    return res
    .status(200).json({
     success:true,
     message:'todo deleted successfully',
     remainingItem,
    })
    
    })

export {
    AddData,
    getAllData,
    updateTodo,
    deleteItem
}