import mongoose, {Schema, Document} from 'mongoose';

//Define the interface for TS
interface ISuggestion extends Document {
    title: string;
    description: string;
    user?: mongoose.Types.ObjectId;
    createdAt: Date;
}

//Define the Schema
const SuggestionSchema: Schema = new Schema(
    {
        
        title: {type: String, required: true},
        message: {type: Schema.Types.ObjectId, ref: "User"},
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model<ISuggestion>("Suggestion", SuggestionSchema);