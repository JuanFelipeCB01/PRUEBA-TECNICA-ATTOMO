import mongoose from "mongoose";

export const DBconnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost/attomodb')
        console.log(">>> Conection Succesful!")
    } catch (error) {
        console.log(error);
    }
}