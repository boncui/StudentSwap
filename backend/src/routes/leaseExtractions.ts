import express from "express";
import LeaseExtraction from "../models/lease_extractions";
import HousingContract from '../models/HousingContract';
import authenticate from "../middleware/authMiddleware";


const router = express.Router();

// ✅ API to confirm lease extraction and move data to `housingContracts`
router.post("/:extractionId/confirm", authenticate, async (req, res) => {

    try {
        const { extractionId } = req.params;
        const leaseExtraction = await LeaseExtraction.findById(extractionId);

        if (!leaseExtraction) {
            return res.status(404).json({ message: "Lease extraction not found" });
        }

        if (leaseExtraction.status !== "pending") {
            return res.status(400).json({ message: "Lease already processed" });
        }

        // Save extracted lease data to housingContracts
        const newListing = await HousingContract.create({
            ...leaseExtraction.structuredData,
            postedBy: leaseExtraction.user, // Link to user
            isSublease: true, // Default to true for sublease listings
        });

        // Mark extraction as confirmed
        leaseExtraction.status = "confirmed";
        await leaseExtraction.save();

        return res.status(201).json({ message: "Lease confirmed and moved to housingContracts", listing: newListing });
    } catch (error) {
        console.error("Error confirming lease:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
