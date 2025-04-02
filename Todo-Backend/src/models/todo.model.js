import {mongoose,Schema} from "mongoose";

const TodoSchema=new Schema(
    {
      content:{
        type:String,
        required:true,
        unique:true        
      },
      taskDate:{
        type:Date,
        required:true,
        index:true
      }
    },{timestamps:true}
)

export const Todo=mongoose.model('Todo',TodoSchema)