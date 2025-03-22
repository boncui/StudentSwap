import express, { Request, Response } from 'express'; //express is used to create the server
import dotenv from 'dotenv'; //dotenv is used for managing enviorment variables
import userRoutes from './routes/userRoutes';
import architectRoutes from './routes/architectRoutes';
import housingRoutes from './routes/housingRoutes';
import connectDB from './config/db';
import mongoose from 'mongoose';
import cors from 'cors';
import suggestionRoutes from "./routes/suggestionRoutes";


dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);

//Database connection
connectDB();
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB Connected'))
    .catch((err: unknown) => console.error('MongoDB connection error:', (err as Error).message));



const app = express();
const PORT = process.env.PORT || 5001; 

const corsOptions = {
    origin: [
        'http://localhost:3001', // local dev
        'https://studentswap.vercel.app' // live frontend
    ], // REPLACE w Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, //for cookies and tokens
}

app.use(express.json());
app.use(cors(corsOptions));


//Base route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('StudentSwap Backend is running!');
});

// Mount user routes
app.use('/api/users', userRoutes);

//housing Routes
app.use('/api/housing-contracts', housingRoutes);


//architect routes
app.use('/api/architect', architectRoutes);

//suggestion routes
app.use('/api/suggestions', suggestionRoutes);

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

