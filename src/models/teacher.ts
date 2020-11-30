import mongoose, {Schema, Document} from "mongoose";
import { ICourse } from "./course";
export interface ITeacher extends Document{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    courses: [ICourse["_id"]];
}

const TeacherSchema = new Schema({
    email: {type:String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    password: {type:String, required:true},
    batch: {type: mongoose.Schema.Types.ObjectId, ref:'Batch'},
    courses: [{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
});

TeacherSchema.methods.toJSON = function(this:ITeacher){
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);