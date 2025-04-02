import 'dotenv/config'
import express, { urlencoded } from 'express'
import cors from 'cors'
export const app=express()

app.use(express.json({ limit:'10kb' }))
app.use(cors({
    origin:process.env.CORS_ORIGIN,

}))
app.use(express.urlencoded({ extended:true,limit:'10kb' }))

