import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', async (_req, res) => {
    return res.send(patientService.getNonSensitivePatientEntries())
})

export default patientRouter;