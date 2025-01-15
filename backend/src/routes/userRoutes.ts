import express, { NextFunction, Request, Response, Router } from 'express';
import {check, validationResult} from 'express-validator';
import authenticate from '../middleware/authMiddleware';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router: Router = express.Router();

const universityDomains = [
    'wustl.edu'
    // Add more university domains here
];

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
        .withMessage('Invalid email format')
        .custom((value) => {
            const domain = value.split('@')[1]; // Extract domain from email
            if (!universityDomains.includes(domain)) {
                throw new Error('Email domain is not allowed. Must belong to an approved university.');
            }
            return true; // Validation passed
        }),
    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone('any') 
        .withMessage('Invalid phone number format.'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:8})
        .withMessage('Password must be of length 8')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character.')
];

//Validation for updating users
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

//Validation for valid UserID
const validateObjectId = [
    check('id')
        .custom((value) => /^[0-9a-fA-F]{24}$/.test(value))
        .withMessage('Invalid ID format.'),
];

//Middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
};


//==> ROUTES <==
// Create a user
router.post('/create', validateCreateUser, handleValidationErrors, async (req: Request, res: Response) => {
    try {
        
        const { fullName, email, phone, password }: { fullName: string; email: string; phone: string ; password: string} = req.body;

        //check for duplicate users
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        // Save user to database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, phone, password: hashedPassword });
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

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //Find the user in the database
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        //Vertify the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(401).json({error: 'Invalid credentials'});
        }

        //generate a JWT token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET!, {
            expiresIn: '1h', //token will expire in 1 hour
        });

        res.status(200).json({token});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'An unknown error occured during Login.'});
        }
    }
});

//Get user by ID
router.get('/:id', validateObjectId, handleValidationErrors, async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
      
        //Find User by ID
        const user = await User.findById(id);

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
router.put('/:id', authenticate, validateUpdateUser, handleValidationErrors, async (req: Request, res: Response) =>{
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
router.delete('/:id', authenticate, validateObjectId, handleValidationErrors, async (req: Request, res: Response) => {
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
