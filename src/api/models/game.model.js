import mongoose from "mongoose";

const gameModel = new mongoose.Schema({
    gamename: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    category: {
        type: String, 
        trim: true, required: true
    },

    image: { 
        type: String,
        required: false,
        default: "https://media.istockphoto.com/id/1353994069/vector/neon-futuristic-game-controller.jpg?s=612x612&w=0&k=20&c=ar9BzcuxY8RalO-k3N7ZDQdeVVFvmtJM80OJWETomec="
    },

    votes: {
        type: Number,
        default: 0,
        required: false
    }
});
