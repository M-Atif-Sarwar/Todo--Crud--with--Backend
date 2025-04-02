import { app } from "./app.js";
import { dbConnection } from "./DB/dbConnection.js";
const port=process.env.PORT || 400
dbConnection().then(
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
).catch((error)=>{
    console.log(`failed to run server ${error.message}`)
})


