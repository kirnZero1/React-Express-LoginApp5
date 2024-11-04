import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'
import cors from 'cors'
import { usersRoute } from './route/userRoutes';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', usersRoute)



mongoose.connect(`${process.env.MONGO_URI}`)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log('Database and Server is now online at PORT '+process.env.PORT)
            })
        })
        .catch((error) => console.log({Error: error.message}))