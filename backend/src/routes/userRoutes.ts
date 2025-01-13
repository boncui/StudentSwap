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

        //check for duplicate users
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use.' });
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

//Update User
router.put('/:id', async (req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const { fullName, email, phone }: { fullName?: string; email?: string; phone?: string } = req.body;
        
        //check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.'});
        }

        //update fields if user found
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phone) user.phone = phone;

        //save the updated user
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message});
        } else {
            res.status(500).json({error: 'Unknown error occured on server side'});
        }
    }
});

//Delete User
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        //find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser){
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json({message: 'User sucessfully deleted!'});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'Unknown error occured on server side'});
        }
    }
});

export default router;
