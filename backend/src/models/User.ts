import mongoose, { Schema, Document } from "mongoose";

//define a TS interface for type safety
interface IUser extends Document {
    fullName: string;
    email: string;
    phone: string;
}

//Schema for Users
const UserSchema: Schema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
}, {
    timestamps: true, //automatically add createdAt and UpdatedAt fields
});

export default mongoose.model<IUser>('User', UserSchema);