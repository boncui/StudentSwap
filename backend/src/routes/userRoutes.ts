import express, { NextFunction, Request, Response, Router } from 'express';
import {check, validationResult} from 'express-validator';
import User from '../models/User';

const router: Router = express.Router();

interface CreateUserRequest extends Request {
    body: {
        fullName: string;
        email: string;
        phone: string;
    };
}

//Validation Middlware for creating users
const validateCreateUser = [
    check('fullName')
        .notEmpty()
        .withMessage('Full Name is required.')
        .isLength({min:2})
        .withMessage('Full Name must be at least 3 characters long.'),
    check('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email format'),
    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone(['en-US', 'en-GB'])
        .withMessage('Invalid phone number format.'),
];

//validation for updating users
const validateUpdateUser = [
    check('fullName')
        .optional()
        .isLength({min: 2})
        .withMessage('Full Name needs to be at least 2 characters long.'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format.'),
    check('phone')
        .optional()
        .isMobilePhone(['en-US', 'en-GB'])
        .withMessage('Invalid phone number format'),
];

//Middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
};


// Create a user
router.post('/create', validateCreateUser, handleValidationErrors, async (req: Request, res: Response) => {
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

//Get user by ID
router.get('/:id', async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        
        // Check if ID is a valid MongoDB ObjectID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }
        
        //Find User by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.'});
        }

        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'An unknown error occured on server side.'})
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
