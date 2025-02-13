import mongoose, { Schema, Document } from "mongoose";
import { ContractCategory } from "../config/contractTypes"; // Ensure this is imported correctly

// TypeScript interface for Housing Contracts
interface IHousingContract extends Document {
    location: string;
    startOfLease?: Date;
    endOfLease?: Date;
    monthlyRent: number;
    utilityFee?: number;
    managerPhone?: string;
    moveInFee?: number;
    moveOutFee?: number;
    rooms: 'studio' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    bath: 'shower' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    title: string; // Required title for the listing
    postedBy: mongoose.Types.ObjectId;
    description?: string;
    isSublease: boolean; // Indicates that it's a sublease
    isApartment: boolean;
    category: string; // Added to classify under REAL_ESTATE
    availabilityStatus: 'Available' | 'Pending' | 'Taken';

    features?: {
        washer?: boolean;
        dryer?: boolean;
        parking?: boolean | string;
        furnished?: boolean;
        gym?: boolean;
        amenities?: string[]; // Array of amenities like pool or spa
        petsAllowed?: boolean;
        petFee?: number;
        roommates?: number;
        dishwasher?: boolean;
        fridge?: boolean;
        freezer?: boolean;
        squareFootage?: number;
        microwave?: boolean;
    };
}

// Define Schema
const HousingContractSchema: Schema = new Schema(
    {
        location: { type: String, required: true },
        startOfLease: { type: Date },
        endOfLease: { type: Date },
        monthlyRent: { type: Number, required: true },
        utilityFee: { type: Number },
        managerPhone: { type: String },
        moveInFee: { type: Number },
        moveOutFee: { type: Number },
        rooms: {
            type: Schema.Types.Mixed,
            required: true,
            enum: ['studio', 1, 2, 3, 4, 5, 6, 7],
        },
        baths: {
            type: Schema.Types.Mixed,
            required: true,
            enum: ['shower', 1, 2, 3, 4, 5, 6, 7],
        },
        title: { type: String, required: true },
        postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        description: { type: String },
        isSublease: { type: Boolean, required: true, default: false },
        category: { type: String, required: true, default: ContractCategory.REAL_ESTATE }, // Categorized as REAL_ESTATE
        availabilityStatus: { type: String, enum: ['Available', 'Pending', 'Taken'], default: 'Available' },

        features: {
            washer: { type: Boolean },
            dryer: { type: Boolean },
            parking: { type: Schema.Types.Mixed },
            furnished: { type: Boolean },
            gym: { type: Boolean },
            amenities: [{ type: String }], // Array of strings
            petsAllowed: { type: Boolean },
            petFee: { type: Number },
            roommates: { type: Number },
            dishwasher: { type: Boolean },
            fridge: { type: Boolean },
            freezer: { type: Boolean },
            squareFootage: { type: Number },
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Export Model
export default mongoose.model<IHousingContract>("HousingContract", HousingContractSchema);
