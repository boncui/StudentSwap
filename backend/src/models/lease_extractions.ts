import mongoose, { Schema, Document } from "mongoose";

// Interface for TypeScript safety
interface ILeaseExtraction extends Document {
    user: mongoose.Types.ObjectId;  // Link to user
    extractedText: string;  // Raw OCR extracted text
    structuredData: {
        location?: string;
        startOfLease?: Date;
        endOfLease?: Date;
        monthlyRent?: number;
        utilityFee?: number;
        managerPhone?: string;
        moveInFee?: number;
        moveOutFee?: number;
        rooms?: 'studio' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
        bath?: 'shower' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
        title?: string;
        postedBy?: mongoose.Types.ObjectId;
        photos?: string[];
        description?: string;
        isSublease?: boolean;
        features?: {
            washer?: boolean;
            dryer?: boolean;
            parking?: boolean | string;
            furnished?: boolean;
            gym?: boolean;
            amenities?: string[];
            petsAllowed?: boolean;
            petFee?: number;
            roommates?: number;
            dishwasher?: boolean;
            fridge?: boolean;
            freezer?: boolean;
            squareFootage?: number;
        };
    };
    status: "pending" | "confirmed" | "failed"; // Processing status
    createdAt: Date;
    updatedAt: Date;
}

// Define Mongoose Schema
const LeaseExtractionSchema: Schema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
        extractedText: { type: String, required: true }, // Raw OCR text
        structuredData: { type: Object, required: false }, // Processed structured data
        status: { type: String, enum: ["pending", "confirmed", "failed"], default: "pending" },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Export model
export default mongoose.model<ILeaseExtraction>("LeaseExtraction", LeaseExtractionSchema);
