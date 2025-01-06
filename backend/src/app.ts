import express, { Request, Response } from 'express'; //express is used to create the server
import dotenv from 'dotenv'; //dotenv is used for managing enviorment variables

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; //PORT 5000 is being used by Mac

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('StudentSwap Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

