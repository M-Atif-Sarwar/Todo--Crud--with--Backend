import mongoose from "mongoose"

export const dbConnection=async()=>{
   try {
     const response=await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
     console.log(response.connection.host)
   } catch (error) {
    console.log(`failed to connect to Database ${error.message}`)
    process.exit(1)
   }
}