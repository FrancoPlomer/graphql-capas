import mongoose from "mongoose";

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    id: {
        type: Number, 
        require: true, 
        max: 50,
    },
    title: {
        type: String, 
        require: true, 
        max: 100,
    },
    description: {
        type: String, 
        require: true, 
        max: 200,
    },
    code: {
        type: Number, 
        require: true, 
        max: 1000,
    },
    photoUrl: {
        type: String, 
        require: true, 
        max: 100,
    },
    price: {
        type: Number, 
        require: true, 
        max: 100000,
    },
    timestamp: {
        type: String, 
        require: true, 
        max: 100,
    },
    stock: {
        type: Number, 
        require: true, 
        max: 500,
    },
})

export const products = mongoose.model(productsCollection, productsSchema);