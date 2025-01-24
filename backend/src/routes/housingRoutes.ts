import express, {Request, Response} from 'express';
import HousingContract from '../models/HousingContract';

const router = express.Router();

const handleError = (error: unknown, res: Response, statusCode = 500, defaultMessage = 'An unknown error occurred') => {
    if (error instanceof Error) {
        res.status(statusCode).json({error: error.message});
    } else{
        res.status(statusCode).json({ error: defaultMessage });
    }
}

//Create housing contract
router.post('/create', async (req: Request, res: Response) => {
    try {
        const contract = new HousingContract(req.body);
        await contract.save();
        res.status(201).json(contract);
    } catch (error){
        handleError(error, res, 400, 'An unknown error occurred on client side');
    }
});

//Get all the Housing Contracts
router.get('/', async (req: Request, res: Response) => {
    try {
        const { isSublease, page, limit } = req.query;

        const filter: any = {};
        if (isSublease) {
            filter.isSublease = isSublease === 'true';
        }

        const pageNumber = page ? parseInt(page as string, 10) : 1;
        const pageSize = limit ? parseInt(limit as string, 10) : 10;
        const skip = (pageNumber - 1) * pageSize;

        const contracts = await HousingContract.find(filter)
            .skip(skip)
            .limit(pageSize);

        const totalContracts = await HousingContract.countDocuments(filter);

        res.status(200).json({
            contracts,
            total: totalContracts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalContracts / pageSize),
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error from server side' });
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
        handleError(error, res, 500, 'An unknown error from server side');
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
        handleError(error, res, 400, 'Unknown error from client side');
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
        handleError(error, res, 500, 'An unknown error occurred on server side');
    }
});

export default router;