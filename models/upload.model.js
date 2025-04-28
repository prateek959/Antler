import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    fileUrl:{type:String, required:true}
},{timestamps:true});


const Upload = mongoose.model('upload',uploadSchema);

export {Upload};

