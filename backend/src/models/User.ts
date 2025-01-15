import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: {type: String, required: true},
});

export default mongoose.model<IUser>('User', UserSchema);
