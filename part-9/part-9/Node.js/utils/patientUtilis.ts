import { NewPatient, Gender } from '../types/patient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsingNewPatient = (object: any) : NewPatient => { 

    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return newPatient;
}

const parseName = (name: unknown) : string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
}

const parseDateOfBirth = (date: any) : string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseGender = (gender: unknown) : Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

const parseSSN = (ssn: unknown) : string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
}

const parseOccupation = (occupation: unknown) : string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
}

const isString = (text: unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string) : boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (param: any) : param is Gender => {
    return Object.values(Gender).includes(param);
}

export default parsingNewPatient;