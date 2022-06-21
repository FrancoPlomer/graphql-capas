import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    id: {
        type: String, 
        require: true, 
        max: 500,
    },
    userName: {
        type: String, 
        require: true, 
    },
    timestamp: {
        type: Number, 
        require: true, 
    },
    products: {
        type: Array, 
        require: true, 
    },
})

export const carts = mongoose.model(cartsCollection, cartsSchema);