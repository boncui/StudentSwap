import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    role?: string;
}

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "User" }
});

export default mongoose.model<IUser>('User', UserSchema);
