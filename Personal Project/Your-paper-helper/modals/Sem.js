import mongoose from "mongoose";
const {Schema, model} =mongoose;
const SemSchema= new Schema({
    email: { type: String, required: true },
    name: { type: String},
    sem: {type:Number},
    sub: {type:String},
    paper: {type:String},
    uploadedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Sem || model("Sem", SemSchema);