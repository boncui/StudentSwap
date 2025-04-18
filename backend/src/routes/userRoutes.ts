import express, { NextFunction, Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import authenticate, { AuthenticatedRequest } from '../middleware/authMiddleware';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router: Router = express.Router();

const universityDomains = ['wustl.edu']; // List of allowed university domains

// 🔹 Validation Middleware for creating users
const validateCreateUser = [
    check('fullName')
        .notEmpty().withMessage('Full Name is required.')
        .isLength({ min: 2 }).withMessage('Full Name must be at least 2 characters long.'),
    check('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format')
        .custom((value) => {
            const domain = value.split('@')[1];
            if (!universityDomains.includes(domain)) {
                throw new Error('Email domain must belong to an approved university.');
            }
            return true;
        }),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),
];

// 🔹 Middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// ✅ Create a user
router.post('/create', validateCreateUser, handleValidationErrors, async (req: Request, res: Response) => {
    try {
        const { fullName, email, password }: { fullName: string; email: string; password: string } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        // Hash password & create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, password: hashedPassword, role: 'User' });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// ✅ LOGIN Functionality
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT token (Includes role)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// ✅ GET Authenticated User Data (`/me`)
router.get('/me', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized: No user found' });

        // Fetch user without password
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching user data' });
    }
});

// ✅ GET User by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// ✅ GET All Users (with pagination)
router.get('/', async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find()
            .skip((+page - 1) * +limit)
            .limit(+limit);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// ✅ UPDATE User
router.put('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const { fullName, email }: { fullName?: string; email?: string } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// ✅ LOGOUT Functionality
router.post('/logout', authenticate, (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// ✅ DELETE User
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User successfully deleted!' });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});


router.post('/:userId/liked-listings', async (req, res) => {
    const { userId } = req.params;
    const { listingId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).send("User not found");
  
      if (!user.likedListings.includes(listingId)) {
        user.likedListings.push(listingId);
        await user.save();
      }
  
      res.status(200).send("Liked");
    } catch (err) {
      res.status(500).send("Error liking listing");
    }
  });
  
  router.delete('/:userId/liked-listings', async (req, res) => {
    const { userId } = req.params;
    const { listingId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).send("User not found");
  
      user.likedListings = user.likedListings.filter(id => id.toString() !== listingId);
      await user.save();
  
      res.status(200).send("Unliked");
    } catch (err) {
      res.status(500).send("Error unliking listing");
    }
  });
  
  router.get('/:userId/liked-listings', async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate('likedListings');
      if (!user) return res.status(404).send("User not found");
  
      res.status(200).json(user.likedListings); // ✅ Return full contract objects
    } catch (err) {
      res.status(500).send("Error fetching liked listings");
    }
  });
  

export default router;
