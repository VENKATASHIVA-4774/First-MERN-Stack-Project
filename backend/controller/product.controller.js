import Product from "../models/product.model.js"; // import the product model
import mongoose from "mongoose";

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find({}); // find all products in the database
        res.status(200).json({ success:true, data : products });
    }catch (error) {
        console.error("Error in fetching products:", error.message);
        res.status(500).json({ success:false, message:"Server error" });
    }   
};

export const createProduct = async (req,res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message:"Please fill all the fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success:true, data:newProduct });
    }catch(error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success:false, message:"Server error" });
    }
};

export const updateProduct = async (req,res) => {
    const {id} = req.params; // destructuring to get id from params
    const product = req.body; // user will send this data

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success:false, message:"Invalid product ID" });
    }
    
    try{
        const updatedProduct =await Product.findByIdAndUpdate(id, product, { new: true }); // find product by id and update it
        res.status(200).json({ success:true, data:updatedProduct });
    } catch (error) {
        res.status(500).json({ success:false, message:"Server Error" });
    }
};

export const deleteProduct = async (req,res) => {
    const {id} = req.params; // destructuring to get id from params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success:false, message:"Invalid product ID" });
    }
    
    try{
        await Product.findByIdAndDelete(id); // find product by id and delete it
        res.status(200).json({ success:true, message:"Product deleted successfully" });
    }catch (error) {
        console.error("Error in deleting product:", error.message);
        res.status(500).json({ success:false, message:"Server Error" });
    }
};