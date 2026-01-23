import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    title: {type:String,required:true},
    goal:{type:String,required:true},
    level:{type:String,required:true},
    timeOfDay:{type:String,required:true},
    poses: {
  type: [mongoose.Schema.Types.ObjectId],
  ref: "Pose",
  default: []
},

    totalDuration:{type:Number,required:true},
    maxDuration:{type:Number,default:25},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Session = mongoose.model("Session",sessionSchema);
export default Session;