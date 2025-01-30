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
    rooms: 'studio' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    bath: 'shower' | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    title: string; // Required title for the listing
    postedBy: mongoose.Types.ObjectId;
    photos?: string[];
    description?: string;
    isSublease: { type: Boolean, required: true };              //TO Indicate that it's a sublease

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
    };
}

// Create the Schema
const HousingContractSchema: Schema = new Schema(
    {
        location: { type: String, required: true },
        startOfLease: { type: Date, required: false },      //OPTIONAL
        endOfLease: { type: Date, required: false },        //OPTIONAL
        monthlyRent: { type: Number, required: true },
        utilityFee: { type: Number, required: false },      //OPTIONAL
        managerPhone: { type: String, required: false },    //OPTIONAL
        moveInFee: { type: Number, required: false },       //OPTIONAL
        moveOutFee: { type: Number, required: false },      //OPTIONAL
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
        title: {type: String, required:true},
        postedBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        photos: [{type: String}],
        description: {type: String},
        isSublease: { type: Boolean, required: true, default: false },
        availabilityStatus: { type: String, enum: ['Available', 'Pending', 'Taken'], default: 'Available'},

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
        timestamps: true,
    }
);

//export model
export default mongoose.model<IHousingContract>('HousingContract', HousingContractSchema);