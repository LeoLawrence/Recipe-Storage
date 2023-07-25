import express from 'express'; // preferred over const express = require('express')
import cors from 'cors'; // communication between front end and back end
import mongoose from 'mongoose'; // lets us use MongoDB. Note: the MongoDB server is using AWS.

import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';


const app = express(); // gen version of API

app.use(express.json()); // middleware to convert the data into JSON
app.use(cors()); // lets us make API requests from the front end using cors

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect("mongodb+srv://leoLawrence:S4uxUDnTzePY@recipes.pxo9aua.mongodb.net/Recipes?retryWrites=true&w=majority"); // revision note: swap password with env

app.listen(3001, () => console.log("SERVER STARTED!")); // using 3001 since 3000 is used in this project for frontend

