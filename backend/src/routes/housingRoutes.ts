import express, {Request, Response} from 'express';
import HousingContract from '../models/HousingContract';

const router = express.Router();

//Create housing contract
router.post('/create', async (req: Request, res: Response) => {
    try {
        const contract = new HousingContract(req.body);
        await contract.save();
        res.status(201).json(contract);
    } catch (error){
        if (error instanceof Error) {
            res.status(400).json({error: error.message});
        } else{
            res.status(400).json({ error: 'An unknown error occurred on client side' });
        }
    }
});

//Get all the Housing Contracts
router.get('/', async (req: Request, res: Response) =>{
    try {
        const contracts = await HousingContract.find();
        res.status(200).json(contracts);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message});
        } else {
            res.status(500).json({ error: 'Unknown error from server side'});
        }
    }
});

//Get Housing Contract by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const contract = await HousingContract.findById(id);
        if (!contract){
            return res.status(404).json({error: 'Housing contract not found'});
        }
        res.status(200).json(contract);
    } catch (error) {
        if (error instanceof Error){
            res.status(500).json({ error: error.message});
        } else {
            res.status(500).json({error: 'An unknown error from server side'});
        }
    }
});

//Update Housing Contract
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const updatedContract = await HousingContract.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedContract){
            return res.status(404).json({error: 'Housing contract not found'});
        }
        res.status(200).json(updatedContract);
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message});
        } else {
            res.status(400).json({error: 'Unkown error from client side'});
        }
    }
});

//Delete HOusing Contract
router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const deletedContract = await HousingContract.findByIdAndDelete(id);
        
        if (!deletedContract){
            res.status(404).json({error: 'Housing Contract not found'});
        }
        res.status(200).json({message: 'Housing Contract successfully deleted!'});
    } catch (error){
        if (error instanceof Error){
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'An unknown error occured on server side'});
        }
    }
});

export default router;