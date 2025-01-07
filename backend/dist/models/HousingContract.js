"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Create the Schema
const HousingContractSchema = new mongoose_1.Schema({
    location: { type: String, required: true },
    startOfLease: { type: Date, required: true },
    endOfLease: { type: Date, required: true },
    monthlyRent: { type: Number, required: true },
    utilityFee: { type: Number, required: true },
    managerPhone: { type: String, required: true },
    moveInFee: { type: Number, required: true },
    moveOutFee: { type: Number, required: true },
    rooms: {
        type: mongoose_1.Schema.Types.Mixed, // Allows both numbers and strings
        required: true,
        enum: ['studio', 1, 2, 3, 4, 5, 6],
    },
    features: {
        washer: { type: Boolean },
        dryer: { type: Boolean },
        parking: { type: mongoose_1.Schema.Types.Mixed }, // Allows boolean or strings
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
}, {
    timestamps: true,
});
//export model
exports.default = mongoose_1.default.model('HousingContract', HousingContractSchema);
