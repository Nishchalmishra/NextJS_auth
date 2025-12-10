import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        mongoose.connect("mongodb+srv://nishchalmishra14_db_user:8uy1q1vUkSF7cFzB@cluster0.guhiwo6.mongodb.net/"!);
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("mongodb connected successfully...")
        })

    } catch (error) {
        console.log(error);
    }
}