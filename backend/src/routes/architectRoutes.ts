import express from 'express';
import { authenticate, authorizeArchitect } from '../middleware/authMiddleware';

const router = express.Router();

// Protect this route for architect only
router.get('/dashboard', authenticate, authorizeArchitect, async (req, res) => {
    res.json({ message: "Welcome to the Architect Dashboard!" });
});

export default router;
