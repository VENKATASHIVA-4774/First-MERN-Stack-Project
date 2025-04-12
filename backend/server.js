// const express = require("express");
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'; // import product routes

dotenv.config();
const app = express();

app.use(express.json()); // allows us to parse JSON data in request body

app.use("api/products", productRoutes); 

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

// JunqL3EP8nuvd5bJ

