import dotenv from "dotenv"
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import {DB_NAME} from "./constants.js";
import logsRouter from './routes/logs.js';
dotenv.config({
  path:'./env'
})


const app=express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

(async ()=>{
try {
 const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}`);
console.log(`MongoDB connected DB Host:${connectionInstance.connection.host}`);
 app.on('error',(error)=>{
  console.log("Error", error)
  throw error;
 })
 app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
} catch (error) {
 console.error("Error:",error)
 throw error;
}
})()

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/logs', logsRouter);

