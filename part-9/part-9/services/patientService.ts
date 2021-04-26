import patientData from '../data/patients';
import { Patient, NonSensitivePatient } from '../types/patient';

const patientEntries: Patient[] = patientData as Patient[];

const getPatientEntries = () : Patient[] => {
    return patientEntries;
}

const getNonSensitivePatientEntries = () :  NonSensitivePatient[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export default {
    getPatientEntries,
    getNonSensitivePatientEntries
}