import patientData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types/patient';
import { v1 as uuid } from 'uuid';

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

const addPatient = (newPatientData: NewPatient): Patient => {
    const _id = uuid();
    console.log("Unique ID", _id);
    const newPatient ={
        id: _id,
        ...newPatientData
    }
    console.log("New Patient", newPatient);
    patientEntries.push(newPatient);
    return newPatient;
}

export default {
    getPatientEntries,
    getNonSensitivePatientEntries,
    addPatient
}