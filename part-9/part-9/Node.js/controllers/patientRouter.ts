import express from 'express';
import patientService from '../services/patientService';
import parsingNewPatient from '../utils/patientUtilis';

const patientRouter = express.Router();

patientRouter.get('/', async (_req, res) => {
    return res.send(patientService.getNonSensitivePatientEntries())
})

patientRouter.post('/', async (req, res) => {

    try {
        const parsedPatient = parsingNewPatient(req.body);
        const addedPatient = patientService.addPatient(parsedPatient);
        return res.status(200).json(addedPatient);
    } catch (e) {
        return res.status(400).send(e.message);
    }
})

export default patientRouter;