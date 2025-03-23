import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User, { IUser } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

// Define type of decoded token for req.user
interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser; 
  }
  
  // Export authenticate as the default:
  const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
      }
  
      const secret: Secret = process.env.JWT_SECRET!;
      const decoded = jwt.verify(token, secret) as DecodedToken;
  
      const user = await User.findById(decoded.id).select("_id fullName email role");
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      req.user = user.toObject();
  
      next();
    } catch (error) {
      console.error("Authentication Error:", error);
      res.status(401).json({ error: 'Invalid token.' });
    }
  };
  
  export default authenticate;
  
  // Keep authorizeArchitect as a named export:
  export const authorizeArchitect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }
  
    if (req.user.role !== "Architect") {
      return res.status(403).json({ error: `Forbidden: You are not an Architect. Your role is: ${req.user.role}` });
    }
  
    next();
  };