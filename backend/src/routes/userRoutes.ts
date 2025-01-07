import express, { Request, Response, Router } from 'express';
import User from '../models/User';

const router: Router = express.Router();

interface CreateUserRequest extends Request {
    body: {
        fullName: string;
        email: string;
        phone: string;
    };
}

// Create a user
router.post('/create', async (req: Request, res: Response) => {
    try {
        const { fullName, email, phone }: { fullName: string; email: string; phone: string } = req.body;

        // Validate Input
        if (!fullName || !email || !phone) {
            return res.status(400).json({ error: 'Full Name, Email, and Phone are required.' });
        }

        // Save user to database
        const user = new User({ fullName, email, phone });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred on the client side.' });
        }
    }
});


// Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Fetch all users with pagination
        const users = await User.find()
            .skip((+page - 1) * +limit) // Skip users based on page
            .limit(+limit); // Limit the number of results

        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred on server side' });
        }
    }
});

export default router;
