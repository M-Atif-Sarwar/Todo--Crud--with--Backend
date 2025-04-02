import { asyncHandler } from '../utils/asyncHandler.js'
import { Todo } from '../models/todo.model.js'
const AddData=asyncHandler(
    async(req,res)=>{
        const {content,taskDate}=req.body
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






export {
    AddData

}