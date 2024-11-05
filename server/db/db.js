import mongoose from "mongoose";

const connectToDB = async ()=>{
    try{
        const connectionstring = process.env.DB_CONNECTION_STRING
        await mongoose.connect(connectionstring)
        console.log("Connected To DB")
        
    }
    catch(err){
        console.log("Err in connecting", err)
    }
}

export default connectToDB