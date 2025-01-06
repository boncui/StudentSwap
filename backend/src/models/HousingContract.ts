import mongoose, {Schema, Document} from "mongoose";

//TS interface for safety
interface IHousingContract extends Document {
    location: string;
    startOfLease: Date;
    endOfLease: Date;
    monthlyRent: number;
    utilityFee: number;
    managerPhone: string;
    moveInFee: number;
    moveOutFee: number;
    rooms: 'studio' | 1 | 2 | 3 | 4 | 5 | 6;

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
        bath?: boolean;
    };
}

// Create the Schema
const HousingContractSchema: Schema = new Schema(
    {
        location: { type: String, required: true },
        startOfLease: { type: Date, required: true },
        endOfLease: { type: Date, required: true },
        monthlyRent: { type: Number, required: true },
        utilityFee: { type: Number, required: true },
        managerPhone: { type: String, required: true },
        moveInFee: { type: Number, required: true },
        moveOutFee: { type: Number, required: true },
        rooms: {
            type: Schema.Types.Mixed, // Allows both numbers and strings
            required: true,
            enum: ['studio', 1, 2, 3, 4, 5, 6],
        },

        features: {
            washer: { type: Boolean },
            dryer: { type: Boolean },
            parking: { type: Schema.Types.Mixed }, // Allows boolean or strings
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
            bath: { type: Boolean },
        },
    },
    {
        timestamps: true,
    }
);

//export model
export default mongoose.model<IHousingContract>('HousingContract', HousingContractSchema);