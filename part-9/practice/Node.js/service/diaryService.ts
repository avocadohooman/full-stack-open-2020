import diaryData from '../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry} from '../types';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility
    }))
}

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
}

const addEntry = (newEntry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...newEntry
    }

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveDiaryEntries,
    findById
}