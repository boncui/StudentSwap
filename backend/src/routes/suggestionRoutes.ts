import express, {Request, Response} from 'express';
import Suggestion from '../models/Suggestion';
import authenticate, { authorizeArchitect, AuthenticatedRequest } from '../middleware/authMiddleware';


const router = express.Router();

//Handle Feedback Form (DATABASE)
router.post("/suggestion", authenticate, async (req: AuthenticatedRequest, res: express.Response) => {
    try {
        console.log("User object from authentication:", req.user);

        const { title, description } = req.body;
        const userId = req.user ? req.user._id : null;
        const email = req.user ? req.user.email : null;
        
        if (!email) {
            return res.status(400).json({ error: "User email is required." });
        }

        const suggestion = new Suggestion({ title, description, email, user: userId });
        await suggestion.save();

        res.status(201).json({ message: "Suggestion submitted successfully!" });
    } catch (error) {
        console.error("Error submitting suggestion:", error);
        res.status(500).json({ error: "Failed to submit suggestion."});
    }
});

//Get All Suggestions (Architect-Only)
router.get("/", authenticate, authorizeArchitect, async (req: AuthenticatedRequest, res: Response) => {
    try {
        // console.log("Fetching suggestions..."); //FOR DEBUGGING

        // Log the authenticated user
        // console.log("Authenticated User:", req.user); //FOR DEBUGGING

        // Fetch suggestions from the database
        const suggestions = await Suggestion.find().populate("user", "fullName email");

        // Log the retrieved data
        // console.log("Fetched Suggestions:", suggestions); //FOR DEBUGGING

        res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        res.status(500).json({ error: "Failed to fetch suggestions." });
    }
});

export default router;
