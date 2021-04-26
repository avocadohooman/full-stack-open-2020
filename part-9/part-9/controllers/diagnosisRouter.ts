import express from 'express';
import diagnosisService from '../services/diagnosisService';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', async (_req, res) => {
    return res.send(diagnosisService.getDiagnoses());
})


export default diagnosisRouter;