import diagnosisData from '../data/diagnoses';
import { Diagnosis } from '../types/diagnosis';

const diagnoses: Diagnosis[] = diagnosisData as Diagnosis[];

const getDiagnoses = () : Diagnosis[] => {
    return diagnoses;
}

export default {
    getDiagnoses
}